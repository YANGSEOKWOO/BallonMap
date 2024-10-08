import React, { useState, useEffect } from 'react'
import { Map, MapMarker, MarkerClusterer, Circle } from 'react-kakao-maps-sdk'
import AppMarker from '../atoms/AppMarker'
import { ChatTeardropText, Siren } from '@phosphor-icons/react'
import './css/MobileLayout.css'
import TopBanner from '../atoms/TopBanner'
import ModalBalloonList from '../molecules/ModalBalloonList'
import ModalReport from '../molecules/ModalReport'
import { Badge } from 'react-bootstrap'

const MobileScreen = ({ balloons = [], initialLocation }) => {
  const [mapCenter, setMapCenter] = useState(initialLocation)

  // 지도 중심을 사용자의 현재 위치로 설정
  useEffect(() => {
    setMapCenter(initialLocation)
    console.log('location:', mapCenter)
  }, [initialLocation])
  const [showListModal, setShowListModal] = useState(false) // 목록 모달 상태
  const [showReportModal, setShowReportModal] = useState(false) // 제보 모달 상태

  // 모달 열기/닫기 핸들러 (풍선 목록)
  const handleOpenListModal = () => setShowListModal(true)
  const handleCloseListModal = () => setShowListModal(false)

  // 모달 열기/닫기 핸들러 (제보하기)
  const handleOpenReportModal = () => setShowReportModal(true)
  const handleCloseReportModal = () => setShowReportModal(false)

  const handleballoonClick = (latitude, longitude) => {
    console.log('lat:', latitude)
    console.log('log:', longitude)
    setShowListModal(false)
    setMapCenter({ lat: latitude, lng: longitude })
  }

  return (
    <div style={{ height: '100%', width: '100%' }} className="d-flex">
      <div className="banner-container">
        <TopBanner />
      </div>
      <Map center={mapCenter} style={{ width: '100%', height: '100%' }} level={2}>
        {/* <MarkerClusterer averageCenter={true} minLevel={4}> */}
        {balloons.map((balloon) => (
          <AppMarker
            key={balloon.id}
            lat={balloon.latitude}
            lng={balloon.longitude}
            isCleaned={balloon.processing_state === '처리 완료'}
            id={balloon.id}
            time={balloon.processing_time ? balloon.processing_time : balloon.detection_time}
          />
        ))}
        <MapMarker
          position={initialLocation}
          image={{
            src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI4Ij4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjE0IiByPSIxMiIgZmlsbD0iIzAwMDBGRiIgLz4KPC9zdmc+',
            size: { width: 16, height: 16 },
            options: {
              offset: { x: 8, y: 8 }, // 마커의 중앙을 기준으로 offset 설정
              spriteSize: { width: 16, height: 16 }, // 확대/축소와 관계없이 고정 크기 설정
            },
          }}
        />
        <Circle
          center={initialLocation}
          radius={10} // 반지름을 적절히 조정
          strokeWeight={2}
          strokeColor="#87CEEB" // 선의 색깔
          strokeOpacity={1} // 선의 불투명도
          strokeStyle={'solid'} // 선의 스타일
          fillColor="#87CEEB" // 채우기 색깔
          fillOpacity={0.7} // 채우기 불투명도
        />

        {/* </MarkerClusterer> */}
      </Map>

      {/* 제보하기 아이콘 */}
      <div className="report-container" onClick={handleOpenReportModal}>
        <Siren size={36} className="bottom-fixed" weight="fill" color="#ffffff" />
      </div>

      {/* 목록보기 아이콘 */}
      <div className="list-container" onClick={handleOpenListModal}>
        <ChatTeardropText size={36} className="bottom-fixed" weight="fill" color="#ffffff" />
        <Badge
          bg="danger"
          style={{
            position: 'absolute',
            right: '-8px',
            top: '-5px',
          }}
        >
          {balloons.length}
        </Badge>
      </div>

      {/* 분리된 모달 컴포넌트 호출 */}
      <ModalBalloonList show={showListModal} handleClose={handleCloseListModal} balloons={balloons} onballoonClick={handleballoonClick} />
      <ModalReport show={showReportModal} handleClose={handleCloseReportModal} />
    </div>
  )
}

export default MobileScreen
