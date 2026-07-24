import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const GeoFoodApp());
}

class GeoFoodApp extends StatelessWidget {
  const GeoFoodApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GeoFood',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFF5722),
        ),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}
