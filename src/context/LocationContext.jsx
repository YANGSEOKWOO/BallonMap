// context/LocationContext.js
import React, { createContext, useState, useContext, useEffect } from 'react'

// LocationContext 생성
const LocationContext = createContext()

export const useLocation = () => useContext(LocationContext)

// LocationProvider 생성
export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })
          setLoading(false)
        },
        (error) => {
          console.error('위치 정보를 가져오는데 실패했습니다.', error)
          setLoading(false)
        },
      )
    } else {
      console.error('Geolocation이 이 브라우저에서 지원되지 않습니다.')
      setLoading(false)
    }
  }, [])

  return <LocationContext.Provider value={{ location, setLocation, loading }}>{children}</LocationContext.Provider>
}
