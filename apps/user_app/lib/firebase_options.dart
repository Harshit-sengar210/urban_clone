import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyAMzd60moavf8faPe6hKsEDHb6Pi3kWzjo',
    appId: '1:569721578340:web:080ceee2c57bda5cd31071',
    messagingSenderId: '569721578340',
    projectId: 'urban-clone-2e47d',
    authDomain: 'urban-clone-2e47d.firebaseapp.com',
    storageBucket: 'urban-clone-2e47d.firebasestorage.app',
    measurementId: 'G-1928QC4JTN',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyAMzd60moavf8faPe6hKsEDHb6Pi3kWzjo',
    appId: '1:569721578340:android:dummy',
    messagingSenderId: '569721578340',
    projectId: 'urban-clone-2e47d',
    storageBucket: 'urban-clone-2e47d.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAMzd60moavf8faPe6hKsEDHb6Pi3kWzjo',
    appId: '1:569721578340:ios:dummy',
    messagingSenderId: '569721578340',
    projectId: 'urban-clone-2e47d',
    storageBucket: 'urban-clone-2e47d.firebasestorage.app',
    iosBundleId: 'com.urbanclone.userapp',
  );
}
