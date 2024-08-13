import React, { useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import Marker from '../atoms/Marker'
import Sidebar from '../organisms/Sidebar'
import MarkerModal from '../organisms/MarkerModal'

const DesktopScreen = ({ balloons, children }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 33.450701, lng: 126.570667 })
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [modalShow, setModalShow] = useState(false)

  const handleballoonClick = (latitude, longitude) => {
    setMapCenter({ lat: latitude, lng: longitude })
  }

  const handleMarkerClick = (balloon) => {
    setSelectedMarker({
      id: balloon.id,
      lat: balloon.latitude,
      lng: balloon.longitude,
      isCleaned: balloon.processing_state === '처리 완료',
    })
    setModalShow(true)
  }

  const handleCloseModal = () => {
    setModalShow(false)
    setSelectedMarker(null)
  }

  return (
    <div style={{ height: '100%', width: '100%' }} className="d-flex">
      <Sidebar balloons={balloons} onballoonClick={handleballoonClick} />
      <Map center={mapCenter} style={{ width: '100%', height: '100%' }} level={4}>
        {balloons.map((balloon) => (
          <Marker
            key={balloon.id}
            lat={balloon.latitude}
            lng={balloon.longitude}
            isCleaned={balloon.processing_state === '처리 완료'}
            id={balloon.id}
            onClick={() => handleMarkerClick(balloon)} // 마커 클릭 시 호출될 함수 전달
          />
        ))}
      </Map>
      <MarkerModal show={modalShow} handleClose={handleCloseModal} markerData={selectedMarker} />
    </div>
  )
}

export default DesktopScreen
