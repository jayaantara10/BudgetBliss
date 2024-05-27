import auth from '@react-native-firebase/auth';
import {ResultCallback} from '../../core/callback/ResultCallback';

// Make services for user
export const UserServices = () => {
  // Sign in
  const signUp = async (
    nickname: string,
    email: string,
    password: string,
    {onSuccess, onLoading, onError}: ResultCallback<void>,
  ) => {
    try {
      onLoading();
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await userCredential.user.updateProfile({
        displayName: nickname,
      });
      onSuccess();
    } catch (error: any) {
      console.log('SignUp Error: ', error.code);
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          onError(
            'Email already in use. Please sign in or use a different email.',
          );
          break;
        case 'auth/invalid-email':
          onError('Invalid email address. Please try again.');
          break;
        case 'auth/weak-password':
          onError('Weak password. Please use a stronger password.');
          break;
        default:
          onError('Sign-up error. Please try again later.');
      }
    }
  };

  // Sign up
  const signIn = async (
    email: string,
    password: string,
    {onSuccess, onLoading, onError}: ResultCallback<void>,
  ) => {
    try {
      onLoading();
      await auth().signInWithEmailAndPassword(email, password);
      onSuccess();
    } catch (error: any) {
      const errorCode = error.code;
      console.log('SignIn Error: ', error.code);
      switch (errorCode) {
        case 'auth/invalid-credential':
          onError('Invalid email or password. Please try again.');
          break;
        case 'auth/user-disabled':
          onError('Your account has been disabled. Please contact support.');
          break;
        case 'auth/user-not-found':
          onError('User not found. Please try a different email or password.');
          break;
        case 'auth/wrong-password':
          onError('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
          onError('Too many failed sign-in attempts. Please try again later.');
          break;
        case 'auth/network-request-failed':
          onError('Unable to connect to the network. Please try again.');
          break;
        case 'auth/operation-not-allowed':
          onError('This operation is not allowed. Please contact support.');
          break;
        case 'auth/weak-password':
          onError('Weak password. Please use a stronger password.');
          break;
        default:
          onError('Sign-in error. Please try again later.');
      }
    }
  };

  // Sign Out
  const signOut = async ({
    onSuccess,
    onLoading,
    onError,
  }: ResultCallback<void>) => {
    try {
      onLoading();
      await auth().signOut();
      onSuccess();
    } catch (error: any) {
      console.log('SignOut Error: ', error);
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/user-token-expired':
          onError('Session has expired. Please log in again to continue.');
          break;
        case 'auth/user-mismatch':
          onError(
            'Current user does not match. Please log in with the correct user.',
          );
          break;
        case 'auth/network-request-failed':
          onError('Unable to connect to the network. Please try again.');
          break;
        case 'auth/too-many-requests':
          onError('Too many requests. Please try again later.');
          break;
        case 'auth/invalid-user-token':
          onError('Invalid session token. Please log in again to continue.');
          break;
        case 'auth/requires-recent-login':
          onError('Authentication required. Please log in again to continue.');
          break;
        case 'auth/user-not-found':
          onError('User not found. Please log in again to continue.');
          break;
        default:
          onError('Logout error. Please try again later.');
      }
    }
  };

  // changeName
  const changeName = async (
    nickname: string,
    {onSuccess, onLoading, onError}: ResultCallback<void>,
  ) => {
    try {
      onLoading();
      await auth().currentUser?.updateProfile({displayName: nickname});
      onSuccess();
    } catch (error: any) {
      console.log('Change name Error: ', error.code);
      onError('Somthing wrong Please check data and internet');
    }
  };

  // delete account
  const deleteAccount = async ({
    onSuccess,
    onLoading,
    onError,
  }: ResultCallback<void>) => {
    try {
      onLoading();
      await auth().currentUser?.delete();
      onSuccess();
    } catch (error: any) {
      console.log('Delete Error: ', error.code);
      onError('Somthing wrong Please check data and internet');
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    changeName,
    deleteAccount,
  };
};
