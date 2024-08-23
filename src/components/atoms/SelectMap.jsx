import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
import { useState, useEffect } from 'react'

export default function SelectMap({ onPositionChange }) {
  // onPositionChange prop 추가
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_API_KEY,
  })

  const [data, setData] = useState({
    level: 3,
    position: {
      lat: 33.450701,
      lng: 126.570667,
    },
  })

  useEffect(() => {
    if (error) {
      console.error('카카오 지도 로딩 중 오류 발생:', error)
    }
  }, [error])

  useEffect(() => {
    if (onPositionChange) {
      onPositionChange(data.position) // 지도 위치가 변경될 때마다 부모에 위치 전달
    }
  }, [data.position, onPositionChange])

  return (
    <>
      {loading ? (
        <p>지도를 로딩 중입니다...</p>
      ) : (
        <>
          <Map
            id="map"
            center={data.position}
            style={{
              width: '100%',
              height: '350px',
            }}
            level={data.level}
            onCenterChanged={(map) => {
              const level = map.getLevel()
              const latlng = map.getCenter()

              setData({
                level: level,
                position: {
                  lat: latlng.getLat(),
                  lng: latlng.getLng(),
                },
              })
            }}
          >
            <MapMarker position={data.position} />
          </Map>
          <p>
            <em>오물 풍선의 위치를 가르켜주세요!</em>
          </p>
        </>
      )}
      {error && <p>지도를 불러오는 중 오류가 발생했습니다: {error.message}</p>}
    </>
  )
}
