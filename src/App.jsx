// App.js
import React from 'react'
import ResponsiveLayout from './components/Layout/ResponsiveLayout'
import { ErrorBoundary } from 'react-error-boundary'
import { LocationProvider } from './context/LocationContext'

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <LocationProvider>
        <ResponsiveLayout />
      </LocationProvider>
    </ErrorBoundary>
  )
}

export default App
