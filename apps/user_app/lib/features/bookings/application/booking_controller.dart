import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/booking_model.dart';
import '../data/booking_repository.dart';

final bookingControllerProvider = StreamProvider.autoDispose<List<BookingModel>>((ref) {
  final repository = ref.watch(bookingRepositoryProvider);
  return repository.watchUserBookings();
});
