import React, { useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import WebMarker from '../atoms/WebMarker'
import Sidebar from '../organisms/Sidebar'
import MarkerModal from '../organisms/MarkerModal'

const DesktopScreen = ({ balloons, children }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 33.450701, lng: 126.570667 })
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  console.log('desk', balloons)

  /**
   * 위도 경도를 받고, 그 위치로 화면을 이동하는 함수
   *
   * @param {string} latitude 위도
   * @param {string} longitude 경도
   */
  const handleballoonClick = (latitude, longitude) => {
    console.log('lat:', latitude)
    console.log('log:', longitude)
    setMapCenter({ lat: latitude, lng: longitude })
  }

  const handleMarkerClick = (balloon) => {
    setSelectedMarker({
      id: balloon.id,
      lat: balloon.latitude,
      lng: balloon.longitude,
      isCleaned: balloon.processing_state === '처리 완료',
      detectionImage: balloon.detection_image,
      detectionTime: balloon.detection_time,
      processingImage: balloon.processing_image,
      processingTime: balloon.processing_time,
      description: balloon.description,
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
          <WebMarker
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
