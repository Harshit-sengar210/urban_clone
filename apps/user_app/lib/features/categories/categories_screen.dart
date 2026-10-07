import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';

class CategoriesScreen extends StatefulWidget {
  const CategoriesScreen({super.key});

  @override
  State<CategoriesScreen> createState() => _CategoriesScreenState();
}

class _CategoriesScreenState extends State<CategoriesScreen> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        color: const Color(0xFFFDFBF7), // Warm white / very light cream
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 10),
              // Header
              _FadeInSlide(
                delay: 0,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Services',
                            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                              fontWeight: FontWeight.w800,
                              color: const Color(0xFF1A1A1A),
                              letterSpacing: -0.5,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(color: Colors.grey.withValues(alpha: 0.15)),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.02),
                                  blurRadius: 4,
                                  offset: const Offset(0, 2),
                                )
                              ]
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Text(
                                  '📍 Ghaziabad',
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                    color: Color(0xFF4A4A4A),
                                  ),
                                ),
                                const SizedBox(width: 4),
                                Icon(Icons.chevron_right, size: 14, color: Colors.grey[400]),
                              ],
                            ),
                          ),
                        ],
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
                        child: const Icon(Icons.my_location_rounded, size: 20, color: Color(0xFF1A1A1A)),
                      ),
                    ],
                  ),
                ),
              ),
              
              const SizedBox(height: 28),
              
              // Search
              _FadeInSlide(
                delay: 1,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.04),
                          blurRadius: 20,
                          offset: const Offset(0, 8),
                        ),
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.01),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: TextField(
                      decoration: InputDecoration(
                        hintText: 'Search for services...',
                        hintStyle: TextStyle(
                          color: Colors.grey[400], 
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                        prefixIcon: Padding(
                          padding: const EdgeInsets.only(left: 20.0, right: 12.0),
                          child: Icon(Icons.search_rounded, color: Colors.grey[400], size: 24),
                        ),
                        border: InputBorder.none,
                        enabledBorder: InputBorder.none,
                        focusedBorder: InputBorder.none,
                        contentPadding: const EdgeInsets.symmetric(vertical: 20),
                      ),
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 36),

              // Popular Services
              _FadeInSlide(
                delay: 2,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        'Popular services',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w800,
                          color: const Color(0xFF1A1A1A),
                          letterSpacing: -0.3,
                        ),
                      ),
                      Row(
                        children: [
                          Text(
                            'See all',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: Colors.grey[500],
                            ),
                          ),
                          const SizedBox(width: 2),
                          Icon(Icons.chevron_right, size: 16, color: Colors.grey[400]),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 16),
              
              _FadeInSlide(
                delay: 3,
                child: SizedBox(
                  height: 100,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    physics: const BouncingScrollPhysics(),
                    padding: const EdgeInsets.symmetric(horizontal: 20.0),
                    children: [
                      _CompactServiceCard(title: 'Home Cleaning', assetPath: 'assets/images/small_cleaning.png', color: const Color(0xFFFFF6ED), iconColor: const Color(0xFFE88A34)),
                      _CompactServiceCard(title: 'Plumbing', assetPath: 'assets/images/small_plumbing.png', color: const Color(0xFFF0F7FF), iconColor: const Color(0xFF3B82F6)),
                      _CompactServiceCard(title: 'Electrical', assetPath: 'assets/images/small_electrical.png', color: const Color(0xFFF3F0FF), iconColor: const Color(0xFF8B5CF6)),
                      _CompactServiceCard(title: 'AC Service', assetPath: 'assets/images/small_ac.png', color: const Color(0xFFE8FBFA), iconColor: const Color(0xFF06B6D4)),
                      _CompactServiceCard(title: 'Appliance Repair', assetPath: 'assets/images/small_repair.png', color: const Color(0xFFFFF2E5), iconColor: const Color(0xFFF97316)),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 32),
              
              // Main Categories
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: Column(
                  children: [
                    // Row 1
                    Row(
                      children: [
                        Expanded(
                          child: _FadeInSlide(
                            delay: 4,
                            child: _MainCategoryCard(
                              title: 'Home Cleaning',
                              subtitle: 'Keep your home fresh & clean',
                              icon: Icons.cleaning_services_rounded,
                              bgColor: const Color(0xFFFFF6ED),
                              accentColor: const Color(0xFFE88A34),
                              assetPath: 'assets/images/large_cleaning.png',
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _FadeInSlide(
                            delay: 5,
                            child: _MainCategoryCard(
                              title: 'Plumbing',
                              subtitle: 'Fix leaks & water issues',
                              icon: Icons.plumbing_rounded,
                              bgColor: const Color(0xFFF0F7FF),
                              accentColor: const Color(0xFF3B82F6),
                              assetPath: 'assets/images/large_plumbing.png',
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    // Row 2
                    Row(
                      children: [
                        Expanded(
                          child: _FadeInSlide(
                            delay: 6,
                            child: _MainCategoryCard(
                              title: 'Electrical',
                              subtitle: 'Safe & reliable electrical work',
                              icon: Icons.electric_bolt_rounded,
                              bgColor: const Color(0xFFF3F0FF),
                              accentColor: const Color(0xFF8B5CF6),
                              assetPath: 'assets/images/large_electrical.png',
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _FadeInSlide(
                            delay: 7,
                            child: _MainCategoryCard(
                              title: 'AC Service',
                              subtitle: 'Cool comfort all year round',
                              icon: Icons.ac_unit_rounded,
                              bgColor: const Color(0xFFE8FBFA),
                              accentColor: const Color(0xFF06B6D4),
                              assetPath: 'assets/images/large_ac.png',
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    // Row 3 (Full width)
                    _FadeInSlide(
                      delay: 8,
                      child: _MainCategoryCard(
                        title: 'Appliance Repair',
                        subtitle: 'Get your appliances working',
                        icon: Icons.kitchen_rounded,
                        bgColor: const Color(0xFFFFF2E5),
                        accentColor: const Color(0xFFF97316),
                        assetPath: 'assets/images/large_repair.png',
                        isFullWidth: true,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 140), // Safe bottom spacing
            ],
          ),
        ),
      ),
    );
  }
}

// -----------------------------------------------------------------------------
// COMPACT SERVICE CARD
// -----------------------------------------------------------------------------
class _CompactServiceCard extends StatefulWidget {
  final String title;
  final String assetPath;
  final Color color;
  final Color iconColor;

  const _CompactServiceCard({
    required this.title,
    required this.assetPath,
    required this.color,
    required this.iconColor,
  });

  @override
  State<_CompactServiceCard> createState() => _CompactServiceCardState();
}

class _CompactServiceCardState extends State<_CompactServiceCard> {
  bool _isHovered = false;
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final scale = _isPressed ? 0.96 : (_isHovered ? 1.02 : 1.0);
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTapDown: (_) => setState(() => _isPressed = true),
        onTapUp: (_) => setState(() => _isPressed = false),
        onTapCancel: () => setState(() => _isPressed = false),
        onTap: () {
          HapticFeedback.lightImpact();
          context.push('/category/${widget.title}');
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOutCubic,
          transform: Matrix4.identity()..scale(scale),
          transformAlignment: Alignment.center,
          width: 88,
          margin: const EdgeInsets.symmetric(horizontal: 4.0),
          decoration: BoxDecoration(
            color: widget.color,
            borderRadius: BorderRadius.circular(20),
            boxShadow: _isHovered 
              ? [BoxShadow(color: widget.color.withValues(alpha: 0.4), blurRadius: 12, offset: const Offset(0, 6))]
              : [],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.6),
                  shape: BoxShape.circle,
                ),
                child: Image.asset(widget.assetPath, width: 28, height: 28, fit: BoxFit.contain),
              ),
              const SizedBox(height: 8),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4.0),
                child: Text(
                  widget.title,
                  textAlign: TextAlign.center,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: Colors.black87,
                    height: 1.1,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// -----------------------------------------------------------------------------
// MAIN CATEGORY CARD
// -----------------------------------------------------------------------------
class _MainCategoryCard extends StatefulWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color bgColor;
  final Color accentColor;
  final String assetPath;
  final bool isFullWidth;

  const _MainCategoryCard({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.bgColor,
    required this.accentColor,
    required this.assetPath,
    this.isFullWidth = false,
  });

  @override
  State<_MainCategoryCard> createState() => _MainCategoryCardState();
}

class _MainCategoryCardState extends State<_MainCategoryCard> {
  bool _isHovered = false;
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final scale = _isPressed ? 0.98 : (_isHovered ? 1.02 : 1.0);
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTapDown: (_) => setState(() => _isPressed = true),
        onTapUp: (_) => setState(() => _isPressed = false),
        onTapCancel: () => setState(() => _isPressed = false),
        onTap: () {
          HapticFeedback.mediumImpact();
          context.push('/category/${widget.title}');
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOutCubic,
          transform: Matrix4.identity()..scale(scale),
          transformAlignment: Alignment.center,
          height: widget.isFullWidth ? 130 : 150,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: widget.accentColor.withValues(alpha: _isHovered ? 0.12 : 0.04),
                blurRadius: _isHovered ? 24 : 12,
                offset: Offset(0, _isHovered ? 12 : 6),
              ),
            ],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(24),
            child: Stack(
              children: [
                // Large background image/visual
                Positioned(
                  right: widget.isFullWidth ? 16 : 8,
                  bottom: widget.isFullWidth ? 8 : 8,
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    curve: Curves.easeOut,
                    transform: Matrix4.identity()..scale(_isHovered ? 1.05 : 1.0),
                    child: Image.asset(
                      widget.assetPath,
                      width: widget.isFullWidth ? 130 : 80,
                      height: widget.isFullWidth ? 110 : 80,
                      fit: BoxFit.contain,
                      alignment: Alignment.bottomRight,
                    ),
                  ),
                ),
                
                // Content
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: widget.bgColor,
                          shape: BoxShape.circle,
                        ),
                        child: Icon(widget.icon, color: widget.accentColor, size: 20),
                      ),
                      const Spacer(),
                      Text(
                        widget.title,
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF1A1A1A),
                          letterSpacing: -0.3,
                        ),
                      ),
                      const SizedBox(height: 2),
                      SizedBox(
                        width: widget.isFullWidth ? 220 : 100,
                        child: Text(
                          widget.subtitle,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: Colors.grey[600],
                            height: 1.2,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                
                // Arrow
                Positioned(
                  top: 16,
                  right: 16,
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    transform: Matrix4.identity()..translate(_isHovered ? 4.0 : 0.0),
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: widget.bgColor.withValues(alpha: 0.5),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(Icons.arrow_forward_rounded, size: 14, color: widget.accentColor),
                    ),
                  ),
                ),
              ],
            ),
          ),
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
  final int delay; // multiplier for stagger

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
