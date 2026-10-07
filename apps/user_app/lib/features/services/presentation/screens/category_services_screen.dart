import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../domain/service_model.dart';
import '../../data/service_repository.dart';

// --- Category Metadata Models & Helpers ---
class CategoryMetadata {
  final String title;
  final String description;
  final String heroImage;
  final Color bgColor;
  final Color accentColor;
  final IconData icon;

  CategoryMetadata({
    required this.title,
    required this.description,
    required this.heroImage,
    required this.bgColor,
    required this.accentColor,
    required this.icon,
  });
}

CategoryMetadata _getMetadata(String name) {
  final lower = name.toLowerCase();
  if (lower.contains('clean')) {
    return CategoryMetadata(
      title: 'Home Cleaning',
      description: 'Keep your home fresh & clean',
      heroImage: 'assets/images/large_cleaning.png',
      bgColor: const Color(0xFFFFF6ED),
      accentColor: const Color(0xFFE88A34),
      icon: Icons.cleaning_services_rounded,
    );
  } else if (lower.contains('plumb')) {
    return CategoryMetadata(
      title: 'Plumbing',
      description: 'Fix leaks & water issues',
      heroImage: 'assets/images/large_plumbing.png',
      bgColor: const Color(0xFFF0F7FF),
      accentColor: const Color(0xFF3B82F6),
      icon: Icons.plumbing_rounded,
    );
  } else if (lower.contains('electric')) {
    return CategoryMetadata(
      title: 'Electrical',
      description: 'Safe & reliable electrical work',
      heroImage: 'assets/images/large_electrical.png',
      bgColor: const Color(0xFFF3F0FF),
      accentColor: const Color(0xFF8B5CF6),
      icon: Icons.electric_bolt_rounded,
    );
  } else if (lower.contains('ac')) {
    return CategoryMetadata(
      title: 'AC Service',
      description: 'Cool comfort all year round',
      heroImage: 'assets/images/large_ac.png',
      bgColor: const Color(0xFFE8FBFA),
      accentColor: const Color(0xFF06B6D4),
      icon: Icons.ac_unit_rounded,
    );
  } else if (lower.contains('repair') || lower.contains('appliance')) {
    return CategoryMetadata(
      title: 'Appliance Repair',
      description: 'Get your appliances working',
      heroImage: 'assets/images/large_repair.png',
      bgColor: const Color(0xFFFFF2E5),
      accentColor: const Color(0xFFF97316),
      icon: Icons.kitchen_rounded,
    );
  }
  return CategoryMetadata(
    title: name,
    description: 'Explore our premium services',
    heroImage: 'assets/images/large_cleaning.png',
    bgColor: const Color(0xFFF8F9FA),
    accentColor: const Color(0xFF1A1A1A),
    icon: Icons.build_circle_rounded,
  );
}

