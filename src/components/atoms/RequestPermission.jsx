import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
import { sendToken, triggerFCM } from '../../apis'

const firebaseConfig = {
  apiKey: 'AIzaSyDGtaTT8T0cE9fYpGjL6AaIjaH8qwd0sRQ',
  authDomain: 'balloon-map-net.firebaseapp.com',
  projectId: 'balloon-map-net',
  storageBucket: 'balloon-map-net.appspot.com',
  messagingSenderId: '643859630215',
  appId: '1:643859630215:web:45a110bbaed86bc1211022',
  measurementId: 'G-3HHX0FPMJR',
}

export default function RequestPermission() {
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const app = initializeApp(firebaseConfig)
        const messaging = getMessaging(app)

        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          const currentToken = await getToken(messaging, {
            vapidKey: 'BL6oABzSftdRmaeSIMegPzCdeEWOPk7D5DPGa8WhKOZWbYmsgem26BWX1gqIWbvsQ64XfIuMSNyYlKXQoK8hfaQ',
          })
          if (currentToken) {
            setToken(currentToken)
            messaging.onMessage((payload) => {
              alert('알림:' + payload.notification.body)
            })
            console.log('Token:', currentToken)
            await sendToken({ token: currentToken }) // 비동기 함수 호출
            await triggerFCM()
          } else {
            console.log('No registration token available.')
          }
        }
      } catch (err) {
        setError(err.message)
        console.log('Error retrieving token:', err)
      }
    }

    requestPermission()
  }, [])

  if (error) return <div>Error: {error}</div>
  if (!token) return <div>Requesting permission...</div>
  return <></>
}
