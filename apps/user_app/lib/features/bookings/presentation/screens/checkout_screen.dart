import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../../../features/services/domain/service_model.dart';

class CheckoutScreen extends StatefulWidget {
  final ServiceModel service;

  const CheckoutScreen({
    super.key,
    required this.service,
  });

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  int _selectedDateIndex = 0;
  int _selectedTimeIndex = 0;
  String? _selectedAddressDetail;
  String? _selectedPaymentMethod;

  final List<DateTime> _dates = List.generate(14, (i) => DateTime.now().add(Duration(days: i)));
  final List<String> _times = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM'
  ];

  String _getShortWeekday(DateTime date) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[date.weekday - 1];
  }

  String _getShortMonth(DateTime date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.month - 1];
  }

  @override
  Widget build(BuildContext context) {
    final primaryDark = const Color(0xFF293326);
    final bgLight = const Color(0xFFF9F9F7);
    
    // Calculate pricing
    final itemTotal = widget.service.price;
    final taxes = itemTotal * 0.18; // 18% tax
    final platformFee = 49.0;
    final total = itemTotal + taxes + platformFee;

    return Scaffold(
      backgroundColor: bgLight,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black87),
          onPressed: () {
            HapticFeedback.lightImpact();
            context.pop();
          },
        ),
        title: const Text(
          'Checkout',
          style: TextStyle(color: Colors.black87, fontWeight: FontWeight.w700, fontSize: 18),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 16),
            
            // 0. Date & Time Selection (New)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          children: [
                            Text('${_getShortMonth(_dates[0])} ${_dates[0].year}', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                            const SizedBox(width: 4),
                            const Icon(Icons.keyboard_arrow_down, size: 16),
                          ],
                        ),
                      ),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(4),
                            decoration: BoxDecoration(border: Border.all(color: Colors.grey.withValues(alpha: 0.2)), borderRadius: BorderRadius.circular(8)),
                            child: const Icon(Icons.chevron_left, size: 18),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.all(4),
                            decoration: BoxDecoration(border: Border.all(color: Colors.grey.withValues(alpha: 0.2)), borderRadius: BorderRadius.circular(8)),
                            child: const Icon(Icons.chevron_right, size: 18),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    height: 70,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      physics: const BouncingScrollPhysics(),
                      itemCount: _dates.length,
                      itemBuilder: (context, index) {
                        final date = _dates[index];
                        final isSelected = _selectedDateIndex == index;
                        return GestureDetector(
                          onTap: () => setState(() => _selectedDateIndex = index),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            margin: const EdgeInsets.only(right: 12),
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            decoration: BoxDecoration(
                              color: isSelected ? const Color(0xFF0F172A) : Colors.white,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  _getShortWeekday(date),
                                  style: TextStyle(
                                    color: isSelected ? Colors.white70 : Colors.grey[600],
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  '${date.day < 10 ? '0' : ''}${date.day}',
                                  style: TextStyle(
                                    color: isSelected ? Colors.white : const Color(0xFF1A1A1A),
                                    fontSize: 15,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    children: [
                      Text('Lisbon (GMT +1)', style: TextStyle(color: Colors.grey[700], fontSize: 13, fontWeight: FontWeight.w500)),
                      const SizedBox(width: 4),
                      Icon(Icons.keyboard_arrow_down, size: 16, color: Colors.grey[700]),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 12,
                    runSpacing: 12,
                    children: List.generate(_times.length, (index) {
                      final isSelected = _selectedTimeIndex == index;
                      return GestureDetector(
                        onTap: () => setState(() => _selectedTimeIndex = index),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          width: (MediaQuery.of(context).size.width - 40 - 24) / 3, // 3 columns
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          decoration: BoxDecoration(
                            color: isSelected ? const Color(0xFF0F172A) : Colors.white,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
                          ),
                          alignment: Alignment.center,
                          child: Text(
                            _times[index],
                            style: TextStyle(
                              color: isSelected ? Colors.white : Colors.grey[700],
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      );
                    }),
                  ),
                ],
              ),
            ),
            
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 24),
              child: Divider(thickness: 4, color: Color(0xFFF1F1F1)),
            ),
            
            // 1. Add Address Option
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Service Address', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Color(0xFF1A1A1A))),
                  const SizedBox(height: 12),
                  GestureDetector(
                    onTap: () => _showAddressPicker(context, primaryDark),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: primaryDark.withValues(alpha: 0.2)),
                      ),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(color: primaryDark.withValues(alpha: 0.05), shape: BoxShape.circle),
                            child: Icon(Icons.location_on, color: primaryDark, size: 22),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Home', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                                const SizedBox(height: 4),
                                Text(_selectedAddressDetail ?? 'Add your complete address here...', style: TextStyle(color: _selectedAddressDetail != null ? const Color(0xFF1A1A1A) : Colors.grey[600], fontSize: 13)),
                              ],
                            ),
                          ),
                          Icon(Icons.chevron_right, color: Colors.grey[400]),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // 2 & 3. Service details + Date/Time
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Booking Details', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Color(0xFF1A1A1A))),
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: widget.service.imageUrl.startsWith('assets/')
                                  ? Image.asset(widget.service.imageUrl, width: 50, height: 50, fit: BoxFit.cover)
                                  : Image.network(widget.service.imageUrl, width: 50, height: 50, fit: BoxFit.cover, errorBuilder: (_,_,_) => const SizedBox(width: 50, height: 50)),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(widget.service.title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                                  const SizedBox(height: 4),
                                  Text('₹${widget.service.price.toInt()}', style: TextStyle(fontWeight: FontWeight.w700, color: primaryDark)),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const Padding(
                          padding: EdgeInsets.symmetric(vertical: 12),
                          child: Divider(),
                        ),
                        Row(
                          children: [
                            Icon(Icons.calendar_today_outlined, size: 16, color: Colors.grey[600]),
                            const SizedBox(width: 8),
                            Text(
                              '${_dates[_selectedDateIndex].day} ${_getShortMonth(_dates[_selectedDateIndex])} • ${_times[_selectedTimeIndex]}',
                              style: TextStyle(color: Colors.grey[800], fontWeight: FontWeight.w600, fontSize: 13),
                            ),
                          ],
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // 4. Coupon
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
                ),
                child: Row(
                  children: [
                    Icon(Icons.local_offer_outlined, color: primaryDark, size: 20),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Text('Apply Coupon / Gift Card', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    ),
                    Text('Apply', style: TextStyle(fontWeight: FontWeight.w800, color: primaryDark, fontSize: 14)),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 24),
            
            // 5. Payment Summary (History how your money count)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Payment Summary', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Color(0xFF1A1A1A))),
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      children: [
                        _buildSummaryRow('Item Total', '₹${itemTotal.toInt()}'),
                        const SizedBox(height: 8),
                        _buildSummaryRow('Taxes & Fee', '₹${taxes.toInt()}'),
                        const SizedBox(height: 8),
                        _buildSummaryRow('Platform Fee', '₹${platformFee.toInt()}'),
                        const Padding(
                          padding: EdgeInsets.symmetric(vertical: 12),
                          child: Divider(),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Total Amount', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                            Text('₹${total.toInt()}', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: primaryDark)),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 40),
          ],
        ),
      ),
      
      bottomNavigationBar: SafeArea(
        child: Container(
          padding: const EdgeInsets.fromLTRB(20, 16, 20, 16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: const BorderRadius.only(topLeft: Radius.circular(24), topRight: Radius.circular(24)),
            boxShadow: [
              BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 20, offset: const Offset(0, -5)),
            ],
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Pay Button Left Side
              Expanded(
                child: GestureDetector(
                  onTap: () async {
                    HapticFeedback.heavyImpact();
                    if (_selectedAddressDetail == null) {
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please select an address')));
                      return;
                    }
                    if (_selectedPaymentMethod == null) {
                      _showPaymentSelector(context, primaryDark);
                    } else {
                      // Show loading indicator
                      showDialog(
                        context: context,
                        barrierDismissible: false,
                        builder: (c) => const Center(child: CircularProgressIndicator(color: Colors.white)),
                      );

                      try {
                        final user = FirebaseAuth.instance.currentUser;
                        if (user == null) throw Exception('Not logged in');

                        // Save booking
                        final scheduledDate = _dates[_selectedDateIndex];
                        final timeString = _times[_selectedTimeIndex];
                        // Parse time string to add to date
                        final timeParts = timeString.split(' ');
                        final hm = timeParts[0].split(':');
                        var hour = int.parse(hm[0]);
                        final minute = int.parse(hm[1]);
                        if (timeParts[1] == 'PM' && hour < 12) hour += 12;
                        if (timeParts[1] == 'AM' && hour == 12) hour = 0;
                        
                        final finalDate = DateTime(
                          scheduledDate.year, scheduledDate.month, scheduledDate.day,
                          hour, minute
                        );

                        final docRef = await FirebaseFirestore.instance.collection('bookings').add({
                          'userId': user.uid, // Required by remote firestore.rules
                          'customerId': user.uid, // Required by booking_repository.dart
                          'userName': user.displayName ?? user.email ?? 'Customer',
                          'serviceName': widget.service.title,
                          'imageUrl': widget.service.imageUrl,
                          'scheduledDate': Timestamp.fromDate(finalDate),
                          'date': Timestamp.fromDate(finalDate),
                          'time': timeString,
                          'address': _selectedAddressDetail,
                          'amount': total,
                          'status': 'pending',
                          'paymentStatus': _selectedPaymentMethod == 'Pay via UPI/Card' ? 'paid' : 'pending',
                          'createdAt': FieldValue.serverTimestamp(),
                        });

                        if (mounted) {
                          Navigator.pop(context); // close dialog
                          context.go('/booking-success', extra: {
                            'service': widget.service,
                            'bookingId': docRef.id,
                          });
                        }
                      } catch (e) {
                        if (mounted) {
                          Navigator.pop(context); // close dialog
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Failed to book: $e')));
                        }
                      }
                    }
                  },
                  child: Container(
                    height: 56,
                    decoration: BoxDecoration(
                      color: primaryDark,
                      borderRadius: BorderRadius.circular(28),
                    ),
                    alignment: Alignment.center,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text('Pay Now', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w800)),
                        if (_selectedPaymentMethod != null)
                          Text(_selectedPaymentMethod!, style: const TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 24),
              // Money Right Side
              Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text('Total to pay', style: TextStyle(color: Colors.grey[500], fontSize: 12, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 2),
                  Text(
                    '₹${total.toInt()}',
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: Color(0xFF1A1A1A)),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSummaryRow(String label, String amount) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: TextStyle(color: Colors.grey[600], fontSize: 14)),
        Text(amount, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
      ],
    );
  }

  void _showAddressPicker(BuildContext context, Color primaryDark) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        final user = FirebaseAuth.instance.currentUser;
        return Container(
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
          ),
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.only(topLeft: Radius.circular(24), topRight: Radius.circular(24)),
          ),
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Select Address', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
                    IconButton(
                      onPressed: () => Navigator.pop(context),
                      icon: const Icon(Icons.close),
                    )
                  ],
                ),
                const SizedBox(height: 16),
                
                // Fetch addresses from Firestore
                if (user != null)
                  StreamBuilder<QuerySnapshot>(
                    stream: FirebaseFirestore.instance
                        .collection('users')
                        .doc(user.uid)
                        .collection('addresses')
                        .orderBy('createdAt', descending: true)
                        .snapshots(),
                    builder: (context, snapshot) {
                      if (snapshot.hasError) return Text('Error: ${snapshot.error}');
                      if (snapshot.connectionState == ConnectionState.waiting) return const Center(child: CircularProgressIndicator());
                      
                      final addresses = snapshot.data?.docs ?? [];
                      
                      if (addresses.isEmpty) {
                        return const Padding(
                          padding: EdgeInsets.symmetric(vertical: 16.0),
                          child: Text('No saved addresses found. Please add a new address.'),
                        );
                      }
                      
                      return Column(
                        children: addresses.map((doc) {
                          final data = doc.data() as Map<String, dynamic>;
                          final title = data['title'] ?? 'Address';
                          final address = data['address'] ?? '';
                          final isSelected = _selectedAddressDetail == address;
                          
                          return GestureDetector(
                            onTap: () {
                              setState(() {
                                _selectedAddressDetail = address;
                              });
                              Navigator.pop(context);
                            },
                            child: Container(
                              margin: const EdgeInsets.only(bottom: 12),
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                border: Border.all(color: isSelected ? primaryDark : Colors.grey.withValues(alpha: 0.3)),
                                color: isSelected ? primaryDark.withValues(alpha: 0.05) : Colors.transparent,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Row(
                                children: [
                                  Icon(Icons.location_on_outlined, color: primaryDark),
                                  const SizedBox(width: 16),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                                        const SizedBox(height: 4),
                                        Text(address, style: const TextStyle(color: Colors.grey, fontSize: 13)),
                                      ],
                                    ),
                                  ),
                                  if (isSelected) Icon(Icons.check_circle, color: primaryDark),
                                ],
                              ),
                            ),
                          );
                        }).toList(),
                      );
                    },
                  ),
                
                const SizedBox(height: 16),
                
                // Option 2: Add new
                GestureDetector(
                  onTap: () {
                    Navigator.pop(context);
                    context.push('/add-address');
                  },
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: primaryDark.withValues(alpha: 0.05),
                      border: Border.all(color: primaryDark.withValues(alpha: 0.2)),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.add_location_alt, color: primaryDark),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Text('Add a new address', style: TextStyle(fontWeight: FontWeight.w700, color: primaryDark, fontSize: 15)),
                        ),
                        Icon(Icons.chevron_right, color: primaryDark),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _showPaymentSelector(BuildContext context, Color primaryDark) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        bool showCardForm = false;
        final cardController = TextEditingController();

        return StatefulBuilder(
          builder: (context, setModalState) {
            return Container(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom,
              ),
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(topLeft: Radius.circular(24), topRight: Radius.circular(24)),
              ),
              child: SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          showCardForm ? 'Enter Card Details' : 'Select Payment Method',
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                        ),
                        IconButton(
                          onPressed: () => Navigator.pop(context),
                          icon: const Icon(Icons.close),
                        )
                      ],
                    ),
                    const SizedBox(height: 16),
                    if (!showCardForm) ...[
                      _buildPaymentOption(
                        icon: Icons.money,
                        title: 'Pay on service',
                        onTap: () {
                          setState(() => _selectedPaymentMethod = 'Pay after service');
                          Navigator.pop(context);
                        },
                      ),
                      const SizedBox(height: 12),
                      _buildPaymentOption(
                        icon: Icons.account_balance_wallet,
                        title: 'Pay online',
                        onTap: () {
                          setState(() => _selectedPaymentMethod = 'Online payment');
                          Navigator.pop(context);
                        },
                      ),
                      const SizedBox(height: 12),
                      _buildPaymentOption(
                        icon: Icons.credit_card,
                        title: 'Pay with card',
                        onTap: () {
                          setModalState(() => showCardForm = true);
                        },
                      ),
                    ] else ...[
                      TextField(
                        controller: cardController,
                        keyboardType: TextInputType.number,
                        decoration: InputDecoration(
                          labelText: 'Card Number',
                          prefixIcon: const Icon(Icons.credit_card),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: TextField(
                              decoration: InputDecoration(
                                labelText: 'Expiry (MM/YY)',
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: TextField(
                              obscureText: true,
                              decoration: InputDecoration(
                                labelText: 'CVV',
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 24),
                      SizedBox(
                        width: double.infinity,
                        height: 54,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: primaryDark,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          ),
                          onPressed: () {
                            if (cardController.text.isNotEmpty) {
                              setState(() {
                                final last4 = cardController.text.length >= 4 
                                    ? cardController.text.substring(cardController.text.length - 4) 
                                    : 'Card';
                                _selectedPaymentMethod = 'Card ending in $last4';
                              });
                              Navigator.pop(context);
                            }
                          },
                          child: const Text('Save Card & Select', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 16)),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            );
          }
        );
      }
    );
  }

  Widget _buildPaymentOption({required IconData icon, required String title, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            Icon(icon, color: const Color(0xFF293326)),
            const SizedBox(width: 16),
            Expanded(child: Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15))),
            Icon(Icons.chevron_right, color: Colors.grey[400]),
          ],
        ),
      ),
    );
  }
}
