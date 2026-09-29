import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/booking_model.dart';

class BookingRepository {
  final FirebaseFirestore _firestore;
  final FirebaseAuth _auth;

  BookingRepository(this._firestore, this._auth);

  Stream<List<BookingModel>> watchUserBookings() {
    final user = _auth.currentUser;
    if (user == null) {
      return Stream.value([]);
    }

    return _firestore
        .collection('bookings')
        .where('customerId', isEqualTo: user.uid)
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) => _fromFirestore(doc)).toList());
  }

  BookingModel _fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    
    return BookingModel(
      id: doc.id,
      serviceName: data['serviceName'] ?? 'Unknown Service',
      packageName: data['packageName'],
      imageUrl: data['imageUrl'] ?? 'https://via.placeholder.com/150',
      scheduledDate: (data['scheduledDate'] as Timestamp?)?.toDate() ?? DateTime.now(),
      address: data['address'] ?? 'Unknown Address',
      professionalName: data['professionalName'],
      professionalAvatar: data['professionalAvatar'],
      professionalRating: (data['professionalRating'] as num?)?.toDouble(),
      amount: (data['amount'] as num?)?.toDouble() ?? 0.0,
      status: _parseBookingStatus(data['status']),
      paymentStatus: _parsePaymentStatus(data['paymentStatus']),
      cancellationReason: data['cancellationReason'],
      userRating: (data['userRating'] as num?)?.toDouble(),
    );
  }

  BookingStatus _parseBookingStatus(String? status) {
    switch (status) {
      case 'pending_assignment': return BookingStatus.pendingAssignment;
      case 'assigned': return BookingStatus.assigned;
      case 'accepted': return BookingStatus.accepted;
      case 'confirmed': return BookingStatus.confirmed;
      case 'service_started': return BookingStatus.serviceStarted;
      case 'completed': return BookingStatus.completed;
      case 'cancelled': return BookingStatus.cancelled;
      case 'rejected': return BookingStatus.rejected;
      case 'no_show': return BookingStatus.noShow;
      default: return BookingStatus.pendingAssignment;
    }
  }

  PaymentStatus _parsePaymentStatus(String? status) {
    switch (status) {
      case 'paid': return PaymentStatus.paid;
      case 'failed': return PaymentStatus.failed;
      case 'refunded': return PaymentStatus.refunded;
      default: return PaymentStatus.pending;
    }
  }
}

final bookingRepositoryProvider = Provider<BookingRepository>((ref) {
  return BookingRepository(FirebaseFirestore.instance, FirebaseAuth.instance);
});
