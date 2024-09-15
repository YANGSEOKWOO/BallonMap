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

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

export default function RequestPermission() {
  // Initialize Firebase
  // Firebase 초기화
  const app = initializeApp(firebaseConfig)
  const messaging = getMessaging(app)

  console.log('Requesting permission...')
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.')
      getToken(messaging, { vapidKey: 'BL6oABzSftdRmaeSIMegPzCdeEWOPk7D5DPGa8WhKOZWbYmsgem26BWX1gqIWbvsQ64XfIuMSNyYlKXQoK8hfaQ' })
        .then((currentToken) => {
          if (currentToken) {
            console.log('currentToken:', currentToken)
            // Send the token to your server and update the UI if necessary
            // ...
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.')
            // ...
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err)
          // ...
        })
    }
  })
}
