import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBKDsHViuEDfNl-vRL6E_7KLQKn-_mGCF4",
    authDomain: "clothes-store-db-c1f93.firebaseapp.com",
    projectId: "clothes-store-db-c1f93",
    storageBucket: "clothes-store-db-c1f93.appspot.com",
    messagingSenderId: "333604842226",
    appId: "1:333604842226:web:64564434edec50369efe6b"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date()
      try {
        await userRef.set({
          displayName,
          email,
          createdAt, 
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;