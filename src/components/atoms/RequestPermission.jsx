import { getMessaging, getToken } from 'firebase/messaging'
import { messaging } from '../../firebase'

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

export default function RequestPermission() {
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
