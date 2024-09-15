// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging.js')

// Initialize Firebase app with static config values
firebase.initializeApp({
  apiKey: 'AIzaSyDGtaTT8T0cE9fYpGjL6AaIjaH8qwd0sRQ',
  authDomain: 'balloon-map-net.firebaseapp.com',
  projectId: 'balloon-map-net',
  storageBucket: 'balloon-map-net.appspot.com',
  messagingSenderId: '643859630215',
  appId: '1:643859630215:web:45a110bbaed86bc1211022',
  measurementId: 'G-3HHX0FPMJR',
})

// Initialize Firebase Messaging
const messaging = firebase.messaging()

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/pwa-192x192.png', // 사용할 아이콘
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
