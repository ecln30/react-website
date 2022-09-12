// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA8ysdVrEYvC_aYrNYCqOWGU7IMnM6W1hQ",
  authDomain: "practice-make-app.firebaseapp.com",
  projectId: "practice-make-app",
  storageBucket: "practice-make-app.appspot.com",
  messagingSenderId: "453076458944",
  appId: "1:453076458944:web:57e067343009a0d180bc25"
};

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  googleProvider.setCustomParameters({prompt: "select_account"})
   await signInWithPopup(auth, googleProvider)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)

