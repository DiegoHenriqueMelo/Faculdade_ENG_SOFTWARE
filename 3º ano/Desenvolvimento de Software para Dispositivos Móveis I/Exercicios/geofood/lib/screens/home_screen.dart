import 'dart:math';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../models/chat_message.dart';
import '../models/restaurant.dart';
import '../services/directions_service.dart';
import '../services/location_service.dart';
import '../services/openai_service.dart';
import '../services/places_service.dart';
import '../widgets/restaurant_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // --- State ---
  double? _userLat;
  double? _userLng;
  bool _locationLoading = true;
  String? _locationError;

  final List<ChatMessage> _messages = [];
  List<Restaurant> _allNearby = [];
  List<Restaurant> _recommended = [];
  Restaurant? _selected;
  DirectionsResult? _route;

  bool _aiLoading = false;

  Set<Marker> _markers = {};
  Set<Polyline> _polylines = {};
  GoogleMapController? _mapController;

  final _textController = TextEditingController();
  final _scrollController = ScrollController();
  final _sheetController = DraggableScrollableController();

  // --- Services ---
  final _locationSvc = LocationService();
  final _placesSvc = PlacesService();
  final _openAiSvc = OpenAIService();
  final _directionsSvc = DirectionsService();

  static const _initialCamera = CameraPosition(
    target: LatLng(-15.7942, -47.8822),
    zoom: 4,
  );

  // ---------------------------------------------------------------
  @override
  void initState() {
    super.initState();
    _addWelcome();
    _loadLocation();
  }

  @override
  void dispose() {
    _textController.dispose();
    _scrollController.dispose();
    _sheetController.dispose();
    _mapController?.dispose();
    super.dispose();
  }

  // ---------------------------------------------------------------
  // Location
  // ---------------------------------------------------------------

  Future<void> _loadLocation() async {
    setState(() {
      _locationLoading = true;
      _locationError = null;
    });
    try {
      final pos = await _locationSvc.getCurrentPosition();
      setState(() {
        _userLat = pos.latitude;
        _userLng = pos.longitude;
        _locationLoading = false;
      });
      _mapController?.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(
            target: LatLng(pos.latitude, pos.longitude),
            zoom: 15,
          ),
        ),
      );
      _updateUserMarker();
    } catch (e) {
      setState(() {
        _locationError = e.toString();
        _locationLoading = false;
      });
    }
  }

  void _updateUserMarker() {
    if (_userLat == null) return;
    final userMarker = Marker(
      markerId: const MarkerId('_user'),
      position: LatLng(_userLat!, _userLng!),
      icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueAzure),
      infoWindow: const InfoWindow(title: 'Você está aqui'),
      zIndexInt: 2,
    );
    setState(() {
      _markers = {
        userMarker,
        ..._markers.where((m) => m.markerId.value != '_user'),
      };
    });
  }

  // ---------------------------------------------------------------
  // Chat
  // ---------------------------------------------------------------

  void _addWelcome() {
    _messages.add(ChatMessage(
      role: 'assistant',
      content:
          'Olá! Sou o GeoFood AI 🍽️\n\n'
          'Me diga o que você quer comer e seu orçamento, e vou encontrar os melhores restaurantes próximos a você!\n\n'
          'Exemplos:\n'
          '• "Quero comer pizza, tenho R\$80"\n'
          '• "Sushi barato perto de mim"\n'
          '• "Hambúrguer artesanal, até R\$50"',
    ));
  }

  Future<void> _sendMessage() async {
    final text = _textController.text.trim();
    if (text.isEmpty || _aiLoading) return;

    // Garante localização
    if (_userLat == null) {
      if (_locationLoading) {
        _showSnack('Aguarde, obtendo sua localização...');
        return;
      }
      if (_locationError != null) {
        _showSnack('Localização indisponível. Toque no ícone GPS para tentar novamente.');
        return;
      }
    }

    final userMsg = ChatMessage(role: 'user', content: text);
    setState(() {
      _messages.add(userMsg);
      _textController.clear();
      _aiLoading = true;
    });
    _scrollToBottom();

    try {
      // Busca restaurantes próximos (apenas na primeira vez ou se lista vazia)
      if (_allNearby.isEmpty) {
        _allNearby = await _placesSvc.searchNearbyRestaurants(
          lat: _userLat!,
          lng: _userLng!,
        );
      }

      // Histórico sem a última mensagem do usuário (já adicionada acima)
      final history = _messages.sublist(0, _messages.length - 1);

      final result = await _openAiSvc.getRecommendations(
        userMessage: text,
        lat: _userLat!,
        lng: _userLng!,
        nearbyRestaurants: _allNearby,
        history: history,
      );

      final responseText =
          result['resposta'] as String? ?? 'Não encontrei sugestões no momento.';
      final rawRecommended =
          (result['restaurantes_recomendados'] as List?) ?? [];

      // Filtra e anota os restaurantes recomendados
      final recommended = <Restaurant>[];
      for (final rec in rawRecommended) {
        final placeId = rec['place_id'] as String?;
        if (placeId == null) continue;
        final match = _allNearby.cast<Restaurant?>().firstWhere(
          (r) => r?.placeId == placeId,
          orElse: () => null,
        );
        if (match != null) {
          match.aiRecommendationReason = rec['motivo'] as String?;
          recommended.add(match);
        }
      }

      final assistantMsg = ChatMessage(
        role: 'assistant',
        content: responseText,
        rawContent: result.toString(),
        restaurants: recommended.isNotEmpty ? recommended : null,
      );

      setState(() {
        _messages.add(assistantMsg);
        _recommended = recommended;
        _aiLoading = false;
      });

      _updateRestaurantMarkers();
      _scrollToBottom();

      if (recommended.isNotEmpty) {
        _fitMapToPoints([
          LatLng(_userLat!, _userLng!),
          ...recommended.map((r) => r.location),
        ]);
      }
    } catch (e) {
      setState(() {
        _messages.add(ChatMessage(
          role: 'assistant',
          content: 'Erro ao processar sua solicitação:\n${e.toString()}\n\nTente novamente.',
        ));
        _aiLoading = false;
      });
      _scrollToBottom();
    }
  }

  // ---------------------------------------------------------------
  // Map
  // ---------------------------------------------------------------

  void _updateRestaurantMarkers() {
    final restaurantMarkers = _recommended.map((r) {
      return Marker(
        markerId: MarkerId(r.placeId),
        position: r.location,
        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueOrange),
        infoWindow: InfoWindow(
          title: r.name,
          snippet: '${r.ratingText}  ${r.priceLevelText}',
        ),
        onTap: () => _selectRestaurant(r),
        zIndexInt: 1,
      );
    }).toSet();

    setState(() {
      _markers = {
        ..._markers.where((m) => m.markerId.value == '_user'),
        ...restaurantMarkers,
      };
    });
  }

  Future<void> _selectRestaurant(Restaurant restaurant) async {
    if (_userLat == null) return;

    setState(() {
      _selected = restaurant;
      _aiLoading = true;
    });

    // Minimiza o chat para ver o mapa
    _sheetController.animateTo(
      0.08,
      duration: const Duration(milliseconds: 350),
      curve: Curves.easeOut,
    );

    try {
      final result = await _directionsSvc.getRoute(
        origin: LatLng(_userLat!, _userLng!),
        destination: restaurant.location,
      );

      setState(() {
        _route = result;
        _polylines = {
          Polyline(
            polylineId: const PolylineId('route'),
            points: result.points,
            color: const Color(0xFFFF5722),
            width: 5,
            jointType: JointType.round,
            startCap: Cap.roundCap,
            endCap: Cap.roundCap,
          ),
        };
        _aiLoading = false;
      });

      _fitMapToPoints([
        LatLng(_userLat!, _userLng!),
        restaurant.location,
      ]);
    } catch (e) {
      setState(() {
        _aiLoading = false;
      });
      _showSnack('Erro ao traçar rota: $e');
    }
  }

  void _clearRoute() {
    setState(() {
      _selected = null;
      _route = null;
      _polylines = {};
    });
  }

  void _fitMapToPoints(List<LatLng> points) {
    if (_mapController == null || points.isEmpty) return;
    if (points.length == 1) {
      _mapController!.animateCamera(
        CameraUpdate.newLatLngZoom(points.first, 15),
      );
      return;
    }

    double minLat = points.first.latitude;
    double maxLat = points.first.latitude;
    double minLng = points.first.longitude;
    double maxLng = points.first.longitude;

    for (final p in points) {
      minLat = min(minLat, p.latitude);
      maxLat = max(maxLat, p.latitude);
      minLng = min(minLng, p.longitude);
      maxLng = max(maxLng, p.longitude);
    }

    _mapController!.animateCamera(
      CameraUpdate.newLatLngBounds(
        LatLngBounds(
          southwest: LatLng(minLat, minLng),
          northeast: LatLng(maxLat, maxLng),
        ),
        80,
      ),
    );
  }

  // ---------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  void _showSnack(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), behavior: SnackBarBehavior.floating),
    );
  }

  // ---------------------------------------------------------------
  // Build
  // ---------------------------------------------------------------

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // ── Mapa ───────────────────────────────────────────────
          GoogleMap(
            initialCameraPosition: _initialCamera,
            onMapCreated: (ctrl) {
              _mapController = ctrl;
              if (_userLat != null) {
                ctrl.animateCamera(
                  CameraUpdate.newCameraPosition(
                    CameraPosition(
                      target: LatLng(_userLat!, _userLng!),
                      zoom: 15,
                    ),
                  ),
                );
              }
            },
            markers: _markers,
            polylines: _polylines,
            myLocationEnabled: false,
            zoomControlsEnabled: false,
            mapToolbarEnabled: false,
            padding: const EdgeInsets.only(bottom: 160),
          ),

          // ── Barra de progresso ─────────────────────────────────
          if (_aiLoading)
            const Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: LinearProgressIndicator(
                color: Color(0xFFFF5722),
                backgroundColor: Color(0xFFFFCCBC),
              ),
            ),

          // ── Info de rota (topo) ────────────────────────────────
          if (_selected != null)
            Positioned(
              top: MediaQuery.of(context).padding.top + 8,
              left: 12,
              right: 12,
              child: _buildRouteCard(),
            ),

          // ── Botão GPS ──────────────────────────────────────────
          Positioned(
            right: 12,
            bottom: MediaQuery.of(context).size.height * 0.38,
            child: FloatingActionButton.small(
              onPressed: _loadLocation,
              backgroundColor: Colors.white,
              child: _locationLoading
                  ? const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Color(0xFFFF5722),
                      ),
                    )
                  : Icon(
                      Icons.my_location,
                      color: _userLat != null
                          ? const Color(0xFFFF5722)
                          : Colors.grey,
                    ),
            ),
          ),

          // ── Painel de chat (bottom sheet) ──────────────────────
          DraggableScrollableSheet(
            controller: _sheetController,
            initialChildSize: 0.35,
            minChildSize: 0.08,
            maxChildSize: 0.88,
            snap: true,
            snapSizes: const [0.08, 0.35, 0.88],
            builder: (_, scrollCtrl) => _buildChatPanel(scrollCtrl),
          ),
        ],
      ),
    );
  }

  // ── Widgets ──────────────────────────────────────────────────────

  Widget _buildRouteCard() {
    return Material(
      elevation: 6,
      borderRadius: BorderRadius.circular(14),
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        child: Row(
          children: [
            const Icon(Icons.directions, color: Color(0xFFFF5722)),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _selected!.name,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  if (_route != null)
                    Text(
                      '${_route!.distance}  •  ${_route!.duration}',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.green.shade700,
                      ),
                    ),
                ],
              ),
            ),
            IconButton(
              icon: const Icon(Icons.close, size: 20),
              onPressed: _clearRoute,
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChatPanel(ScrollController scrollCtrl) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(22)),
        boxShadow: [
          BoxShadow(
            color: Color(0x22000000),
            blurRadius: 12,
            offset: Offset(0, -3),
          ),
        ],
      ),
      child: Column(
        children: [
          // Drag handle
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: () {
              final current = _sheetController.size;
              _sheetController.animateTo(
                current < 0.5 ? 0.88 : 0.35,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeOut,
              );
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 10),
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
          ),

          // Header
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 10),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFF5722),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.restaurant,
                    color: Colors.white,
                    size: 18,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'GeoFood AI',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        _locationLoading
                            ? 'Obtendo localização...'
                            : _userLat != null
                                ? 'Localização obtida ✓'
                                : 'Localização indisponível',
                        style: TextStyle(
                          fontSize: 11,
                          color: _locationLoading
                              ? Colors.orange
                              : _userLat != null
                                  ? Colors.green
                                  : Colors.red,
                        ),
                      ),
                    ],
                  ),
                ),
                if (_recommended.isNotEmpty)
                  Chip(
                    label: Text(
                      '${_recommended.length} sugestões',
                      style: const TextStyle(fontSize: 11, color: Colors.white),
                    ),
                    backgroundColor: const Color(0xFFFF5722),
                    padding: EdgeInsets.zero,
                    visualDensity: VisualDensity.compact,
                  ),
              ],
            ),
          ),

          const Divider(height: 1),

          // Mensagens
          Expanded(
            child: ListView.builder(
              controller: scrollCtrl,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              itemCount: _messages.length + (_aiLoading ? 1 : 0),
              itemBuilder: (_, i) {
                if (i == _messages.length) return _buildTypingIndicator();
                return _buildMessageBubble(_messages[i]);
              },
            ),
          ),

          // Input
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 8),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _textController,
                      decoration: InputDecoration(
                        hintText: 'Ex: "Quero sushi por R\$60..."',
                        hintStyle: TextStyle(
                          color: Colors.grey.shade400,
                          fontSize: 14,
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(26),
                          borderSide: BorderSide.none,
                        ),
                        filled: true,
                        fillColor: Colors.grey.shade100,
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 18,
                          vertical: 10,
                        ),
                      ),
                      textInputAction: TextInputAction.send,
                      onSubmitted: (_) => _sendMessage(),
                      minLines: 1,
                      maxLines: 3,
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: _aiLoading ? null : _sendMessage,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      width: 46,
                      height: 46,
                      decoration: BoxDecoration(
                        color: _aiLoading
                            ? Colors.grey.shade300
                            : const Color(0xFFFF5722),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        _aiLoading ? Icons.hourglass_top : Icons.send,
                        color: Colors.white,
                        size: 20,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessageBubble(ChatMessage msg) {
    final isUser = msg.isUser;
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Column(
        crossAxisAlignment:
            isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment:
                isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              if (!isUser) ...[
                Container(
                  width: 28,
                  height: 28,
                  decoration: const BoxDecoration(
                    color: Color(0xFFFF5722),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.restaurant,
                    color: Colors.white,
                    size: 15,
                  ),
                ),
                const SizedBox(width: 8),
              ],
              Flexible(
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 10,
                  ),
                  decoration: BoxDecoration(
                    color: isUser
                        ? const Color(0xFFFF5722)
                        : Colors.grey.shade100,
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(18),
                      topRight: const Radius.circular(18),
                      bottomLeft: Radius.circular(isUser ? 18 : 4),
                      bottomRight: Radius.circular(isUser ? 4 : 18),
                    ),
                  ),
                  child: Text(
                    msg.content,
                    style: TextStyle(
                      color: isUser ? Colors.white : Colors.black87,
                      fontSize: 14,
                      height: 1.4,
                    ),
                  ),
                ),
              ),
              if (isUser) const SizedBox(width: 8),
            ],
          ),

          // Cards dos restaurantes recomendados
          if (!isUser &&
              msg.restaurants != null &&
              msg.restaurants!.isNotEmpty) ...[
            const SizedBox(height: 8),
            Padding(
              padding: const EdgeInsets.only(left: 36),
              child: SizedBox(
                height: 160,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: msg.restaurants!.length,
                  separatorBuilder: (context, i) => const SizedBox(width: 8),
                  itemBuilder: (_, i) {
                    final r = msg.restaurants![i];
                    return RestaurantCard(
                      restaurant: r,
                      isSelected: _selected?.placeId == r.placeId,
                      onTap: () => _selectRestaurant(r),
                    );
                  },
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildTypingIndicator() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          Container(
            width: 28,
            height: 28,
            decoration: const BoxDecoration(
              color: Color(0xFFFF5722),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.restaurant, color: Colors.white, size: 15),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.grey.shade100,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(18),
                topRight: Radius.circular(18),
                bottomRight: Radius.circular(18),
                bottomLeft: Radius.circular(4),
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _dot(0),
                const SizedBox(width: 4),
                _dot(200),
                const SizedBox(width: 4),
                _dot(400),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _dot(int delayMs) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.4, end: 1.0),
      duration: const Duration(milliseconds: 600),
      curve: Curves.easeInOut,
      builder: (_, value, child) => Opacity(opacity: value, child: child),
      child: Container(
        width: 8,
        height: 8,
        decoration: BoxDecoration(
          color: Colors.grey.shade500,
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}
