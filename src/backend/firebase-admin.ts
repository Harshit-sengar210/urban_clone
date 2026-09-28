import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (getApps().length === 0) {
  // Try to initialize from environment variables if present (for production/serverless)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      initializeApp({
        credential: cert(serviceAccount)
      });
    } catch (error) {
      console.error('Firebase admin initialization error', error);
      // Fallback
      initializeApp();
    }
  } else {
    // Fallback: This will attempt to use default credentials (like when running on GCP or with GOOGLE_APPLICATION_CREDENTIALS set)
    initializeApp();
  }
}

const adminDb = getFirestore();
const adminAuth = getAuth();

export { adminDb, adminAuth };
