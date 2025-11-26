// IMPORTANT: This file is used for SERVER-SIDE Firebase initialization.
// It uses the Admin SDK and should only be imported in server-only environments
// like Server Components, API routes, or `getStaticProps/getServerSideProps`.
'use server';

import { initializeApp, getApps, getApp, App, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export async function initializeFirebase() {
  const apps = getApps();
  let firebaseApp: App;

  if (!apps.length) {
    const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (serviceAccountStr) {
        const serviceAccount: ServiceAccount = JSON.parse(serviceAccountStr);
        firebaseApp = initializeApp({
            credential: cert(serviceAccount),
            databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
        });
    } else {
        // In a managed environment like App Hosting, the SDK will discover credentials automatically.
        firebaseApp = initializeApp({
            databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
        });
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