List<ServiceModel> _getFallbackServices(String name) {
  final lower = name.toLowerCase();
  if (lower.contains('clean')) {
    return [
      ServiceModel(id: 'c1', categoryId: 'cleaning', subcategory: '', title: 'Home Cleaning', description: 'Basic cleaning for a fresh home', duration: '2–3 hrs', price: 999, rating: 4.8, reviews: 1200, imageUrl: 'assets/images/small_cleaning.png'),
      ServiceModel(id: 'c2', categoryId: 'cleaning', subcategory: '', title: 'Deep Cleaning', description: 'Thorough cleaning for a healthier home', duration: '3–5 hrs', price: 1499, rating: 4.9, reviews: 3400, imageUrl: 'assets/images/small_cleaning.png'),
      ServiceModel(id: 'c3', categoryId: 'cleaning', subcategory: '', title: 'Sofa Cleaning', description: 'Freshen up your sofa and upholstery', duration: '1–2 hrs', price: 799, rating: 4.7, reviews: 800, imageUrl: 'assets/images/small_cleaning.png'),
      ServiceModel(id: 'c4', categoryId: 'cleaning', subcategory: '', title: 'Carpet Cleaning', description: 'Deep clean for your carpets & rugs', duration: '1–2 hrs', price: 999, rating: 4.6, reviews: 650, imageUrl: 'assets/images/small_cleaning.png'),
      ServiceModel(id: 'c5', categoryId: 'cleaning', subcategory: '', title: 'Move In/Out Cleaning', description: 'Complete cleaning for a fresh start', duration: '4–6 hrs', price: 2499, rating: 4.9, reviews: 210, imageUrl: 'assets/images/small_cleaning.png'),
    ];
  } else if (lower.contains('plumb')) {
    return [
      ServiceModel(id: 'p1', categoryId: 'plumbing', subcategory: '', title: 'Pipe Repair', description: 'Fix broken or leaking pipes', duration: '1–2 hrs', price: 299, rating: 4.8, reviews: 400, imageUrl: 'assets/images/small_plumbing.png'),
      ServiceModel(id: 'p2', categoryId: 'plumbing', subcategory: '', title: 'Tap & Faucet Repair', description: 'Repair or replace leaking taps', duration: '45 mins', price: 199, rating: 4.7, reviews: 520, imageUrl: 'assets/images/small_plumbing.png'),
      ServiceModel(id: 'p3', categoryId: 'plumbing', subcategory: '', title: 'Drainage & Blockage', description: 'Clear clogged drains and pipes', duration: '1–2 hrs', price: 499, rating: 4.6, reviews: 310, imageUrl: 'assets/images/small_plumbing.png'),
      ServiceModel(id: 'p4', categoryId: 'plumbing', subcategory: '', title: 'Toilet Repair', description: 'Fix flush tanks and leaks', duration: '1 hr', price: 349, rating: 4.8, reviews: 620, imageUrl: 'assets/images/small_plumbing.png'),
    ];
  } else if (lower.contains('electric')) {
    return [
      ServiceModel(id: 'e1', categoryId: 'electrical', subcategory: '', title: 'Switch & Socket Repair', description: 'Fix broken switches and sockets', duration: '30 mins', price: 149, rating: 4.8, reviews: 300, imageUrl: 'assets/images/small_electrical.png'),
      ServiceModel(id: 'e2', categoryId: 'electrical', subcategory: '', title: 'Fan Repair', description: 'Repair ceiling or exhaust fans', duration: '1 hr', price: 249, rating: 4.7, reviews: 890, imageUrl: 'assets/images/small_electrical.png'),
      ServiceModel(id: 'e3', categoryId: 'electrical', subcategory: '', title: 'Light Installation', description: 'Install tube lights, bulbs or fixtures', duration: '45 mins', price: 199, rating: 4.9, reviews: 450, imageUrl: 'assets/images/small_electrical.png'),
      ServiceModel(id: 'e4', categoryId: 'electrical', subcategory: '', title: 'MCB & Fuse Repair', description: 'Fix power tripping issues safely', duration: '1 hr', price: 399, rating: 4.8, reviews: 210, imageUrl: 'assets/images/small_electrical.png'),
    ];
  } else if (lower.contains('ac')) {
    return [
      ServiceModel(id: 'a1', categoryId: 'ac', subcategory: '', title: 'AC Service', description: 'Basic AC servicing & cleaning', duration: '1 hr', price: 499, rating: 4.8, reviews: 1500, imageUrl: 'assets/images/small_ac.png'),
      ServiceModel(id: 'a2', categoryId: 'ac', subcategory: '', title: 'AC Repair', description: 'Diagnosis and repair for AC issues', duration: '1–2 hrs', price: 399, rating: 4.7, reviews: 900, imageUrl: 'assets/images/small_ac.png'),
      ServiceModel(id: 'a3', categoryId: 'ac', subcategory: '', title: 'AC Installation', description: 'Safe installation of Split or Window AC', duration: '1–2 hrs', price: 1499, rating: 4.8, reviews: 420, imageUrl: 'assets/images/small_ac.png'),
      ServiceModel(id: 'a4', categoryId: 'ac', subcategory: '', title: 'AC Deep Cleaning', description: 'Thorough foam-jet deep clean', duration: '1.5 hrs', price: 899, rating: 4.9, reviews: 630, imageUrl: 'assets/images/small_ac.png'),
    ];
  } else if (lower.contains('repair') || lower.contains('appliance')) {
    return [
      ServiceModel(id: 'r1', categoryId: 'repair', subcategory: '', title: 'Washing Machine Repair', description: 'Fix front/top load washing machines', duration: '1–2 hrs', price: 499, rating: 4.8, reviews: 1100, imageUrl: 'assets/images/small_repair.png'),
      ServiceModel(id: 'r2', categoryId: 'repair', subcategory: '', title: 'Refrigerator Repair', description: 'Direct cool or frost-free repair', duration: '1–2 hrs', price: 599, rating: 4.7, reviews: 850, imageUrl: 'assets/images/small_repair.png'),
      ServiceModel(id: 'r3', categoryId: 'repair', subcategory: '', title: 'Microwave Repair', description: 'Solo, grill or convection models', duration: '1 hr', price: 399, rating: 4.8, reviews: 420, imageUrl: 'assets/images/small_repair.png'),
      ServiceModel(id: 'r4', categoryId: 'repair', subcategory: '', title: 'Geyser Repair', description: 'Instant or storage water heaters', duration: '1 hr', price: 349, rating: 4.7, reviews: 590, imageUrl: 'assets/images/small_repair.png'),
    ];
  }
  return [];
}

