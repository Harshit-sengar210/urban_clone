import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../../../../app/theme/app_colors.dart';
import '../../domain/booking_model.dart';
import '../../application/booking_controller.dart';

class BookingsScreen extends ConsumerStatefulWidget {
  const BookingsScreen({super.key});

  @override
  ConsumerState<BookingsScreen> createState() => _BookingsScreenState();
}

class _BookingsScreenState extends ConsumerState<BookingsScreen> {
  String _selectedFilter = 'Upcoming';
  final List<String> _filters = ['Upcoming', 'Active', 'Completed', 'Cancelled'];

  @override
  Widget build(BuildContext context) {
    final bookingsState = ref.watch(bookingControllerProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: RefreshIndicator(
        onRefresh: () async => ref.invalidate(bookingControllerProvider),
        color: AppColors.primary,
        child: CustomScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          slivers: [
            SliverToBoxAdapter(
              child: SafeArea(
                bottom: false,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 20, 20, 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              if (context.canPop()) ...[
                                IconButton(
                                  icon: const Icon(Icons.arrow_back, color: AppColors.text),
                                  padding: EdgeInsets.zero,
                                  constraints: const BoxConstraints(),
                                  onPressed: () => context.pop(),
                                ),
                                const SizedBox(width: 12),
                              ],
                              const Text(
                                'My Bookings',
                                style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: AppColors.text),
                              ),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: AppColors.surface,
                              shape: BoxShape.circle,
                              border: Border.all(color: AppColors.border),
                            ),
                            child: const Icon(Icons.calendar_month_outlined, color: AppColors.text, size: 20),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'Manage and track your services',
                        style: TextStyle(fontSize: 14, color: AppColors.textLight),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            
            // Filters
            SliverPersistentHeader(
              pinned: true,
              delegate: _StickyFilterDelegate(
                child: Container(
                  color: AppColors.background,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  child: SizedBox(
                    height: 38,
                    child: ListView.builder(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      scrollDirection: Axis.horizontal,
                      itemCount: _filters.length,
                      itemBuilder: (context, index) {
                        final filter = _filters[index];
                        final isSelected = _selectedFilter == filter;
                        return GestureDetector(
                          onTap: () {
                            setState(() {
                              _selectedFilter = filter;
                            });
                          },
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            margin: const EdgeInsets.only(right: 12),
                            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                            decoration: BoxDecoration(
                              color: isSelected ? AppColors.primary : AppColors.surface,
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: isSelected ? AppColors.primary : AppColors.border,
                              ),
                              boxShadow: isSelected
                                  ? [BoxShadow(color: AppColors.primary.withValues(alpha: 0.3), blurRadius: 8, offset: const Offset(0, 2))]
                                  : [],
                            ),
                            child: Center(
                              child: Text(
                                filter,
                                style: TextStyle(
                                  color: isSelected ? Colors.white : AppColors.textLight,
                                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ),
            ),

            // Content
            SliverPadding(
              padding: const EdgeInsets.only(left: 20, right: 20, top: 16, bottom: 120),
              sliver: bookingsState.when(
                data: (allBookings) {
                  final filteredBookings = _filterBookings(allBookings, _selectedFilter);

                  if (filteredBookings.isEmpty) {
                    return SliverToBoxAdapter(
                      child: _buildEmptyState(_selectedFilter),
                    );
                  }

                  return SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final booking = filteredBookings[index];
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 16),
                          child: _buildBookingCard(booking),
                        );
                      },
                      childCount: filteredBookings.length,
                    ),
                  );
                },
                loading: () => SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) => Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: _buildSkeletonCard(),
                    ),
                    childCount: 3,
                  ),
                ),
                error: (error, stack) => SliverToBoxAdapter(
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(32),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.error_outline, color: AppColors.error, size: 48),
                          const SizedBox(height: 16),
                          const Text('Couldn\'t load your bookings', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                          const SizedBox(height: 8),
                          const Text('Please try again.', style: TextStyle(color: AppColors.textLight)),
                          const SizedBox(height: 24),
                          ElevatedButton(
                            onPressed: () => ref.invalidate(bookingControllerProvider),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            child: const Text('Retry', style: TextStyle(color: Colors.white)),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<BookingModel> _filterBookings(List<BookingModel> bookings, String filter) {
    switch (filter) {
      case 'Upcoming':
        final res = bookings.where((b) => b.status == BookingStatus.assigned || b.status == BookingStatus.accepted || b.status == BookingStatus.confirmed || b.status == BookingStatus.pendingAssignment).toList();
        res.sort((a, b) => a.scheduledDate.compareTo(b.scheduledDate));
        return res;
      case 'Active':
        return bookings.where((b) => b.status == BookingStatus.serviceStarted).toList();
      case 'Completed':
        final res = bookings.where((b) => b.status == BookingStatus.completed).toList();
        res.sort((a, b) => b.scheduledDate.compareTo(a.scheduledDate));
        return res;
      case 'Cancelled':
        final res = bookings.where((b) => b.status == BookingStatus.cancelled || b.status == BookingStatus.rejected || b.status == BookingStatus.noShow).toList();
        res.sort((a, b) => b.scheduledDate.compareTo(a.scheduledDate));
        return res;
      default:
        return [];
    }
  }

  Widget _buildBookingCard(BookingModel booking) {
    Widget card;
    if (booking.status == BookingStatus.serviceStarted) {
      card = _buildActiveBookingCard(booking);
    } else if (booking.status == BookingStatus.completed) {
      card = _buildCompletedBookingCard(booking);
    } else if (booking.status == BookingStatus.cancelled || booking.status == BookingStatus.rejected) {
      card = _buildCancelledBookingCard(booking);
    } else {
      card = _buildUpcomingBookingCard(booking);
    }
    
    return GestureDetector(
      onTap: () => context.push('/booking/${booking.id}', extra: booking),
      behavior: HitTestBehavior.opaque,
      child: card,
    );
  }

  Widget _buildUpcomingBookingCard(BookingModel booking) {
    final dateFormat = DateFormat('MMM dd · hh:mm a');
    final formattedDate = dateFormat.format(booking.scheduledDate);

    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.border),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.02), blurRadius: 10, offset: const Offset(0, 4)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header status
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppColors.primaryLight.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _getStatusText(booking.status).toUpperCase(),
                    style: const TextStyle(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 0.5),
                  ),
                ),
                Text('Booking ID: ${booking.id}', style: const TextStyle(fontSize: 12, color: AppColors.textLight, fontWeight: FontWeight.w500)),
              ],
            ),
          ),
          const Divider(height: 1, color: AppColors.border),
          
