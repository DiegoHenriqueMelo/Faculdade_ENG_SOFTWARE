import 'dart:convert';
import 'package:http/http.dart' as http;
import '../keys.dart';
import '../models/restaurant.dart';
import '../models/chat_message.dart';

class OpenAIService {
  static const _url = 'https://api.openai.com/v1/chat/completions';

  static const _systemPrompt = '''
Você é o GeoFood Assistant, especializado em recomendar restaurantes próximos ao usuário com base na sua localização e preferências.

REGRAS:
1. Responda APENAS em JSON válido com este formato exato:
{
  "resposta": "Mensagem amigável, detalhada e em português para o usuário",
  "restaurantes_recomendados": [
    {
      "place_id": "ChIJ...",
      "nome": "Nome do restaurante",
      "motivo": "Por que este restaurante é ideal para o pedido"
    }
  ]
}

2. Faixa de preço (price_level):
   💰 Barato = até R\$30 por pessoa
   💰💰 Moderado = R\$30 a R\$80 por pessoa
   💰💰💰 Caro = R\$80 a R\$150 por pessoa
   💰💰💰💰 Muito caro = acima de R\$150 por pessoa

3. Ordene os restaurantes por relevância ao pedido do usuário.
4. Se nenhum restaurante atender ao pedido, explique por quê e sugira alternativas.
5. Se a pergunta não for sobre comida/restaurantes, responda normalmente com "restaurantes_recomendados": [].
6. Considere: tipo de comida solicitada, orçamento, avaliação e se está aberto.
''';

  Future<Map<String, dynamic>> getRecommendations({
    required String userMessage,
    required double lat,
    required double lng,
    required List<Restaurant> nearbyRestaurants,
    required List<ChatMessage> history,
  }) async {
    // Monta lista de restaurantes para o contexto
    final restaurantList = nearbyRestaurants.isEmpty
        ? 'Nenhum restaurante encontrado na área.'
        : nearbyRestaurants.asMap().entries.map((e) {
            final r = e.value;
            return '${e.key + 1}. ${r.name}'
                ' | ID: ${r.placeId}'
                ' | Tipos: ${r.types.take(3).join(", ")}'
                ' | ${r.ratingText}'
                ' | ${r.priceLevelText} (${r.priceRange})'
                ' | ${r.isOpenNow ? "✅ Aberto" : "❓ Status desconhecido"}'
                ' | Endereço: ${r.address}';
          }).join('\n');

    final contextualMessage =
        '[📍 Localização do usuário: lat=$lat, lng=$lng]\n\n'
        '[🍽️ Restaurantes próximos (raio 2km):\n$restaurantList]\n\n'
        'Mensagem: $userMessage';

    // Monta histórico de mensagens
    final messages = <Map<String, dynamic>>[
      {'role': 'system', 'content': _systemPrompt},
    ];

    // Adiciona histórico anterior (sem a última mensagem do usuário)
    for (final msg in history) {
      messages.add({
        'role': msg.role,
        'content': msg.rawContent ?? msg.content,
      });
    }

    // Mensagem atual com contexto
    messages.add({'role': 'user', 'content': contextualMessage});

    final response = await http.post(
      Uri.parse(_url),
      headers: {
        'Authorization': 'Bearer $kOpenAiKey',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: jsonEncode({
        'model': 'gpt-4o-mini',
        'messages': messages,
        'response_format': {'type': 'json_object'},
        'temperature': 0.7,
        'max_tokens': 1500,
      }),
    );

    if (response.statusCode != 200) {
      final error = jsonDecode(utf8.decode(response.bodyBytes));
      throw Exception(
        'OpenAI error ${response.statusCode}: '
        '${error['error']?['message'] ?? response.body}',
      );
    }

    final data = jsonDecode(utf8.decode(response.bodyBytes));
    final content = data['choices'][0]['message']['content'] as String;
    return jsonDecode(content) as Map<String, dynamic>;
  }
}
