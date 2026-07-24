import 'restaurant.dart';

class ChatMessage {
  final String role;
  final String content;
  final String? rawContent;
  final List<Restaurant>? restaurants;
  final DateTime timestamp;

  ChatMessage({
    required this.role,
    required this.content,
    this.rawContent,
    this.restaurants,
    DateTime? timestamp,
  }) : timestamp = timestamp ?? DateTime.now();

  bool get isUser => role == 'user';
  bool get isAssistant => role == 'assistant';
}
