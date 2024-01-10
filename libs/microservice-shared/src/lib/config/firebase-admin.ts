import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { credential } from 'firebase-admin';

initializeApp({
  credential: credential.applicationDefault(),
  projectId: 'mpfg-acua',
});

export const auth = getAuth();
