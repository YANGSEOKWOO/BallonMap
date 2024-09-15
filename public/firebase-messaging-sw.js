// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging.js')

// Initialize Firebase app with the same config used in your app
firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
})

// Initialize Firebase Messaging
const messaging = firebase.messaging()

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)

  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/pwa-192x192.png', // 사용할 아이콘
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
