import 'package:flutter_test/flutter_test.dart';
import 'package:geofood/main.dart';

void main() {
  testWidgets('GeoFood app smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const GeoFoodApp());
    expect(find.byType(GeoFoodApp), findsOneWidget);
  });
}
