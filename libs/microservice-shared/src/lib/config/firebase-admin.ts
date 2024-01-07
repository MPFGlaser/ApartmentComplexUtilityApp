import { ServiceAccount, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { credential } from 'firebase-admin';

let serviceAccount: string | undefined;

if (process.env['NODE_ENV'] === 'development') {
  serviceAccount = process.env['FIREBASE_CONFIG'];

  if (!serviceAccount) {
    throw new Error('FIREBASE_CONFIG not set');
  }

  // remove trailing newline, if any
  serviceAccount = serviceAccount.replace(/\n$/, '');
}

initializeApp({
  credential: serviceAccount
    ? credential.cert(JSON.parse(serviceAccount) as ServiceAccount)
    : credential.applicationDefault(),
});

export const auth = getAuth();
