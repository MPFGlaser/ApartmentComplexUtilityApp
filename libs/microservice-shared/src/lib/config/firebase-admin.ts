import { ServiceAccount, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { credential } from 'firebase-admin';

let serviceAccount = process.env['FIREBASE_CONFIG'];

if (!serviceAccount) {
  throw new Error('FIREBASE_CONFIG not set');
}

// remove trailing newline, if any
serviceAccount = serviceAccount.replace(/\n$/, '');

initializeApp({
  credential: credential.cert(JSON.parse(serviceAccount) as ServiceAccount),
});

export const auth = getAuth();
