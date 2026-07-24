import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../keys.dart';

class DirectionsService {
  static const _url = 'https://maps.googleapis.com/maps/api/directions/json';

  Future<DirectionsResult> getRoute({
    required LatLng origin,
    required LatLng destination,
  }) async {
    final uri = Uri.parse(_url).replace(queryParameters: {
      'origin': '${origin.latitude},${origin.longitude}',
      'destination': '${destination.latitude},${destination.longitude}',
      'mode': 'driving',
      'language': 'pt-BR',
      'key': kGoogleMapsKey,
    });

    final response = await http.get(uri);
    if (response.statusCode != 200) {
      throw Exception('Erro ao buscar rota: ${response.statusCode}');
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final status = data['status'] as String;

    if (status == 'REQUEST_DENIED') {
      throw Exception(
        'Chave da API Google inválida para Directions API. '
        'Verifique kGoogleMapsKey em lib/keys.dart',
      );
    }
    if (status == 'ZERO_RESULTS') {
      throw Exception('Nenhuma rota encontrada para este destino.');
    }
    if (status != 'OK') {
      throw Exception('Directions API retornou: $status');
    }

    final route = data['routes'][0] as Map<String, dynamic>;
    final leg = route['legs'][0] as Map<String, dynamic>;
    final encoded = route['overview_polyline']['points'] as String;

    return DirectionsResult(
      points: _decodePolyline(encoded),
      distance: leg['distance']['text'] as String,
      duration: leg['duration']['text'] as String,
    );
  }

  List<LatLng> _decodePolyline(String encoded) {
    final points = <LatLng>[];
    int index = 0;
    final len = encoded.length;
    int lat = 0;
    int lng = 0;

    while (index < len) {
      int b, shift = 0, result = 0;
      do {
        b = encoded.codeUnitAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lat += (result & 1) != 0 ? ~(result >> 1) : (result >> 1);

      shift = 0;
      result = 0;
      do {
        b = encoded.codeUnitAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lng += (result & 1) != 0 ? ~(result >> 1) : (result >> 1);

      points.add(LatLng(lat / 1e5, lng / 1e5));
    }

    return points;
  }
}

class DirectionsResult {
  final List<LatLng> points;
  final String distance;
  final String duration;

  const DirectionsResult({
    required this.points,
    required this.distance,
    required this.duration,
  });
}