          // Content
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(
                    booking.imageUrl,
                    width: 70,
                    height: 70,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stack) => Container(
                      width: 70, height: 70, color: AppColors.background, child: const Icon(Icons.image_not_supported, color: AppColors.textLight),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(booking.serviceName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 17, color: AppColors.text)),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          const Icon(Icons.calendar_today, size: 14, color: AppColors.textLight),
                          const SizedBox(width: 6),
                          Text(formattedDate, style: const TextStyle(fontSize: 13, color: AppColors.text)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Row(
                        children: [
                          const Icon(Icons.location_on_outlined, size: 14, color: AppColors.textLight),
                          const SizedBox(width: 6),
                          Text(booking.address, style: const TextStyle(fontSize: 13, color: AppColors.text)),
                        ],
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
          
          // Professional info
          if (booking.professionalName != null) ...[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.background,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 16,
                      backgroundColor: AppColors.primaryLight.withValues(alpha: 0.2),
                      child: Text(booking.professionalName![0], style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 14)),
                    ),
                    const SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(booking.professionalName!, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: AppColors.text)),
                        Row(
                          children: [
                            const Icon(Icons.star, color: Colors.amber, size: 12),
                            const SizedBox(width: 4),
                            Text('${booking.professionalRating}', style: const TextStyle(fontSize: 12, color: AppColors.textLight)),
                          ],
                        )
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
          
