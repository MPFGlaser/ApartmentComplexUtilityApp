import { ServiceAccount, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { credential } from 'firebase-admin';

const serviceAccount = process.env['FIREBASE_CONFIG'];

if (!serviceAccount) {
  throw new Error('FIREBASE_CONFIG not set');
}

initializeApp({
  credential: credential.cert(JSON.parse(serviceAccount) as ServiceAccount),
});

export const auth = getAuth();
