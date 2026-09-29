import 'package:flutter/material.dart';
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

  @override
  Widget build(BuildContext context) {
    // If booking is null, we would ideally fetch it here.
    // For this UI scaffolding task, we'll just handle the non-null case.
    if (booking == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Booking Details')),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final b = booking!;
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
