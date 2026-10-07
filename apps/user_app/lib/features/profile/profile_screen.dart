import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final User? currentUser = FirebaseAuth.instance.currentUser;

  @override
  Widget build(BuildContext context) {
    // Dynamic user data fallback
    final String displayName = currentUser?.displayName ?? 'Harsh Bhati';
    final String email = currentUser?.email ?? 'harsh@example.com';
    final String phoneNumber = currentUser?.phoneNumber ?? '+91 98765 43210';
    final String? photoUrl = currentUser?.photoURL;

    return SafeArea(
      child: Container(
        color: const Color(0xFFFDFBF7), // Warm white / very light cream
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 10),
              
              // Top Bar
              _FadeInSlide(
                delay: 0,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Profile',
                        style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          fontWeight: FontWeight.w800,
                          color: const Color(0xFF1A1A1A),
                          letterSpacing: -0.5,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.grey.withValues(alpha: 0.15)),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.02),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            )
                          ]
                        ),
                        child: const Icon(Icons.settings_outlined, size: 20, color: Color(0xFF1A1A1A)),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // Profile Header
              _FadeInSlide(
                delay: 1,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(28),
                      border: Border.all(color: Colors.grey.withValues(alpha: 0.1)),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.03),
                          blurRadius: 20,
                          offset: const Offset(0, 8),
                        ),
                      ],
                    ),
                    child: Row(
                      children: [
                        // Profile Photo with Camera Icon
                        Stack(
                          children: [
                            Container(
                              width: 72,
                              height: 72,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: const Color(0xFFF0F7FF),
                                border: Border.all(color: Colors.white, width: 3),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: 0.05),
                                    blurRadius: 10,
                                    offset: const Offset(0, 4),
                                  ),
                                ],
                                image: photoUrl != null 
                                  ? DecorationImage(image: NetworkImage(photoUrl), fit: BoxFit.cover)
                                  : null,
                              ),
                              child: photoUrl == null 
                                ? const Icon(Icons.person, size: 36, color: Color(0xFF3B82F6))
                                : null,
                            ),
                            Positioned(
                              bottom: 0,
                              right: 0,
                              child: GestureDetector(
                                onTap: () {
                                  HapticFeedback.lightImpact();
                                  // Trigger existing edit profile photo if applicable
                                },
                                child: Container(
                                  padding: const EdgeInsets.all(6),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF1A1A1A),
                                    shape: BoxShape.circle,
                                    border: Border.all(color: Colors.white, width: 2),
                                  ),
                                  child: const Icon(Icons.camera_alt, size: 12, color: Colors.white),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(width: 16),
                        
                        // User Details
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Flexible(
                                    child: Text(
                                      displayName,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.w800,
                                        color: Color(0xFF1A1A1A),
                                        letterSpacing: -0.3,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 6),
                                  Container(
                                    padding: const EdgeInsets.all(2),
                                    decoration: const BoxDecoration(
                                      color: Color(0xFFE8FBFA),
                                      shape: BoxShape.circle,
                                    ),
                                    child: const Icon(Icons.verified, size: 14, color: Color(0xFF06B6D4)),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 4),
                              Text(
                                email,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(fontSize: 13, color: Colors.grey[600], fontWeight: FontWeight.w500),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                phoneNumber,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(fontSize: 13, color: Colors.grey[600], fontWeight: FontWeight.w500),
                              ),
                            ],
                          ),
                        ),
                        
                        const SizedBox(width: 12),
                        // Edit Profile Button
                        GestureDetector(
                          onTap: () {
                            HapticFeedback.mediumImpact();
                            context.push('/edit-profile'); // Existing route if any
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            decoration: BoxDecoration(
                              color: const Color(0xFFF8F9FA),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
                            ),
                            child: const Text(
                              'Edit Profile',
                              style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF1A1A1A)),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 20),

              // Profile Completion
              _FadeInSlide(
                delay: 2,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFF6ED),
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: const Color(0xFFF9D8B6).withValues(alpha: 0.5)),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Complete your profile',
                                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Color(0xFF1A1A1A), letterSpacing: -0.3),
                              ),
                              const SizedBox(height: 4),
                              const Text(
                                'Add your details to get a better experience',
                                style: TextStyle(fontSize: 12, color: Color(0xFF8C5D33), fontWeight: FontWeight.w500),
                              ),
                              const SizedBox(height: 12),
                              Row(
                                children: [
                                  Expanded(
                                    child: ClipRRect(
                                      borderRadius: BorderRadius.circular(4),
                                      child: const LinearProgressIndicator(
                                        value: 0.8,
                                        minHeight: 6,
                                        backgroundColor: Color(0xFFFCE3CB),
                                        valueColor: AlwaysStoppedAnimation<Color>(Color(0xFFE88A34)),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 12),
                                  const Text(
                                    '80% complete',
                                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Color(0xFFE88A34)),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 16),
                        GestureDetector(
                          onTap: () {
                            HapticFeedback.lightImpact();
                            context.push('/edit-profile');
                          },
                          child: Container(
                            padding: const EdgeInsets.all(12),
                            decoration: const BoxDecoration(
                              color: Color(0xFFE88A34),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.arrow_forward_rounded, size: 18, color: Colors.white),
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 32),

              // My Activity
              _FadeInSlide(
                delay: 3,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'My Activity',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF1A1A1A), letterSpacing: -0.3),
                      ),
                      const SizedBox(height: 16),
                      Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: Colors.grey.withValues(alpha: 0.1)),
                          boxShadow: [
                            BoxShadow(color: Colors.black.withValues(alpha: 0.02), blurRadius: 10, offset: const Offset(0, 4)),
                          ],
                        ),
                        child: Column(
                          children: [
                            _ProfileListItem(
                              icon: Icons.calendar_today_rounded,
                              iconBgColor: const Color(0xFFF0F7FF),
                              iconColor: const Color(0xFF3B82F6),
                              title: 'My Bookings',
                              subtitle: 'View and manage your bookings',
                              onTap: () => context.push('/bookings'),
                            ),
                            Divider(height: 1, color: Colors.grey.withValues(alpha: 0.1), indent: 70),
                            _ProfileListItem(
                              icon: Icons.location_on_rounded,
                              iconBgColor: const Color(0xFFFFF2E5),
                              iconColor: const Color(0xFFF97316),
                              title: 'Saved Addresses',
                              subtitle: 'Manage your service locations',
                              onTap: () => context.push('/addresses'),
                            ),
                            Divider(height: 1, color: Colors.grey.withValues(alpha: 0.1), indent: 70),
                            _ProfileListItem(
                              icon: Icons.account_balance_wallet_rounded,
                              iconBgColor: const Color(0xFFE8FBFA),
                              iconColor: const Color(0xFF06B6D4),
                              title: 'Wallet & Payments',
                              subtitle: 'Payment methods and wallet',
                              onTap: () => context.push('/wallet'),
                            ),
                            Divider(height: 1, color: Colors.grey.withValues(alpha: 0.1), indent: 70),
                            _ProfileListItem(
                              icon: Icons.card_giftcard_rounded,
                              iconBgColor: const Color(0xFFF3F0FF),
                              iconColor: const Color(0xFF8B5CF6),
                              title: 'My Offers',
                              subtitle: 'View available offers',
                              onTap: () => context.push('/offers'),
                            ),
                            Divider(height: 1, color: Colors.grey.withValues(alpha: 0.1), indent: 70),
                            _ProfileListItem(
                              icon: Icons.star_rounded,
                              iconBgColor: const Color(0xFFFFF6ED),
                              iconColor: const Color(0xFFE88A34),
                              title: 'Reviews & Ratings',
                              subtitle: 'Your ratings and reviews',
                              onTap: () => context.push('/reviews'),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 32),

              // Account & Preferences
              _FadeInSlide(
                delay: 4,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Account & Preferences',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF1A1A1A), letterSpacing: -0.3),
                      ),
                      const SizedBox(height: 16),
                      Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: Colors.grey.withValues(alpha: 0.1)),
                          boxShadow: [
                            BoxShadow(color: Colors.black.withValues(alpha: 0.02), blurRadius: 10, offset: const Offset(0, 4)),
                          ],
                        ),
                        child: Column(
                          children: [
                            _ProfileListItem(
                              icon: Icons.notifications_rounded,
                              iconBgColor: const Color(0xFFF8F9FA),
                              iconColor: const Color(0xFF4A4A4A),
                              title: 'Notifications',
                              subtitle: 'Manage your notification preferences',
                              onTap: () => context.push('/notifications'),
                            ),
                            Divider(height: 1, color: Colors.grey.withValues(alpha: 0.1), indent: 70),
                            _ProfileListItem(
                              icon: Icons.lock_rounded,
                              iconBgColor: const Color(0xFFF8F9FA),
                              iconColor: const Color(0xFF4A4A4A),
                              title: 'Privacy & Security',
                              subtitle: 'Control your account privacy',
                              onTap: () => context.push('/security'),
                            ),
                            Divider(height: 1, color: Colors.grey.withValues(alpha: 0.1), indent: 70),
                            _ProfileListItem(
                              icon: Icons.settings_rounded,
                              iconBgColor: const Color(0xFFF8F9FA),
                              iconColor: const Color(0xFF4A4A4A),
                              title: 'Settings',
                              subtitle: 'Manage your app settings',
                              onTap: () => context.push('/settings'),
                            ),
                            Divider(height: 1, color: Colors.grey.withValues(alpha: 0.1), indent: 70),
                            _ProfileListItem(
                              icon: Icons.help_outline_rounded,
                              iconBgColor: const Color(0xFFE8F5E9), // Gentle green
                              iconColor: const Color(0xFF10B981),
                              title: 'Help & Support',
                              subtitle: 'Get help with your bookings',
                              onTap: () => context.push('/support'),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 32),

              // Quick Action / Support Card
              _FadeInSlide(
                delay: 5,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF0F7FF),
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: const Color(0xFF3B82F6).withValues(alpha: 0.15)),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Need help?',
                                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Color(0xFF1E3A8A), letterSpacing: -0.3),
                              ),
                              const SizedBox(height: 4),
                              const Text(
                                'Have a problem with a booking or service?',
                                style: TextStyle(fontSize: 12, color: Color(0xFF3B82F6), fontWeight: FontWeight.w500),
                              ),
                              const SizedBox(height: 12),
                              GestureDetector(
                                onTap: () {
                                  HapticFeedback.mediumImpact();
                                  context.push('/support');
                                },
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(16),
                                    boxShadow: [
                                      BoxShadow(color: const Color(0xFF3B82F6).withValues(alpha: 0.1), blurRadius: 8, offset: const Offset(0, 4)),
                                    ],
                                  ),
                                  child: const Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text(
                                        'Contact Support',
                                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF3B82F6)),
                                      ),
                                      SizedBox(width: 4),
                                      Icon(Icons.arrow_forward_rounded, size: 14, color: Color(0xFF3B82F6)),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 16),
                        Icon(Icons.support_agent_rounded, size: 64, color: const Color(0xFF3B82F6).withValues(alpha: 0.2)),
                      ],
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 32),

              // Logout Button
              _FadeInSlide(
                delay: 6,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: GestureDetector(
                    onTap: () async {
                      HapticFeedback.heavyImpact();
                      try {
                        await FirebaseAuth.instance.signOut();
                        if (context.mounted) {
                          context.go('/login');
                        }
                      } catch (e) {
                        debugPrint('Logout failed: $e');
                      }
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.red.withValues(alpha: 0.1)),
                        boxShadow: [
                          BoxShadow(color: Colors.black.withValues(alpha: 0.02), blurRadius: 8, offset: const Offset(0, 2)),
                        ],
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.logout_rounded, size: 20, color: Colors.red[400]),
                          const SizedBox(width: 8),
                          Text(
                            'Log Out',
                            style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Colors.red[400]),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 120), // Bottom padding for nav bar
            ],
          ),
        ),
      ),
    );
  }
}

