import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

// Screens
import '../features/home/home_screen.dart';
import '../features/auth/login_screen.dart';
import '../features/auth/splash_screen.dart';
import '../features/auth/onboarding_screen.dart';
import '../features/auth/signup_screen.dart';
import '../features/auth/otp_screen.dart';
import '../features/auth/location_screen.dart';
import '../features/profile/placeholder_screen.dart';
import '../features/profile/addresses_screen.dart';
import '../features/profile/add_address_screen.dart';
import '../features/bookings/presentation/screens/bookings_screen.dart';
import '../features/services/presentation/screens/category_services_screen.dart';
import '../features/bookings/presentation/screens/booking_details_screen.dart';
import '../features/bookings/domain/booking_model.dart';
import '../features/services/presentation/screens/service_details_screen.dart';
import '../features/services/domain/service_model.dart';
import '../features/bookings/presentation/screens/checkout_screen.dart';
import '../features/bookings/presentation/screens/booking_success_screen.dart';
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
        path: '/signup',
        builder: (context, state) => const SignupScreen(),
      ),
      GoRoute(
        path: '/otp',
        builder: (context, state) => const OtpScreen(),
      ),
      GoRoute(
        path: '/location',
        builder: (context, state) => const LocationScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingScreen(),
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
        path: '/service/:id',
        redirect: (context, state) {
          if (state.extra == null) return '/home';
          return null;
        },
        builder: (context, state) {
          final service = state.extra as ServiceModel;
          return ServiceDetailsScreen(service: service);
        },
      ),
      GoRoute(
        path: '/checkout',
        redirect: (context, state) {
          if (state.extra == null) return '/home';
          return null;
        },
        builder: (context, state) {
          final data = state.extra as Map<String, dynamic>;
          return CheckoutScreen(
            service: data['service'] as ServiceModel,
          );
        },
      ),
      GoRoute(
        path: '/category/:name',
        builder: (context, state) {
          final name = state.pathParameters['name']!;
          return CategoryServicesScreen(categoryName: name);
        },
      ),
      GoRoute(
        path: '/booking-success',
        redirect: (context, state) {
          if (state.extra == null) return '/home';
          return null;
        },
        builder: (context, state) {
          final data = state.extra as Map<String, dynamic>;
          return BookingSuccessScreen(
            service: data['service'] as ServiceModel,
            bookingId: data['bookingId'] as String,
          );
        },
      ),
      GoRoute(
        path: '/edit-profile',
        builder: (context, state) => const PlaceholderScreen(title: 'Edit Profile'),
      ),
      GoRoute(
        path: '/bookings',
        builder: (context, state) => const BookingsScreen(),
      ),
      GoRoute(
        path: '/addresses',
        builder: (context, state) => const AddressesScreen(),
      ),
      GoRoute(
        path: '/add-address',
        builder: (context, state) => const AddAddressScreen(),
      ),
      GoRoute(
        path: '/wallet',
        builder: (context, state) => const PlaceholderScreen(title: 'Wallet & Payments'),
      ),
      GoRoute(
        path: '/offers',
        builder: (context, state) => const PlaceholderScreen(title: 'My Offers'),
      ),
      GoRoute(
        path: '/reviews',
        builder: (context, state) => const PlaceholderScreen(title: 'Reviews & Ratings'),
      ),
      GoRoute(
        path: '/notifications',
        builder: (context, state) => const PlaceholderScreen(title: 'Notifications'),
      ),
      GoRoute(
        path: '/security',
        builder: (context, state) => const PlaceholderScreen(title: 'Privacy & Security'),
      ),
      GoRoute(
        path: '/settings',
        builder: (context, state) => const PlaceholderScreen(title: 'Settings'),
      ),
      GoRoute(
        path: '/support',
        builder: (context, state) => const PlaceholderScreen(title: 'Help & Support'),
      ),
    ],
  );
});
