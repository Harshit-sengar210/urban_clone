import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';

class CategoriesScreen extends StatelessWidget {
  const CategoriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Row(
              children: [
                const Icon(Icons.arrow_back_ios, size: 20, color: AppColors.primary),
                const SizedBox(width: 16),
                Text(
                  'All Categories',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
              ],
            ),
          ),
          
          // Search Bar
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.border.withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(16),
              ),
              child: TextField(
                decoration: InputDecoration(
                  hintText: 'Search services...',
                  hintStyle: const TextStyle(color: AppColors.textLight, fontSize: 15),
                  prefixIcon: const Icon(Icons.search, color: AppColors.textLight, size: 22),
                  border: InputBorder.none,
                  enabledBorder: InputBorder.none,
                  focusedBorder: InputBorder.none,
                  filled: false,
                  contentPadding: const EdgeInsets.symmetric(vertical: 14),
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),

          // Categories List
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              children: [
                _buildCategoryItem('Home Cleaning', 'Keep your home fresh & clean', Icons.cleaning_services_outlined, const Color(0xFFFFF3E0), const Color(0xFFEF6C00)),
                _buildCategoryItem('Plumbing', 'Fix leaks & water issues', Icons.plumbing_outlined, const Color(0xFFFFEBEE), const Color(0xFFC62828)),
                _buildCategoryItem('Electrical', 'Safe & reliable electrical work', Icons.lightbulb_outline, const Color(0xFFEDE7F6), const Color(0xFF4527A0)),
                _buildCategoryItem('AC Service', 'Cool comfort all year round', Icons.ac_unit_outlined, const Color(0xFFE1F5FE), const Color(0xFF0277BD)),
                _buildCategoryItem('Appliance Repair', 'Get your appliances working', Icons.kitchen_outlined, const Color(0xFFFFF3E0), const Color(0xFFEF6C00)),
                _buildCategoryItem('Painting', 'Fresh look for your space', Icons.format_paint_outlined, const Color(0xFFE8F5E9), const Color(0xFF2E7D32)),
                _buildCategoryItem('Pest Control', 'A healthier home', Icons.pest_control_outlined, const Color(0xFFFFEBEE), const Color(0xFFC62828)),
                const SizedBox(height: 100), // Bottom padding for nav bar
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryItem(String title, String subtitle, IconData icon, Color bgColor, Color iconColor) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.01),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(icon, color: iconColor, size: 28),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.primary),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 13, color: AppColors.textLight),
                ),
              ],
            ),
          ),
          const Icon(Icons.chevron_right, color: AppColors.textLight),
        ],
      ),
    );
  }
}
