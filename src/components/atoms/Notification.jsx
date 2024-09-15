import React, { useEffect, useState } from 'react'
import { messaging } from '../../firebase' // firebase 경로 수정
import { getToken, onMessage } from 'firebase/messaging'

const Notification = () => {
  const [token, setToken] = useState(null)

  // 권한 요청 및 토큰 생성
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const currentToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_PUBLIC_KEY })
        if (currentToken) {
          console.log('Token generated:', currentToken)
          setToken(currentToken)
          // 토큰을 서버로 전송
          await fetch('/save-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: currentToken }),
          })
        } else {
          console.log('No registration token available.')
        }
      } catch (err) {
        console.error('Error getting token:', err)
      }
    }

    requestPermission()
  }, [])

  // 실시간 메시지 수신
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received: ', payload)
      // 여기에서 알림을 표시하거나 사용자 인터페이스를 업데이트하는 로직을 추가할 수 있습니다.
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return <div>Notification Setup 🚀</div>
}

export default Notification
