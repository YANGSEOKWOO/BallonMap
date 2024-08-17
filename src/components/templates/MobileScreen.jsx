import React, { useState } from 'react'
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk'
import AppMarker from '../atoms/AppMarker'
import { ChatTeardropText, Siren } from '@phosphor-icons/react'
import './css/MobileLayout.css'
import TopBanner from '../atoms/TopBanner'
import ModalBalloonList from '../molecules/ModalBalloonList'
import ModalReport from '../molecules/ModalReport'
import { Badge } from 'react-bootstrap'

const MobileScreen = ({ balloons }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 33.450701, lng: 126.570667 })
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
      <Map center={mapCenter} style={{ width: '100%', height: '100%' }} level={4}>
        <MarkerClusterer averageCenter={true} minLevel={4}>
          {balloons.map((balloon) => (
            <AppMarker key={balloon.id} lat={balloon.latitude} lng={balloon.longitude} isCleaned={balloon.processing_state === '처리 완료'} id={balloon.id} />
          ))}
        </MarkerClusterer>
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
