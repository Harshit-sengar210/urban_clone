import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../app/theme/app_colors.dart';
import '../categories/categories_screen.dart';
import '../bookings/presentation/screens/bookings_screen.dart';
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: IndexedStack(
        index: _currentIndex,
        children: const [
          _HomeContent(),
          BookingsScreen(),
          CategoriesScreen(),
          Center(child: Text('Profile')),
        ],
      ),
      extendBody: true, // For floating bottom nav
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildBottomNav() {
    return Container(
      margin: const EdgeInsets.only(left: 24, right: 24, bottom: 24),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(32),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(0, Icons.home_outlined, Icons.home, 'Home'),
              _buildNavItem(1, Icons.calendar_today_outlined, Icons.calendar_today, 'Bookings'),
              _buildNavItem(2, Icons.grid_view, Icons.grid_view_rounded, 'Categories'),
              _buildNavItem(3, Icons.person_outline, Icons.person, 'Profile'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData outlineIcon, IconData filledIcon, String label) {
    final isSelected = _currentIndex == index;
    return GestureDetector(
      onTap: () => setState(() => _currentIndex = index),
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.primaryLight.withValues(alpha: 0.1) : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          children: [
            Icon(
              isSelected ? filledIcon : outlineIcon,
              color: isSelected ? AppColors.primary : AppColors.textLight,
              size: 24,
            ),
            if (isSelected) ...[
              const SizedBox(width: 8),
              Text(
                label,
                style: const TextStyle(
                  color: AppColors.primary,
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                ),
              ),
            ]
          ],
        ),
      ),
    );
  }
}

class _HomeContent extends StatelessWidget {
  const _HomeContent();

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: SafeArea(
            bottom: false,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildHeader(context),
                  const SizedBox(height: 24),
                  _buildSearch(),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ),
        
        SliverToBoxAdapter(
          child: const HeroCarousel(),
        ),
        
