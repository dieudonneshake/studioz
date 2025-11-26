'use server';

import { initializeApp, getApps, getApp, App, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export async function initializeFirebase() {
  const apps = getApps();
  let firebaseApp: App;

  if (!apps.length) {
    const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (serviceAccountStr) {
      const serviceAccount: ServiceAccount = JSON.parse(serviceAccountStr);
      firebaseApp = initializeApp({
          credential: cert(serviceAccount),
      });
    } else {
      console.log("No FIREBASE_SERVICE_ACCOUNT found, attempting to initialize with default credentials.");
      initializeApp();
      firebaseApp = getApp();
    }
  } else {
    firebaseApp = getApp();
  }

  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}
