import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1cDzUe06qx1vit9boyWnJXlY9-txLFrg',
  authDomain: 'crown-clothing-db-ceae3.firebaseapp.com',
  projectId: 'crown-clothing-db-ceae3',
  storageBucket: 'crown-clothing-db-ceae3.appspot.com',
  messagingSenderId: '1017568254830',
  appId: '1:1017568254830:web:7c70ed9719604b36c2bf7f',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
 prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
 const userDocRef = doc(db, 'users', userAuth.uid)
 console.log(userDocRef);

 const userSnapshot = await getDoc(userDocRef)
 console.log(userSnapshot);
}
