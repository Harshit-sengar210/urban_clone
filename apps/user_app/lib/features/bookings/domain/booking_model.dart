enum BookingStatus {
  pendingAssignment,
  assigned,
  accepted,
  confirmed,
  serviceStarted,
  completed,
  cancelled,
  rejected,
  noShow
}

enum PaymentStatus {
  pending,
  paid,
  failed,
  refunded
}

class BookingModel {
  final String id;
  final String serviceName;
  final String? packageName;
  final String imageUrl;
  final DateTime scheduledDate;
  final String address;
  final String? professionalName;
  final String? professionalAvatar;
  final double? professionalRating;
  final double amount;
  final BookingStatus status;
  final PaymentStatus paymentStatus;
  final String? cancellationReason;
  final double? userRating;

  BookingModel({
    required this.id,
    required this.serviceName,
    this.packageName,
    required this.imageUrl,
    required this.scheduledDate,
    required this.address,
    this.professionalName,
    this.professionalAvatar,
    this.professionalRating,
    required this.amount,
    required this.status,
    required this.paymentStatus,
    this.cancellationReason,
    this.userRating,
  });
}
