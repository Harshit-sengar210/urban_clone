import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../../../../app/theme/app_colors.dart';
import '../../domain/booking_model.dart';
import 'package:intl/intl.dart';

class BookingDetailsScreen extends StatelessWidget {
  final String bookingId;
  final BookingModel? booking; // We could pass it or fetch it, assuming passed for now

  const BookingDetailsScreen({
    super.key,
    required this.bookingId,
    this.booking,
  });

  BookingModel _fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return BookingModel(
      id: doc.id,
      serviceName: data['serviceName'] ?? 'Unknown Service',
      imageUrl: data['imageUrl'] ?? 'https://via.placeholder.com/150',
      scheduledDate: (data['scheduledDate'] as Timestamp?)?.toDate() ?? DateTime.now(),
      address: data['address'] ?? 'Unknown Address',
      professionalName: data['professionalName'] ?? data['professional'],
      professionalRating: (data['professionalRating'] as num?)?.toDouble(),
      amount: (data['amount'] as num?)?.toDouble() ?? 0.0,
      status: _parseBookingStatus(data['status']),
      paymentStatus: _parsePaymentStatus(data['paymentStatus']),
    );
  }

  BookingStatus _parseBookingStatus(String? status) {
    switch (status) {
      case 'pending': return BookingStatus.pendingAssignment;
      case 'pending_assignment': return BookingStatus.pendingAssignment;
      case 'assigned': return BookingStatus.assigned;
      case 'accepted': return BookingStatus.accepted;
      case 'confirmed': return BookingStatus.confirmed;
      case 'on_the_way': return BookingStatus.confirmed; 
      case 'in_progress': return BookingStatus.serviceStarted;
      case 'service_started': return BookingStatus.serviceStarted;
      case 'completed': return BookingStatus.completed;
      case 'cancelled': return BookingStatus.cancelled;
      default: return BookingStatus.pendingAssignment;
    }
  }

  PaymentStatus _parsePaymentStatus(String? status) {
    switch (status) {
      case 'paid': return PaymentStatus.paid;
      default: return PaymentStatus.pending;
    }
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<DocumentSnapshot>(
      stream: FirebaseFirestore.instance.collection('bookings').doc(bookingId).snapshots(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting && booking == null) {
          return Scaffold(
            appBar: AppBar(title: const Text('Booking Details')),
            body: const Center(child: CircularProgressIndicator()),
          );
        }
        if (snapshot.hasError) {
          return Scaffold(
            appBar: AppBar(title: const Text('Booking Details')),
            body: const Center(child: Text('Error loading booking')),
          );
        }
        
        BookingModel? displayBooking = booking;
        if (snapshot.hasData && snapshot.data!.exists) {
          displayBooking = _fromFirestore(snapshot.data!);
        }

        if (displayBooking == null) {
          return Scaffold(
            appBar: AppBar(title: const Text('Booking Details')),
            body: const Center(child: Text('Booking not found')),
          );
        }
        
        return _buildContent(context, displayBooking);
      },
    );
  }

  Widget _buildContent(BuildContext context, BookingModel b) {
    final dateFormat = DateFormat('EEEE, dd MMM yyyy');
    final timeFormat = DateFormat('hh:mm a');

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Booking Details', style: TextStyle(color: AppColors.text, fontWeight: FontWeight.bold, fontSize: 18)),
        backgroundColor: AppColors.background,
        elevation: 0,
        iconTheme: const IconThemeData(color: AppColors.text),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Status Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.primaryLight.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.primaryLight.withValues(alpha: 0.3)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.info_outline, color: AppColors.primary),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Booking Status: ${_getStatusText(b.status)}',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.primary),
                    ),
                  )
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            // Service Info
            const Text('SERVICE DETAILS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textLight, letterSpacing: 1.2)),
            const SizedBox(height: 12),
            Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(
                    b.imageUrl,
                    width: 60, height: 60, fit: BoxFit.cover,
                    errorBuilder: (context, error, stack) => Container(width: 60, height: 60, color: AppColors.surface),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(b.serviceName, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.text)),
                      if (b.packageName != null) ...[
                        const SizedBox(height: 4),
                        Text(b.packageName!, style: const TextStyle(fontSize: 14, color: AppColors.textLight)),
                      ],
                    ],
                  ),
                )
              ],
            ),
            const SizedBox(height: 16),
            const Divider(height: 1, color: AppColors.border),
            const SizedBox(height: 24),

            // Live Status Timeline
            const Text('BOOKING STATUS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textLight, letterSpacing: 1.2)),
            const SizedBox(height: 16),
            _buildTimeline(b.status),
            
            const SizedBox(height: 24),
            const Divider(height: 1, color: AppColors.border),
            const SizedBox(height: 16),
            
            // Date & Time
            Row(
              children: [
                const Icon(Icons.calendar_today, size: 20, color: AppColors.textLight),
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(dateFormat.format(b.scheduledDate), style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.text)),
                    const SizedBox(height: 2),
                    Text(timeFormat.format(b.scheduledDate), style: const TextStyle(fontSize: 13, color: AppColors.textLight)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                const Icon(Icons.location_on_outlined, size: 20, color: AppColors.textLight),
                const SizedBox(width: 16),
                Expanded(
                  child: Text(b.address, style: const TextStyle(fontSize: 14, color: AppColors.text)),
                ),
              ],
            ),
            
            const SizedBox(height: 24),
            const Divider(height: 1, color: AppColors.border),
            const SizedBox(height: 24),
            
            // Professional
            const Text('PROFESSIONAL', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textLight, letterSpacing: 1.2)),
            const SizedBox(height: 12),
            if (b.professionalName != null) ...[
              Row(
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: AppColors.primaryLight.withValues(alpha: 0.2),
                    child: Text(b.professionalName![0], style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 18)),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(b.professionalName!, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 16, color: AppColors.text)),
                        if (b.professionalRating != null)
                          Row(
                            children: [
                              const Icon(Icons.star, color: Colors.amber, size: 14),
                              const SizedBox(width: 4),
                              Text('${b.professionalRating}', style: const TextStyle(fontSize: 13, color: AppColors.textLight)),
                            ],
                          )
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.chat_bubble_outline, color: AppColors.primary),
                    onPressed: () {},
                  )
                ],
              ),
            ] else ...[
              const Text('Finding a professional for your service...', style: TextStyle(color: AppColors.textLight, fontStyle: FontStyle.italic)),
            ],
            
            const SizedBox(height: 24),
            const Divider(height: 1, color: AppColors.border),
            const SizedBox(height: 24),
            
            // Payment
            const Text('PAYMENT SUMMARY', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textLight, letterSpacing: 1.2)),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Service total', style: TextStyle(fontSize: 14, color: AppColors.textLight)),
                Text('₹${b.amount.toInt()}', style: const TextStyle(fontSize: 14, color: AppColors.text)),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Total Amount', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.text)),
                Text('₹${b.amount.toInt()}', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.text)),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: _getPaymentColor(b.paymentStatus).withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                _getPaymentText(b.paymentStatus),
                style: TextStyle(color: _getPaymentColor(b.paymentStatus), fontWeight: FontWeight.bold, fontSize: 12),
              ),
            ),
            
            const SizedBox(height: 48),
            // ID
            Center(
              child: Text('Booking ID: ${b.id}', style: const TextStyle(color: AppColors.textLight, fontSize: 13)),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: const Text('Need Help?', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
        ),
      ),
    );
  }

  Widget _buildTimeline(BookingStatus currentStatus) {
    // Define the sequence of major statuses
    final steps = [
      {'status': BookingStatus.pendingAssignment, 'title': 'Booking Confirmed'},
      {'status': BookingStatus.assigned, 'title': 'Professional Assigned'},
      {'status': BookingStatus.confirmed, 'title': 'On the Way'},
      {'status': BookingStatus.serviceStarted, 'title': 'Service Started'},
      {'status': BookingStatus.completed, 'title': 'Service Completed'},
    ];

    // Find current progress
    int currentIndex = 0;
    if (currentStatus == BookingStatus.assigned) currentIndex = 1;
    if (currentStatus == BookingStatus.confirmed) currentIndex = 2; // confirmed/on the way
    if (currentStatus == BookingStatus.serviceStarted) currentIndex = 3;
    if (currentStatus == BookingStatus.completed) currentIndex = 4;
    
    // Handle cancelled/rejected edge cases
    if (currentStatus == BookingStatus.cancelled || currentStatus == BookingStatus.rejected || currentStatus == BookingStatus.noShow) {
      return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: Colors.red.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(12)),
        child: Row(
          children: [
            const Icon(Icons.cancel_outlined, color: Colors.red),
            const SizedBox(width: 12),
            Text('Booking ${_getStatusText(currentStatus)}', style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
          ],
        ),
      );
    }

    return Column(
      children: List.generate(steps.length, (index) {
        final isCompleted = index <= currentIndex;
        final isLast = index == steps.length - 1;
        final step = steps[index];

        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              children: [
                Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: isCompleted ? AppColors.primary : Colors.transparent,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: isCompleted ? AppColors.primary : AppColors.border,
                      width: 2,
                    ),
                  ),
                  child: isCompleted
                      ? const Icon(Icons.check, size: 14, color: Colors.white)
                      : null,
                ),
                if (!isLast)
                  Container(
                    width: 2,
                    height: 30,
                    color: isCompleted ? AppColors.primary : AppColors.border,
                  ),
              ],
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(top: 2),
                child: Text(
                  step['title'] as String,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: isCompleted ? FontWeight.bold : FontWeight.normal,
                    color: isCompleted ? AppColors.text : AppColors.textLight,
                  ),
                ),
              ),
            ),
          ],
        );
      }),
    );
  }

  String _getStatusText(BookingStatus status) {
    switch (status) {
      case BookingStatus.pendingAssignment: return 'Pending Assignment';
      case BookingStatus.assigned: return 'Professional Assigned';
      case BookingStatus.accepted: return 'Booking Accepted';
      case BookingStatus.confirmed: return 'Confirmed';
      case BookingStatus.serviceStarted: return 'In Progress';
      case BookingStatus.completed: return 'Completed';
      case BookingStatus.cancelled: return 'Cancelled';
      case BookingStatus.rejected: return 'Rejected';
      case BookingStatus.noShow: return 'No Show';
    }
  }

  String _getPaymentText(PaymentStatus status) {
    switch (status) {
      case PaymentStatus.pending: return 'Payment Pending';
      case PaymentStatus.paid: return 'Paid Successfully';
      case PaymentStatus.failed: return 'Payment Failed';
      case PaymentStatus.refunded: return 'Refunded';
    }
  }

  Color _getPaymentColor(PaymentStatus status) {
    switch (status) {
      case PaymentStatus.paid: return AppColors.success;
      case PaymentStatus.pending: return Colors.orange;
      case PaymentStatus.failed: return AppColors.error;
      case PaymentStatus.refunded: return Colors.grey;
    }
  }
}
