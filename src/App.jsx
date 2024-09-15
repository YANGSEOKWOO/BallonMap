import React from 'react'
import ResponsiveLayout from './components/Layout/ResponsiveLayout'
import { ErrorBoundary } from 'react-error-boundary'
import { LocationProvider } from './context/LocationContext'
import RequestPermission from './components/atoms/RequestPermission'

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <LocationProvider>
        <RequestPermission />
        <ResponsiveLayout />
      </LocationProvider>
    </ErrorBoundary>
  )
}

export default App
