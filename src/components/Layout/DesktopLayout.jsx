import React, { useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import Marker from '../atoms/Marker'
import Sidebar from '../molecules/Sidebar'
import MarkerModal from '../molecules/MarkerModal'

const DesktopLayout = ({ ballons, children }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 33.450701, lng: 126.570667 })
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [modalShow, setModalShow] = useState(false)

  const handleBallonClick = (latitude, longitude) => {
    setMapCenter({ lat: latitude, lng: longitude })
  }

  const handleMarkerClick = (ballon) => {
    setSelectedMarker({
      id: ballon.id,
      lat: ballon.latitude,
      lng: ballon.longitude,
      isCleaned: ballon.processing_state === '처리 완료',
    })
    setModalShow(true)
  }

  const handleCloseModal = () => {
    setModalShow(false)
    setSelectedMarker(null)
  }

  return (
    <div style={{ height: '100%', width: '100%' }} className="d-flex">
      <Sidebar ballons={ballons} onBallonClick={handleBallonClick} />
      <Map center={mapCenter} style={{ width: '100%', height: '100%' }} level={4}>
        {ballons.map((ballon) => (
          <Marker
            key={ballon.id}
            lat={ballon.latitude}
            lng={ballon.longitude}
            isCleaned={ballon.processing_state === '처리 완료'}
            id={ballon.id}
            onClick={() => handleMarkerClick(ballon)} // 마커 클릭 시 호출될 함수 전달
          />
        ))}
      </Map>
      <MarkerModal show={modalShow} handleClose={handleCloseModal} markerData={selectedMarker} />
    </div>
  )
}

export default DesktopLayout
