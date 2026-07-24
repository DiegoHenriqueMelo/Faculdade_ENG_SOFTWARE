import 'package:google_maps_flutter/google_maps_flutter.dart';

class Restaurant {
  final String placeId;
  final String name;
  final String address;
  final double? rating;
  final int? priceLevel;
  final LatLng location;
  final List<String> types;
  final String? photoReference;
  final bool isOpenNow;
  String? aiRecommendationReason;

  Restaurant({
    required this.placeId,
    required this.name,
    required this.address,
    this.rating,
    this.priceLevel,
    required this.location,
    required this.types,
    this.photoReference,
    this.isOpenNow = false,
    this.aiRecommendationReason,
  });

  factory Restaurant.fromJson(Map<String, dynamic> json) {
    final geo = json['geometry']['location'];
    final photos = json['photos'] as List?;
    return Restaurant(
      placeId: json['place_id'] as String,
      name: json['name'] as String,
      address: json['vicinity'] as String? ?? '',
      rating: (json['rating'] as num?)?.toDouble(),
      priceLevel: json['price_level'] as int?,
      location: LatLng(
        (geo['lat'] as num).toDouble(),
        (geo['lng'] as num).toDouble(),
      ),
      types: (json['types'] as List?)?.cast<String>() ?? [],
      photoReference: photos?.isNotEmpty == true
          ? photos!.first['photo_reference'] as String?
          : null,
      isOpenNow:
          (json['opening_hours'] as Map?)?['open_now'] as bool? ?? false,
    );
  }

  String get priceLevelText {
    switch (priceLevel) {
      case 1:
        return '💰 Barato';
      case 2:
        return '💰💰 Moderado';
      case 3:
        return '💰💰💰 Caro';
      case 4:
        return '💰💰💰💰 Muito caro';
      default:
        return 'Preço variável';
    }
  }

  String get priceRange {
    switch (priceLevel) {
      case 1:
        return 'Até R\$30';
      case 2:
        return 'R\$30 – R\$80';
      case 3:
        return 'R\$80 – R\$150';
      case 4:
        return 'Acima de R\$150';
      default:
        return 'Preço não informado';
    }
  }

  String get ratingText =>
      rating != null ? '⭐ ${rating!.toStringAsFixed(1)}' : 'Sem avaliação';

  String get cuisineLabel {
    const map = {
      'pizza': 'Pizza',
      'burger': 'Hambúrguer',
      'sushi': 'Sushi',
      'chinese': 'Chinesa',
      'italian': 'Italiana',
      'mexican': 'Mexicana',
      'bakery': 'Padaria',
      'cafe': 'Café',
      'bar': 'Bar',
      'fast_food': 'Fast food',
      'meal_delivery': 'Delivery',
    };
    for (final t in types) {
      if (map.containsKey(t)) return map[t]!;
    }
    return 'Restaurante';
  }

  Map<String, dynamic> toSummary() => {
        'place_id': placeId,
        'nome': name,
        'tipos': types.take(3).join(', '),
        'avaliacao': rating,
        'preco': priceLevelText,
        'faixa_preco': priceRange,
        'aberto': isOpenNow,
        'endereco': address,
      };
}
