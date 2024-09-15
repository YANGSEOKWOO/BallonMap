// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDGtaTT8T0cE9fYpGjL6AaIjaH8qwd0sRQ',
  authDomain: 'balloon-map-net.firebaseapp.com',
  projectId: 'balloon-map-net',
  storageBucket: 'balloon-map-net.appspot.com',
  messagingSenderId: '643859630215',
  appId: '1:643859630215:web:45a110bbaed86bc1211022',
  measurementId: 'G-3HHX0FPMJR',
}

// Initialize Firebase
// Firebase 초기화
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export { messaging }