// -----------------------------------------------------------------------------
// PROFILE LIST ITEM
// -----------------------------------------------------------------------------
class _ProfileListItem extends StatefulWidget {
  final IconData icon;
  final Color iconBgColor;
  final Color iconColor;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _ProfileListItem({
    required this.icon,
    required this.iconBgColor,
    required this.iconColor,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  State<_ProfileListItem> createState() => _ProfileListItemState();
}

class _ProfileListItemState extends State<_ProfileListItem> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _isPressed = true),
      onTapUp: (_) => setState(() => _isPressed = false),
      onTapCancel: () => setState(() => _isPressed = false),
      onTap: () {
        HapticFeedback.lightImpact();
        widget.onTap();
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        color: _isPressed ? Colors.grey.withValues(alpha: 0.05) : Colors.transparent,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: widget.iconBgColor,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Icon(widget.icon, color: widget.iconColor, size: 20),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.title,
                    style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Color(0xFF1A1A1A), letterSpacing: -0.2),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    widget.subtitle,
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Colors.grey[500]),
                  ),
                ],
              ),
            ),
            AnimatedContainer(
              duration: const Duration(milliseconds: 150),
              transform: Matrix4.identity()..translate(_isPressed ? 4.0 : 0.0),
              child: Icon(Icons.chevron_right_rounded, color: Colors.grey[400], size: 20),
            ),
          ],
        ),
      ),
    );
  }
}

// -----------------------------------------------------------------------------
// ANIMATION WRAPPER
// -----------------------------------------------------------------------------
class _FadeInSlide extends StatelessWidget {
  final Widget child;
  final int delay;

  const _FadeInSlide({required this.child, required this.delay});

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.0, end: 1.0),
      duration: const Duration(milliseconds: 600),
      curve: Interval(delay * 0.08, 1.0, curve: Curves.easeOutCubic),
      builder: (context, value, child) {
        return Opacity(
          opacity: value,
          child: Transform.translate(
            offset: Offset(0, 20 * (1 - value)),
            child: child,
          ),
        );
      },
      child: child,
    );
  }
}
