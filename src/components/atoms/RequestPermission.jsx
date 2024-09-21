import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
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
            console.log('Token:', currentToken)
            await sendToken({ token: currentToken })
            // await triggerFCM()

            // 포그라운드 메시지 처리
            onMessage(messaging, (payload) => {
              console.log('포그라운드 메시지 수신:', payload)
              const notificationTitle = payload.notification.title
              const notificationOptions = {
                body: payload.notification.body,
              }
              if (Notification.permission === 'granted') {
                new Notification(notificationTitle, notificationOptions)
              }
            })
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

  // if (error) return <div>Error: {error}</div>
  // if (!token) return <div>Requesting permission...</div>
  return <></>
}
