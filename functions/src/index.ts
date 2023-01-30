import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth.user().onCreate(async (user) => {
  const formatedUser = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    providerData: user.providerData,
  };
  db.collection('users').doc(user.uid).set(formatedUser);
});
