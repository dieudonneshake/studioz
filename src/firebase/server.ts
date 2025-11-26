// IMPORTANT: This file is used for SERVER-SIDE Firebase initialization.
// It uses the Admin SDK and should only be imported in server-only environments
// like Server Components, API routes, or `getStaticProps/getServerSideProps`.
'use server';

import { initializeApp, getApps, getApp, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

// The service account key is securely stored as an environment variable.
// In a production environment (like Firebase App Hosting or Google Cloud Run),
// the Admin SDK can often auto-initialize without a service account key file.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export async function initializeFirebase() {
  const apps = getApps();
  let firebaseApp: App;

  if (!apps.length) {
    firebaseApp = initializeApp({
      credential: serviceAccount ? require('firebase-admin').credential.cert(serviceAccount) : undefined,
      // If no service account, SDK tries to find credentials from the environment.
      // The databaseURL is still useful for the SDK to know where to connect.
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
    });
  } else {
    firebaseApp = getApp();
  }

  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}
