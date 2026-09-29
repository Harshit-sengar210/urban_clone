import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/service_model.dart';

class ServiceRepository {
  final FirebaseFirestore _firestore;

  ServiceRepository(this._firestore);

  Stream<List<ServiceModel>> watchServicesByCategory(String categoryId) {
    // We assume the categoryId matches the categoryName passed in, in lowercase for simplicity.
    // e.g. "Cleaning" -> "cleaning"
    // Or we just query by categoryId field.
    return _firestore
        .collection('services')
        .where('categoryId', isEqualTo: categoryId.toLowerCase())
        .snapshots()
        .map((snapshot) {
      return snapshot.docs
          .map((doc) => ServiceModel.fromMap(doc.data(), doc.id))
          .toList();
    });
  }
}

final serviceRepositoryProvider = Provider<ServiceRepository>((ref) {
  return ServiceRepository(FirebaseFirestore.instance);
});

final categoryServicesProvider = StreamProvider.family<List<ServiceModel>, String>((ref, categoryId) {
  final repository = ref.watch(serviceRepositoryProvider);
  return repository.watchServicesByCategory(categoryId);
});
