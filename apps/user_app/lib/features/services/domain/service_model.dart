class ServiceModel {
  final String id;
  final String categoryId; // To filter by parent category
  final String subcategory; // E.g., 'Home Cleaning', 'Deep Cleaning'
  final String title;
  final String description;
  final double price;
  final String duration;
  final double rating;
  final int reviews;
  final String imageUrl;

  ServiceModel({
    required this.id,
    required this.categoryId,
    required this.subcategory,
    required this.title,
    required this.description,
    required this.price,
    required this.duration,
    required this.rating,
    required this.reviews,
    required this.imageUrl,
  });

  factory ServiceModel.fromMap(Map<String, dynamic> map, String id) {
    return ServiceModel(
      id: id,
      categoryId: map['categoryId']?.toString() ?? '',
      subcategory: (map['subcategory'] != null && map['subcategory'].toString().isNotEmpty) ? map['subcategory'].toString() : (map['title']?.toString() ?? map['name']?.toString() ?? 'All'),
      title: map['title']?.toString() ?? map['name']?.toString() ?? 'Service Name',
      description: map['description']?.toString() ?? '',
      price: _parseDouble(map['price']),
      duration: map['duration']?.toString() ?? '',
      rating: _parseDouble(map['rating']),
      reviews: _parseInt(map['reviews']),
      imageUrl: map['imageUrl']?.toString() ?? 'https://via.placeholder.com/150',
    );
  }

  static double _parseDouble(dynamic value) {
    if (value is num) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? 0.0;
    return 0.0;
  }

  static int _parseInt(dynamic value) {
    if (value is num) return value.toInt();
    if (value is String) return int.tryParse(value) ?? 0;
    if (value is List) return value.length;
    return 0;
  }
}
