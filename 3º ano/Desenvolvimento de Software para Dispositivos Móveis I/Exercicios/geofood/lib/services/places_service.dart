import 'dart:convert';
import 'package:http/http.dart' as http;
import '../keys.dart';
import '../models/restaurant.dart';

class PlacesService {
  static const _baseUrl =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  Future<List<Restaurant>> searchNearbyRestaurants({
    required double lat,
    required double lng,
    int radius = 2000,
  }) async {
    final uri = Uri.parse(_baseUrl).replace(queryParameters: {
      'location': '$lat,$lng',
      'radius': '$radius',
      'type': 'restaurant',
      'key': kGoogleMapsKey,
    });

    final response = await http.get(uri);
    if (response.statusCode != 200) {
      throw Exception('Erro ao buscar restaurantes: ${response.statusCode}');
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final status = data['status'] as String;

    if (status == 'REQUEST_DENIED') {
      throw Exception(
        'Chave da API Google inválida. '
        'Verifique kGoogleMapsKey em lib/keys.dart',
      );
    }
    if (status != 'OK' && status != 'ZERO_RESULTS') {
      throw Exception('Places API retornou: $status');
    }

    final results = data['results'] as List? ?? [];
    return results
        .map((json) => Restaurant.fromJson(json as Map<String, dynamic>))
        .toList();
  }

  String photoUrl(String photoReference, {int maxWidth = 400}) =>
      'https://maps.googleapis.com/maps/api/place/photo'
      '?photoreference=$photoReference'
      '&maxwidth=$maxWidth'
      '&key=$kGoogleMapsKey';
}