        SliverToBoxAdapter(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 32),
              _buildQuickCategories(context),
              const SizedBox(height: 32),
              _buildPopularServices(context), // Explore Categories grid
              const SizedBox(height: 32),
              _buildActiveBooking(context),
              const SizedBox(height: 32),
              _buildServiceCarousel(context), // Popular services carousel
              const SizedBox(height: 32),
              _buildRecommendedCarousel(context), // Recommended / Book Again
              const SizedBox(height: 32),
              _buildQuickNeeds(context), // What do you need today?
              const SizedBox(height: 32),
              _buildOffers(context), // Offers
              const SizedBox(height: 32),
              _buildTrustSection(context), // Book with confidence
              const SizedBox(height: 32),
              _buildHowItWorks(context), // How it works
              const SizedBox(height: 120), // Bottom padding for floating nav
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.primaryLight.withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.location_on, color: AppColors.primary, size: 20),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text('Home', style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w600, color: AppColors.text)),
                    const SizedBox(width: 4),
                    const Icon(Icons.keyboard_arrow_down, size: 16, color: AppColors.textLight),
                  ],
                ),
                Text('Sector 45, Gurugram', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.textLight)),
              ],
            ),
          ],
        ),
        Container(
          decoration: BoxDecoration(
            color: AppColors.surface,
            shape: BoxShape.circle,
            border: Border.all(color: AppColors.border),
          ),
          child: IconButton(
            icon: const Icon(Icons.notifications_none, color: AppColors.text, size: 22),
            onPressed: () {},
          ),
        ),
      ],
    );
  }

  Widget _buildSearch() {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: TextField(
        decoration: InputDecoration(
          hintText: 'Search for services...',
          hintStyle: const TextStyle(color: AppColors.textLight, fontSize: 15),
          prefixIcon: const Icon(Icons.search, color: AppColors.primary, size: 22),
          suffixIcon: Container(
            margin: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppColors.primaryLight.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(Icons.tune, color: AppColors.primary, size: 18),
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(18),
            borderSide: BorderSide.none,
          ),
          filled: true,
          fillColor: AppColors.surface,
          contentPadding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ),
    );
  }

  Widget _buildQuickCategories(BuildContext context) {
    final categories = ['Cleaning', 'AC', 'Plumbing', 'Electrical', 'Appliances', 'Painting'];
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Text('What do you need today?', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700, fontSize: 19)),
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: 40,
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: categories.length,
            itemBuilder: (context, index) {
              final isSelected = index == 0;
              return GestureDetector(
                onTap: () {
                  context.push('/category/${categories[index]}');
                },
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: isSelected ? AppColors.primary : AppColors.surface,
                    borderRadius: BorderRadius.circular(20),
                    border: isSelected ? null : Border.all(color: AppColors.border),
                  ),
                  child: Text(
                    categories[index],
                    style: TextStyle(
                      color: isSelected ? Colors.white : AppColors.text,
                      fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                      fontSize: 14,
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildPopularServices(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Text('Explore Categories', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700, fontSize: 19)),
        ),
        const SizedBox(height: 16),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: _buildServiceGridItem(context, 'Cleaning', Icons.cleaning_services_outlined, const Color(0xFFE8F5E9), const Color(0xFF2E7D32))),
                  const SizedBox(width: 8),
                  Expanded(child: _buildServiceGridItem(context, 'Plumbing', Icons.plumbing_outlined, const Color(0xFFE3F2FD), const Color(0xFF1565C0))),
                  const SizedBox(width: 8),
                  Expanded(child: _buildServiceGridItem(context, 'Electrical', Icons.lightbulb_outline, const Color(0xFFFFF3E0), const Color(0xFFEF6C00))),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: _buildServiceGridItem(context, 'AC Service', Icons.ac_unit_outlined, const Color(0xFFE1F5FE), const Color(0xFF0277BD))),
                  const SizedBox(width: 8),
                  Expanded(child: _buildServiceGridItem(context, 'Appliance\nRepair', Icons.kitchen_outlined, const Color(0xFFEDE7F6), const Color(0xFF4527A0))),
                  const SizedBox(width: 8),
                  Expanded(child: _buildServiceGridItem(context, 'More', Icons.more_horiz, const Color(0xFFF1F5F9), const Color(0xFF475569))),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildServiceGridItem(BuildContext context, String title, IconData icon, Color bgColor, Color iconColor) {
    return GestureDetector(
      onTap: () {
        final category = title.replaceAll('\n', ' ');
        if (category == 'More') {
          // Do nothing or navigate to categories screen
        } else {
          context.push('/category/$category');
        }
      },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 64,
            height: 64,
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(icon, color: iconColor, size: 32),
          ),
          const SizedBox(height: 8),
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13, color: AppColors.text, height: 1.2),
          ),
        ],
      ),
    );
  }

  Widget _buildActiveBooking(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Your upcoming service', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700, fontSize: 19)),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.border),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.02),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('AC Service', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                        SizedBox(height: 4),
                        Text('Tomorrow · 10:00 AM', style: TextStyle(color: AppColors.textLight, fontSize: 13)),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppColors.background,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.ac_unit, color: AppColors.primary, size: 24),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                const Divider(height: 1, color: AppColors.border),
                const SizedBox(height: 16),
                Row(
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
                        const Text('Professional assigned', style: TextStyle(fontWeight: FontWeight.w500, fontSize: 13)),
                      ],
                    ),
                    Row(
                      children: const [
                        Text('Track service', style: TextStyle(color: AppColors.secondary, fontWeight: FontWeight.w600, fontSize: 13)),
                        SizedBox(width: 4),
                        Icon(Icons.arrow_forward, color: AppColors.secondary, size: 14),
                      ],
                    )
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServiceCarousel(BuildContext context) {
    // Hardcoded placeholder data - ideally from Riverpod/Firestore
    final List<Map<String, dynamic>> services = [
      {
        'name': 'Standard Home Cleaning',
        'image': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
        'rating': '4.8',
        'reviews': '2.3k',
        'price': '₹499',
        'duration': '1 hr',
        'badge': 'Best Seller'
      },
      {
        'name': 'AC Service & Repair',
        'image': 'https://images.unsplash.com/photo-1617260551061-9f20e4010260?q=80&w=800&auto=format&fit=crop',
        'rating': '4.7',
        'reviews': '1.8k',
        'price': '₹399',
        'duration': '45 mins',
        'badge': 'Popular'
      },
      {
        'name': 'Electrician Visit',
        'image': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
        'rating': '4.9',
        'reviews': '5.1k',
        'price': '₹199',
        'duration': '30 mins',
        'badge': ''
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Popular services', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700, fontSize: 19)),
              Row(
                children: const [
                  Text('See all', style: TextStyle(color: AppColors.secondary, fontWeight: FontWeight.w600, fontSize: 14)),
                  SizedBox(width: 2),
                  Icon(Icons.arrow_forward, size: 14, color: AppColors.secondary),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: 280,
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: services.length,
            itemBuilder: (context, index) {
              final service = services[index];
              return _buildRichServiceCard(context, service);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildRichServiceCard(BuildContext context, Map<String, dynamic> data) {
    return Container(
      width: 210,
      margin: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image Area
            SizedBox(
              height: 140,
              width: double.infinity,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Image.network(
                    data['image']!,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        color: AppColors.surface,
                        child: const Center(
                          child: Icon(Icons.image_not_supported_outlined, color: AppColors.textLight, size: 32),
                        ),
                      );
                    },
                  ),
                  if (data['badge'] != null && data['badge'].toString().isNotEmpty)
                    Positioned(
                      top: 12,
                      left: 12,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.surface,
                          borderRadius: BorderRadius.circular(8),
                          boxShadow: [
                            BoxShadow(color: Colors.black.withValues(alpha: 0.1), blurRadius: 4, offset: const Offset(0, 2)),
                          ],
                        ),
                        child: Text(
                          data['badge']!,
                          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.primary),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            
            // Content Area
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          data['name']!,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15, color: AppColors.text, height: 1.2),
                        ),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            const Icon(Icons.star, color: Colors.amber, size: 14),
                            const SizedBox(width: 4),
                            Text(
                              '${data['rating']} (${data['reviews']})',
                              style: const TextStyle(fontSize: 12, color: AppColors.textLight, fontWeight: FontWeight.w500),
                            ),
                          ],
                        ),
                      ],
                    ),
                    
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('From ${data['price']}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: AppColors.primary)),
                            const SizedBox(height: 2),
                            Text(data['duration']!, style: const TextStyle(color: AppColors.textLight, fontSize: 12)),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(
                            color: AppColors.primaryLight.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Text('Book', style: TextStyle(color: AppColors.primary, fontSize: 12, fontWeight: FontWeight.bold)),
                        )
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecommendedCarousel(BuildContext context) {
    // Hardcoded placeholder data - ideally from Riverpod/Firestore
    final List<Map<String, dynamic>> recommendations = [
      {
        'name': 'Home Cleaning',
        'image': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
        'lastBooked': '12 Sep',
        'price': '₹499',
      },
      {
        'name': 'Plumbing Repair',
        'image': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop',
        'lastBooked': '2 Aug',
        'price': '₹199',
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Book again', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700, fontSize: 19)),
              Row(
                children: const [
                  Text('See all', style: TextStyle(color: AppColors.secondary, fontWeight: FontWeight.w600, fontSize: 14)),
                  SizedBox(width: 2),
                  Icon(Icons.arrow_forward, size: 14, color: AppColors.secondary),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: 220,
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: recommendations.length,
            itemBuilder: (context, index) {
              final item = recommendations[index];
              return Container(
                width: 180,
                margin: const EdgeInsets.symmetric(horizontal: 8),
                decoration: BoxDecoration(
                  color: AppColors.primaryLight.withValues(alpha: 0.03),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        height: 100,
                        width: double.infinity,
                        child: Image.network(
                          item['image']!,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) => Container(color: AppColors.surface, child: const Icon(Icons.image, color: AppColors.textLight)),
                        ),
                      ),
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    item['name']!,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: AppColors.text),
                                  ),
                                  const SizedBox(height: 4),
                                  Text('Last booked\n${item['lastBooked']}', style: const TextStyle(fontSize: 11, color: AppColors.textLight, height: 1.2)),
                                ],
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text('From ${item['price']}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.text)),
                                  const Row(
                                    children: [
                                      Text('Book', style: TextStyle(color: AppColors.secondary, fontSize: 12, fontWeight: FontWeight.bold)),
                                      Icon(Icons.arrow_forward, color: AppColors.secondary, size: 12),
                                    ],
                                  )
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildQuickNeeds(BuildContext context) {
    final needs = ['Cleaning', 'AC', 'Plumbing', 'Electrical', 'Appliance', 'Painting'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Text('What do you need today?', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700, fontSize: 17)),
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: 40,
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: needs.length,
            itemBuilder: (context, index) {
              return Container(
                margin: const EdgeInsets.symmetric(horizontal: 6),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 0),
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.border),
                ),
                child: Text(
                  needs[index],
                  style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.text),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildOffers(BuildContext context) {
    final List<Map<String, dynamic>> offers = [
      {
        'title': '20% OFF',
        'desc': 'Your next home service',
        'sub': 'Limited-time offer',
        'color': const Color(0xFFFFF3E0),
      },
      {
        'title': '₹150 Cashback',
        'desc': 'On AC service & repair',
        'sub': 'Valid till Sunday',
        'color': const Color(0xFFE8F5E9),
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Text('Offers for you', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700, fontSize: 19)),
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: 130,
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: offers.length,
            itemBuilder: (context, index) {
              final offer = offers[index];
              return Container(
                width: 240,
                margin: const EdgeInsets.symmetric(horizontal: 8),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: offer['color'],
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.black.withValues(alpha: 0.05)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.local_offer, size: 16, color: AppColors.text),
                        const SizedBox(width: 8),
                        Text(offer['title'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.text)),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(offer['desc'], style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 14, color: AppColors.text)),
                        const SizedBox(height: 2),
                        Text(offer['sub'], style: const TextStyle(fontSize: 12, color: AppColors.textLight)),
                      ],
                    ),
                    const Row(
                      children: [
                        Text('View offer', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppColors.text)),
                        SizedBox(width: 4),
                        Icon(Icons.arrow_forward, size: 12, color: AppColors.text),
                      ],
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildTrustSection(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Book with confidence', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700, fontSize: 17)),
          const SizedBox(height: 20),
          _buildTrustRow(Icons.verified_user_outlined, 'Verified Professionals', 'Screened & trained experts'),
          const SizedBox(height: 16),
          _buildTrustRow(Icons.receipt_long_outlined, 'Transparent Pricing', 'No hidden surprises'),
          const SizedBox(height: 16),
          _buildTrustRow(Icons.shield_outlined, 'Secure Payments', 'Protected checkout'),
        ],
      ),
    );
  }

  Widget _buildTrustRow(IconData icon, String title, String subtitle) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: AppColors.primaryLight.withValues(alpha: 0.1),
            shape: BoxShape.circle,
          ),
          child: Icon(icon, color: AppColors.primary, size: 20),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: AppColors.text)),
              const SizedBox(height: 2),
              Text(subtitle, style: const TextStyle(fontSize: 12, color: AppColors.textLight)),
            ],
          ),
        )
      ],
    );
  }

  Widget _buildHowItWorks(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('How it works', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700, fontSize: 17)),
          const SizedBox(height: 20),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildStepItem('01', 'Choose\nservice'),
              Expanded(child: Container(margin: const EdgeInsets.only(top: 16), height: 1, color: AppColors.border)),
              _buildStepItem('02', 'Pick\ntime'),
              Expanded(child: Container(margin: const EdgeInsets.only(top: 16), height: 1, color: AppColors.border)),
              _buildStepItem('03', 'Get it\ndone'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStepItem(String number, String text) {
    return Column(
      children: [
        Container(
          width: 32,
          height: 32,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: AppColors.surface,
            shape: BoxShape.circle,
            border: Border.all(color: AppColors.primaryLight),
          ),
          child: Text(number, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppColors.primary)),
        ),
        const SizedBox(height: 8),
        Text(text, textAlign: TextAlign.center, style: const TextStyle(fontSize: 12, color: AppColors.textLight, height: 1.2, fontWeight: FontWeight.w500)),
      ],
    );
  }
}

