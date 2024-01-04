import { FirebaseError } from '@firebase/util';

export function convertErrorToMessage(error: unknown) {
  let errorMessage = 'An unknown error occurred.';
  console.error(error);

  // Handle errors thrown by Firebase
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email address is already in use.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Operation not allowed.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No user found with this email address.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Email or password is incorrect.';
        break;
      default:
        errorMessage = 'An unknown error occurred.';
        break;
    }
  }

  return errorMessage;
}