          if (booking.professionalName == null) ...[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  SizedBox(width: 14, height: 14, child: const CircularProgressIndicator(strokeWidth: 2, color: AppColors.primary)),
                  const SizedBox(width: 12),
                  const Text('Finding a professional...', style: TextStyle(color: AppColors.textLight, fontSize: 13, fontStyle: FontStyle.italic)),
                ],
              ),
            )
          ],

          const SizedBox(height: 16),
          const Divider(height: 1, color: AppColors.border),
          
          // Bottom Actions
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('₹${booking.amount.toInt()}', style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: AppColors.text)),
                Row(
                  children: [
                    TextButton(
                      onPressed: () {},
                      style: TextButton.styleFrom(foregroundColor: AppColors.textLight),
                      child: const Text('View details', style: TextStyle(fontWeight: FontWeight.w600)),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        foregroundColor: Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                      ),
                      child: const Text('Track service', style: TextStyle(fontWeight: FontWeight.w600)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActiveBookingCard(BookingModel booking) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.primaryLight.withValues(alpha: 0.5)),
        boxShadow: [
          BoxShadow(color: AppColors.primaryLight.withValues(alpha: 0.1), blurRadius: 20, offset: const Offset(0, 8)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header status
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: AppColors.primaryLight.withValues(alpha: 0.1),
              borderRadius: const BorderRadius.only(topLeft: Radius.circular(22), topRight: Radius.circular(22)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: const BoxDecoration(color: AppColors.success, shape: BoxShape.circle),
                    ),
                    const SizedBox(width: 8),
                    const Text(
                      'Service in progress',
                      style: TextStyle(color: AppColors.text, fontSize: 14, fontWeight: FontWeight.w700),
                    ),
                  ],
                ),
                const Icon(Icons.arrow_forward_ios, size: 12, color: AppColors.textLight),
              ],
            ),
          ),
          
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(booking.serviceName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: AppColors.text)),
                const SizedBox(height: 16),
                if (booking.professionalName != null) ...[
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 20,
                        backgroundColor: AppColors.background,
                        child: Text(booking.professionalName![0], style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 16)),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(booking.professionalName!, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15, color: AppColors.text)),
                          const Text('Professional', style: TextStyle(fontSize: 12, color: AppColors.textLight)),
                        ],
                      ),
                      const Spacer(),
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppColors.surface,
                          shape: BoxShape.circle,
                          border: Border.all(color: AppColors.border),
                        ),
                        child: const Icon(Icons.chat_bubble_outline, color: AppColors.primary, size: 18),
                      ),
                    ],
                  ),
                ],
                const SizedBox(height: 24),
                // Timeline
                Row(
                  children: [
                    _buildTimelineDot(true),
                    _buildTimelineLine(true),
                    _buildTimelineDot(true),
                    _buildTimelineLine(true),
                    _buildTimelineDot(true, isActive: true),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    Text('Arrived', style: TextStyle(fontSize: 11, color: AppColors.textLight)),
                    Text('Started', style: TextStyle(fontSize: 11, color: AppColors.primary, fontWeight: FontWeight.bold)),
                    Text('Done', style: TextStyle(fontSize: 11, color: AppColors.textLight)),
                  ],
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineDot(bool isPassed, {bool isActive = false}) {
    return Container(
      width: 12,
      height: 12,
      decoration: BoxDecoration(
        color: isPassed ? AppColors.primary : AppColors.background,
        shape: BoxShape.circle,
        border: Border.all(color: isActive ? AppColors.primary : (isPassed ? AppColors.primary : AppColors.border), width: 2),
      ),
    );
  }

  Widget _buildTimelineLine(bool isPassed) {
    return Expanded(
      child: Container(
        height: 2,
        color: isPassed ? AppColors.primary : AppColors.border,
      ),
    );
  }

  Widget _buildCompletedBookingCard(BookingModel booking) {
    final dateFormat = DateFormat('dd MMM · hh:mm a');
    final formattedDate = dateFormat.format(booking.scheduledDate);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.check_circle, color: AppColors.success, size: 16),
                        const SizedBox(width: 6),
                        const Text('Completed', style: TextStyle(color: AppColors.success, fontWeight: FontWeight.bold, fontSize: 12)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(booking.serviceName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.text)),
                    const SizedBox(height: 4),
                    Text(formattedDate, style: const TextStyle(fontSize: 13, color: AppColors.textLight)),
                  ],
                ),
              ),
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(
                  booking.imageUrl,
                  width: 60,
                  height: 60,
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stack) => Container(
                    width: 60, height: 60, color: AppColors.background, child: const Icon(Icons.image_not_supported, color: AppColors.textLight),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Divider(height: 1, color: AppColors.border),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('₹${booking.amount.toInt()}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.text)),
                  if (booking.userRating != null) ...[
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        const Icon(Icons.star, color: Colors.amber, size: 14),
                        const SizedBox(width: 4),
                        Text('You rated ${booking.userRating}', style: const TextStyle(fontSize: 12, color: AppColors.textLight, fontWeight: FontWeight.w500)),
                      ],
                    )
                  ]
                ],
              ),
              OutlinedButton(
                onPressed: () {},
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.primary,
                  side: const BorderSide(color: AppColors.primary),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                ),
                child: const Text('Book again', style: TextStyle(fontWeight: FontWeight.w600)),
              )
            ],
          )
        ],
      ),
    );
  }

  Widget _buildCancelledBookingCard(BookingModel booking) {
    final dateFormat = DateFormat('dd MMM yyyy');
    final formattedDate = dateFormat.format(booking.scheduledDate);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.error.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: const Text('Cancelled', style: TextStyle(color: AppColors.error, fontWeight: FontWeight.bold, fontSize: 10)),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(booking.serviceName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.text)),
          const SizedBox(height: 4),
          Text('Scheduled for $formattedDate', style: const TextStyle(fontSize: 13, color: AppColors.textLight)),
          
          if (booking.cancellationReason != null) ...[
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(10),
              width: double.infinity,
              decoration: BoxDecoration(
                color: AppColors.background,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text('Reason: ${booking.cancellationReason}', style: const TextStyle(fontSize: 12, color: AppColors.textLight)),
            ),
          ],
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              TextButton(
                onPressed: () {},
                style: TextButton.styleFrom(foregroundColor: AppColors.primary),
                child: const Text('View details', style: TextStyle(fontWeight: FontWeight.w600)),
              ),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildSkeletonCard() {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.border),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(width: 100, height: 20, color: AppColors.background),
            const SizedBox(height: 24),
            Row(
              children: [
                Container(width: 70, height: 70, decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(12))),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(width: double.infinity, height: 16, color: AppColors.background),
                      const SizedBox(height: 8),
                      Container(width: 150, height: 12, color: AppColors.background),
                      const SizedBox(height: 8),
                      Container(width: 100, height: 12, color: AppColors.background),
                    ],
                  ),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmptyState(String filter) {
    String title;
    String subtitle;
    String ctaText = 'Explore services';

    switch (filter) {
      case 'Upcoming':
        title = 'No upcoming bookings';
        subtitle = 'Book a service and we\'ll show it here.';
        break;
      case 'Active':
        title = 'Nothing active right now';
        subtitle = 'Your ongoing services will appear here.';
        ctaText = 'Browse services';
        break;
      case 'Completed':
        title = 'No completed services yet';
        subtitle = 'Your completed bookings will appear here.';
        break;
      case 'Cancelled':
        title = 'No cancelled bookings';
        subtitle = '';
        ctaText = '';
        break;
      default:
        title = 'No bookings';
        subtitle = '';
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 20),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: AppColors.primaryLight.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.event_note, size: 64, color: AppColors.primaryLight),
          ),
          const SizedBox(height: 24),
          Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.text)),
          if (subtitle.isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(subtitle, textAlign: TextAlign.center, style: const TextStyle(fontSize: 14, color: AppColors.textLight)),
          ],
          if (ctaText.isNotEmpty) ...[
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: Text(ctaText, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
            )
          ]
        ],
      ),
    );
  }

  String _getStatusText(BookingStatus status) {
    switch (status) {
      case BookingStatus.pendingAssignment:
        return 'Pending Assignment';
      case BookingStatus.assigned:
        return 'Professional Assigned';
      case BookingStatus.accepted:
        return 'Booking Accepted';
      case BookingStatus.confirmed:
        return 'Confirmed';
      case BookingStatus.serviceStarted:
        return 'In Progress';
      case BookingStatus.completed:
        return 'Completed';
      case BookingStatus.cancelled:
        return 'Cancelled';
      case BookingStatus.rejected:
        return 'Rejected';
      case BookingStatus.noShow:
        return 'No Show';
    }
  }
}

class _StickyFilterDelegate extends SliverPersistentHeaderDelegate {
  final Widget child;

  _StickyFilterDelegate({required this.child});

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    return child;
  }

  @override
  double get maxExtent => 62.0;

  @override
  double get minExtent => 62.0;

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) {
    return false;
  }
}
