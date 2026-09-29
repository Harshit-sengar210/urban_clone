import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

// Screens
import '../features/home/home_screen.dart';
import '../features/auth/login_screen.dart';
import '../features/auth/splash_screen.dart';
import '../features/services/presentation/screens/category_services_screen.dart';
import '../features/bookings/presentation/screens/booking_details_screen.dart';
import '../features/bookings/domain/booking_model.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/home',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/booking/:id',
        builder: (context, state) {
          final id = state.pathParameters['id']!;
          final booking = state.extra as BookingModel?;
          return BookingDetailsScreen(bookingId: id, booking: booking);
        },
      ),
      GoRoute(
        path: '/category/:name',
        builder: (context, state) {
          final name = state.pathParameters['name']!;
          return CategoryServicesScreen(categoryName: name);
        },
      ),
    ],
  );
});
