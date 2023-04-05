import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
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

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

//setting up the popup sign in method
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

//creating the database
export const db = getFirestore()

//create users collection
export const createUserDocumentFromAuth = async (userAuth, additionalInformation= {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef
}


//email password inti

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}