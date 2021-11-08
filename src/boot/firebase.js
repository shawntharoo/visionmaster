import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from '@firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC5hl5eS7HN_wf4H2o5hIpeRQJlseMalMA',
  authDomain: 'vision-e90f5.firebaseapp.com',
  projectId: 'vision-e90f5',
  storageBucket: 'vision-e90f5.appspot.com',
  messagingSenderId: '173301167099',
  appId: '1:173301167099:web:d50dd6344810e26878d15e',
  measurementId: 'G-9QHHMVC91D'
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage(firebaseApp)
const firebaseAuth = getAuth()

export default { db, firebaseAuth, storage }
