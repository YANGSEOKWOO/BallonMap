import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Service Worker 등록 코드 추가
if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported')
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js', { type: 'module' }) // public 폴더에 있는 Service Worker 등록
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed: ', err)
      })
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
