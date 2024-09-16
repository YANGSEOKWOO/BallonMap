import React, { useEffect } from 'react'
import ResponsiveLayout from './components/Layout/ResponsiveLayout'
import { ErrorBoundary } from 'react-error-boundary'
import { LocationProvider } from './context/LocationContext'
import RequestPermission from './components/atoms/RequestPermission'

function App() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('App is in the foreground')
        // 포그라운드로 전환될 때 실행할 로직
      } else {
        console.log('App is in the background')
        // 백그라운드로 전환될 때 실행할 로직
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 클린업 함수로 이벤트 리스너 제거
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
  return (
    <ErrorBoundary FallbackComponent={() => <div>Error</div>}>
      <LocationProvider>
        <RequestPermission />
        <ResponsiveLayout />
      </LocationProvider>
    </ErrorBoundary>
  )
}

export default App
