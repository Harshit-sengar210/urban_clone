import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../app/theme/app_colors.dart';
import '../../domain/service_model.dart';
import '../../data/service_repository.dart';

class CategoryServicesScreen extends ConsumerStatefulWidget {
  final String categoryName;

  const CategoryServicesScreen({super.key, required this.categoryName});

  @override
  ConsumerState<CategoryServicesScreen> createState() => _CategoryServicesScreenState();
}

class _CategoryServicesScreenState extends ConsumerState<CategoryServicesScreen> {
  String _selectedSubcategory = 'All';

  @override
  Widget build(BuildContext context) {
    // The provider takes categoryId. We are assuming categoryName in lowercase is categoryId.
    final categoryId = widget.categoryName.toLowerCase();
    final servicesAsyncValue = ref.watch(categoryServicesProvider(categoryId));

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: AppColors.text, size: 20),
          onPressed: () => context.pop(),
        ),
        title: Text(
          widget.categoryName.endsWith('Services') ? widget.categoryName : '${widget.categoryName} Services',
          style: const TextStyle(
            color: AppColors.text,
            fontWeight: FontWeight.bold,
            fontSize: 18,
          ),
        ),
        centerTitle: true,
      ),
      body: servicesAsyncValue.when(
        data: (allServices) {
          if (allServices.isEmpty) {
            return const Center(child: Text('No services found.'));
          }

          // Extract unique subcategories
          final subcategoriesSet = {'All'};
          for (var service in allServices) {
            // Use the title as the chip name if the subcategory is missing or too long
            final chipName = (service.subcategory.isNotEmpty && service.subcategory.length < 25) 
                ? service.subcategory 
                : service.title;
            subcategoriesSet.add(chipName);
          }
          final subcategories = subcategoriesSet.toList();

          final filteredServices = _selectedSubcategory == 'All'
              ? allServices
              : allServices.where((s) => s.subcategory == _selectedSubcategory || s.title == _selectedSubcategory).toList();

          return Column(
            children: [
              // Subcategories
              SizedBox(
                height: 50,
                child: ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  scrollDirection: Axis.horizontal,
                  itemCount: subcategories.length,
                  itemBuilder: (context, index) {
                    final sub = subcategories[index];
                    final isSelected = _selectedSubcategory == sub;
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          _selectedSubcategory = sub;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 8),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: isSelected ? AppColors.primary : AppColors.surface,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: isSelected ? AppColors.primary : AppColors.border,
                          ),
                        ),
                        child: Center(
                          child: Text(
                            sub,
                            style: TextStyle(
                              color: isSelected ? Colors.white : AppColors.textLight,
                              fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),

              // Service List
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: filteredServices.length,
                  itemBuilder: (context, index) {
                    final service = filteredServices[index];
                    return _buildServiceCard(service);
                  },
                ),
              ),
            ],
          );
        },
        loading: () => const Center(child: CircularProgressIndicator(color: AppColors.primary)),
        error: (error, stack) => Center(child: Text('Error: $error')),
      ),
    );
  }

  Widget _buildServiceCard(ServiceModel service) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(16),
              bottomLeft: Radius.circular(16),
            ),
            child: Image.network(
              service.imageUrl,
              width: 100,
              height: 120,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) => Container(
                width: 100,
                height: 120,
                color: AppColors.background,
                child: const Icon(Icons.image_not_supported, color: AppColors.textLight),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    // If the title is really long and looks like a description, use subcategory if it exists
                    (service.title.length > 30 && service.subcategory != 'All' && service.subcategory.isNotEmpty) 
                        ? service.subcategory 
                        : (service.title.isNotEmpty ? service.title : service.subcategory),
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                      color: AppColors.text,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Text(
                        '₹${service.price.toInt()}',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                          color: AppColors.text,
                        ),
                      ),
                      const Text(
                        ' • ',
                        style: TextStyle(color: AppColors.textLight),
                      ),
                      Text(
                        service.duration,
                        style: const TextStyle(
                          fontSize: 13,
                          color: AppColors.textLight,
                        ),
                      ),
                      const Text(
                        ' • ',
                        style: TextStyle(color: AppColors.textLight),
                      ),
                      const Icon(Icons.star, color: AppColors.primary, size: 14),
                      const SizedBox(width: 2),
                      Text(
                        '${service.rating} (${service.reviews})',
                        style: const TextStyle(
                          fontSize: 13,
                          color: AppColors.textLight,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16),
            child: Icon(Icons.chevron_right, color: AppColors.textLight),
          ),
        ],
      ),
    );
  }
}