// --- Main Screen ---
class CategoryServicesScreen extends ConsumerStatefulWidget {
  final String categoryName;
  const CategoryServicesScreen({super.key, required this.categoryName});

  @override
  ConsumerState<CategoryServicesScreen> createState() => _CategoryServicesScreenState();
}

class _CategoryServicesScreenState extends ConsumerState<CategoryServicesScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final meta = _getMetadata(widget.categoryName);
    
    // Fetch from Firebase backend using existing provider
    final categoryId = widget.categoryName.toLowerCase();
    final servicesAsyncValue = ref.watch(categoryServicesProvider(categoryId));

    return Scaffold(
      backgroundColor: const Color(0xFFFDFBF7), // Warm white
      body: SafeArea(
        child: Column(
          children: [
            // 1. Header
            _FadeInSlide(
              delay: 0,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () {
                        HapticFeedback.lightImpact();
                        context.pop();
                      },
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.grey.withValues(alpha: 0.15)),
                          boxShadow: [
                            BoxShadow(color: Colors.black.withValues(alpha: 0.02), blurRadius: 4, offset: const Offset(0, 2))
                          ],
                        ),
                        child: const Icon(Icons.arrow_back_ios_new_rounded, size: 18, color: Color(0xFF1A1A1A)),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Text(
                        meta.title,
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF1A1A1A),
                          letterSpacing: -0.5,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        HapticFeedback.lightImpact();
                        context.go('/home');
                      },
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.grey.withValues(alpha: 0.15)),
                          boxShadow: [
                            BoxShadow(color: Colors.black.withValues(alpha: 0.02), blurRadius: 4, offset: const Offset(0, 2))
                          ],
                        ),
                        child: const Icon(Icons.home_rounded, size: 20, color: Color(0xFF1A1A1A)),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            
            Expanded(
              child: CustomScrollView(
                physics: const BouncingScrollPhysics(),
                slivers: [
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 12),
                          // 2. Hero Banner
                          _FadeInSlide(
                            delay: 1,
                            child: Container(
                              width: double.infinity,
                              height: 140,
                              decoration: BoxDecoration(
                                color: meta.bgColor,
                                borderRadius: BorderRadius.circular(28),
                                border: Border.all(color: meta.accentColor.withValues(alpha: 0.1)),
                              ),
                              child: Stack(
                                children: [
                                  Positioned(
                                    right: 8,
                                    bottom: 8,
                                    child: Image.asset(
                                      meta.heroImage,
                                      width: 130,
                                      height: 110,
                                      fit: BoxFit.contain,
                                      alignment: Alignment.bottomRight,
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.all(24.0),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          meta.title,
                                          style: const TextStyle(
                                            fontSize: 22,
                                            fontWeight: FontWeight.w800,
                                            color: Color(0xFF1A1A1A),
                                            letterSpacing: -0.5,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        SizedBox(
                                          width: 180,
                                          child: Text(
                                            meta.description,
                                            style: TextStyle(
                                              fontSize: 13,
                                              fontWeight: FontWeight.w500,
                                              color: Colors.grey[700],
                                              height: 1.3,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          
                          const SizedBox(height: 24),
                          
                          // 3. Search
                          _FadeInSlide(
                            delay: 2,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 16),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: Colors.grey.withValues(alpha: 0.15)),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: 0.02),
                                    blurRadius: 10,
                                    offset: const Offset(0, 4),
                                  )
                                ],
                              ),
                              child: TextField(
                                controller: _searchController,
                                onChanged: (val) {
                                  setState(() {
                                    _searchQuery = val.toLowerCase();
                                  });
                                },
                                decoration: InputDecoration(
                                  icon: const Icon(Icons.search_rounded, color: Colors.grey, size: 22),
                                  hintText: 'Search services...',
                                  hintStyle: TextStyle(color: Colors.grey[400], fontSize: 15, fontWeight: FontWeight.w500),
                                  border: InputBorder.none,
                                ),
                              ),
                            ),
                          ),
                          
                          const SizedBox(height: 32),
                          
                          // 4. Section Title
                          _FadeInSlide(
                            delay: 3,
                            child: Text(
                              'Our ${meta.title.split(' ').last} Services',
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w800,
                                color: Color(0xFF1A1A1A),
                                letterSpacing: -0.3,
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],
                      ),
                    ),
                  ),

                  // 5. Service List
                  servicesAsyncValue.when(
                    data: (backendServices) {
                      // Fallback to hardcoded if backend is completely empty
                      final services = backendServices.isNotEmpty ? backendServices : _getFallbackServices(widget.categoryName);
                      
                      final filtered = services.where((s) => 
                        s.title.toLowerCase().contains(_searchQuery) ||
                        s.description.toLowerCase().contains(_searchQuery)
                      ).toList();

                      if (filtered.isEmpty) {
                        return SliverToBoxAdapter(
                          child: Padding(
                            padding: const EdgeInsets.all(32.0),
                            child: Center(
                              child: Text('No services found matching "$_searchQuery"', style: const TextStyle(color: Colors.grey)),
                            ),
                          ),
                        );
                      }

                      return SliverList(
                        delegate: SliverChildBuilderDelegate(
                          (context, index) {
                            final service = filtered[index];
                            return _FadeInSlide(
                              delay: 4 + index,
                              child: Padding(
                                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                                child: _ServiceCard(
                                  service: service,
                                  meta: meta,
                                ),
                              ),
                            );
                          },
                          childCount: filtered.length,
                        ),
                      );
                    },
                    loading: () => const SliverToBoxAdapter(
                      child: Padding(
                        padding: EdgeInsets.all(32.0),
                        child: Center(child: CircularProgressIndicator(color: Color(0xFFE88A34))),
                      ),
                    ),
                    error: (e, st) => SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.all(32.0),
                        child: Center(child: Text('Error loading services: $e')),
                      ),
                    ),
                  ),
                  
                  const SliverToBoxAdapter(child: SizedBox(height: 120)), // Bottom padding
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// --- Service Card ---
class _ServiceCard extends StatefulWidget {
  final ServiceModel service;
  final CategoryMetadata meta;

  const _ServiceCard({required this.service, required this.meta});

  @override
  State<_ServiceCard> createState() => _ServiceCardState();
}

class _ServiceCardState extends State<_ServiceCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    // Check if the imageUrl is a local asset or network
    final isLocalAsset = widget.service.imageUrl.startsWith('assets/');

    return GestureDetector(
      onTapDown: (_) => setState(() => _isHovered = true),
      onTapUp: (_) => setState(() => _isHovered = false),
      onTapCancel: () => setState(() => _isHovered = false),
      onTap: () {
        HapticFeedback.mediumImpact();
        try {
          context.push('/service/${widget.service.id}', extra: widget.service);
        } catch (e) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Opening details for ${widget.service.title}...')),
          );
        }
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOut,
        transform: Matrix4.identity()..scale(_isHovered ? 0.98 : 1.0),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.withValues(alpha: 0.1)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 10,
              offset: const Offset(0, 4),
            )
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Left side: Image
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  width: 80,
                  height: 80,
                  color: widget.meta.bgColor,
                  child: isLocalAsset 
                    ? Image.asset(widget.service.imageUrl, fit: BoxFit.cover)
                    : Image.network(widget.service.imageUrl, fit: BoxFit.cover, errorBuilder: (_,_,_) => const SizedBox()),
                ),
              ),
              const SizedBox(width: 16),
              
              // Right side: Content
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.service.title,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFF1A1A1A),
                        letterSpacing: -0.2,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      widget.service.description,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: Colors.grey[600],
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Icon(Icons.calendar_today_rounded, size: 14, color: Colors.grey[500]),
                        const SizedBox(width: 4),
                        Text(
                          widget.service.duration,
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.grey[700]),
                        ),
                        const SizedBox(width: 12),
                        Icon(Icons.access_time_rounded, size: 14, color: Colors.grey[500]),
                        const SizedBox(width: 4),
                        Text(
                          '₹${widget.service.price.toInt()}',
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.grey[800]),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              
              // Far Right: Book Button
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: widget.meta.bgColor,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: widget.meta.accentColor.withValues(alpha: 0.3)),
                ),
                child: Text(
                  'Book',
                  style: TextStyle(
                    color: widget.meta.accentColor,
                    fontWeight: FontWeight.w700,
                    fontSize: 13,
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

// --- Animation Helper ---
class _FadeInSlide extends StatelessWidget {
  final Widget child;
  final int delay;

  const _FadeInSlide({required this.child, required this.delay});

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.0, end: 1.0),
      duration: const Duration(milliseconds: 500),
      curve: Interval(delay * 0.05, 1.0, curve: Curves.easeOutCubic),
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
