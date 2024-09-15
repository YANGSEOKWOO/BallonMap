import React from 'react'
import ResponsiveLayout from './components/Layout/ResponsiveLayout'
import { ErrorBoundary } from 'react-error-boundary'
import { LocationProvider } from './context/LocationContext'
import Notification from './components/atoms/Notification'

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <LocationProvider>
        <Notification />
        <ResponsiveLayout />
      </LocationProvider>
    </ErrorBoundary>
  )
}

export default App
