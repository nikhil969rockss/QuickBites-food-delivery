// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'quickbites-c500f.firebaseapp.com',
  projectId: 'quickbites-c500f',
  storageBucket: 'quickbites-c500f.firebasestorage.app',
  messagingSenderId: '1051331596121',
  appId: '1:1051331596121:web:8ac31140f6ec0600490648',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
