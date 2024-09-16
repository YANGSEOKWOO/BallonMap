import React, { useState, useEffect } from 'react'
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk'
import WebMarker from '../atoms/WebMarker'
import Sidebar from '../organisms/Sidebar'
import MarkerModal from '../organisms/MarkerModal'

const DesktopScreen = ({ balloons, initialLocation }) => {
  const [mapCenter, setMapCenter] = useState(initialLocation)

  // 지도 중심을 사용자의 현재 위치로 설정
  useEffect(() => {
    setMapCenter(initialLocation)
  }, [initialLocation])
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [modalShow, setModalShow] = useState(false)

  /**
   * 위도 경도를 받고, 그 위치로 화면을 이동하는 함수
   *
   * @param {string} latitude 위도
   * @param {string} longitude 경도
   */
  const handleballoonClick = (latitude, longitude) => {
    setMapCenter({ lat: latitude, lng: longitude })
  }

  /**
   * 특정 풍선 선택 시, 특정 풍선에 대한 정보를 가지고 Modal형태로 나타내는 함수
   * @param {object} balloon
   */
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

  /**
   * 모달을 닫는 함수
   */
  const handleCloseModal = () => {
    setModalShow(false)
    setSelectedMarker(null)
  }

  /**
   * 사용자의 현재 위치를 가져오는 함수
   */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setMapCenter({ lat: latitude, lng: longitude }) // 현재 위치로 지도 중심을 설정
        },
        (error) => {
          console.error('위치를 가져오는데 오류 발생', error)
        },
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, []) // 빈 배열을 전달하여 첫 렌더링 때만 실행

  return (
    <div style={{ height: '100%', width: '100%' }} className="d-flex">
      <Sidebar balloons={balloons} onballoonClick={handleballoonClick} />
      <Map center={mapCenter} style={{ width: '100%', height: '100%' }} level={4}>
        {/* Clusterer를 사용하여 마커를 클러스터링 */}
        {/* <MarkerClusterer averageCenter={true} minLevel={4}> */}
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
        {/* </MarkerClusterer> */}
      </Map>
      <MarkerModal show={modalShow} handleClose={handleCloseModal} markerData={selectedMarker} />
    </div>
  )
}

export default DesktopScreen