class HeroCarousel extends StatefulWidget {
  const HeroCarousel({super.key});

  @override
  State<HeroCarousel> createState() => _HeroCarouselState();
}

class _HeroCarouselState extends State<HeroCarousel> {
  late PageController _pageController;
  int _currentPage = 0;

  final List<Map<String, String>> _heroData = [
    {
      'title': 'Your home,\ntaken care of.',
      'image': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop',
    },
    {
      'title': 'Fresh home.\nFresh start.',
      'image': 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop',
    },
    {
      'title': 'Stay cool,\nall day.',
      'image': 'https://images.unsplash.com/photo-1617260551061-9f20e4010260?q=80&w=1000&auto=format&fit=crop',
    },
    {
      'title': 'Safe power.\nReliable service.',
      'image': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop',
    }
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: 0);
    _startAutoScroll();
  }

  void _startAutoScroll() {
    Future.delayed(const Duration(seconds: 4), () {
      if (mounted) {
        final nextPage = (_currentPage + 1) % _heroData.length;
        _pageController.animateToPage(
          nextPage,
          duration: const Duration(milliseconds: 800),
          curve: Curves.fastOutSlowIn,
        );
        _startAutoScroll();
      }
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 200,
          child: PageView.builder(
            controller: _pageController,
            onPageChanged: (index) {
              setState(() {
                _currentPage = index;
              });
            },
            itemCount: _heroData.length,
            itemBuilder: (context, index) {
              final data = _heroData[index];
              return Container(
                margin: const EdgeInsets.symmetric(horizontal: 20),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(24),
                  color: AppColors.primary,
                  image: DecorationImage(
                    image: NetworkImage(data['image']!),
                    fit: BoxFit.cover,
                    colorFilter: const ColorFilter.mode(Colors.black38, BlendMode.darken),
                  ),
                ),
                child: Stack(
                  children: [
                    Positioned(
                      top: 20,
                      left: 20,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: Colors.white.withValues(alpha: 0.3)),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: const [
                            Icon(Icons.verified, color: Colors.white, size: 14),
                            SizedBox(width: 4),
                            Text('Verified professionals', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600)),
                          ],
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 24,
                      left: 20,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            data['title']!,
                            style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold, height: 1.2),
                          ),
                          const SizedBox(height: 12),
                          Row(
                            children: const [
                              Text('Explore services', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w600)),
                              SizedBox(width: 4),
                              Icon(Icons.arrow_forward, color: Colors.white, size: 16),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            _heroData.length,
            (index) => AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              margin: const EdgeInsets.symmetric(horizontal: 4),
              width: _currentPage == index ? 24 : 8,
              height: 8,
              decoration: BoxDecoration(
                color: _currentPage == index ? AppColors.primary : AppColors.border,
                borderRadius: BorderRadius.circular(4),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
