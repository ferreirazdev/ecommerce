
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyCSTfG4400OoQxqWzEm4JhEAR_bbPoLp3o",
  authDomain: "ecommerce-db-626f1.firebaseapp.com",
  projectId: "ecommerce-db-626f1",
  storageBucket: "ecommerce-db-626f1.appspot.com",
  messagingSenderId: "734674538990",
  appId: "1:734674538990:web:33cc2e69b5ed519d84beff",
  measurementId: "G-9KD5PY5YD1"
}


firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date();
    
      try {
        await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
          
    return userRef;
  }
};


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;