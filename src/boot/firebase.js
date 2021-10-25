import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

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

initializeApp(firebaseConfig)
const db = getFirestore()

export default db
