import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { credential } from 'firebase-admin';

if (process.env['NODE_ENV'] !== 'production')
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';

console.log('Initializing Firebase Admin SDK');
console.log(process.env['FIREBASE_AUTH_EMULATOR_HOST']);
initializeApp({
  credential: credential.applicationDefault(),
  projectId: 'mpfg-acua',
});

export const auth = getAuth();
