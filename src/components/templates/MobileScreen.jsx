import React from 'react'
import { Map } from 'react-kakao-maps-sdk'
import Marker from '../atoms/Marker'
import { useState } from 'react'
import { ChatTeardrop, ChatTeardropText, Envelope, Siren } from '@phosphor-icons/react'
import './css/MobileLayout.css'
import TopBanner from '../atoms/TopBanner'

const MobileScreen = ({ balloons }) => {
  console.log('balloons:', balloons)
  const [mapCenter, setMapCenter] = useState({ lat: 33.450701, lng: 126.570667 })
  return (
    <div style={{ height: '100%', width: '100%' }} className="d-flex">
      <div className="banner-container">
        <TopBanner />
      </div>
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
      {/* 하단 고정바 */}
      <div className="list-container">
        <ChatTeardropText size={36} className="bottom-fixed" weight="fill" color="#ffffff" />
      </div>
      <div className="report-container">
        <Siren size={36} className="bottom-fixed" weight="fill" color="#ffffff" />
      </div>
    </div>
  )
}

export default MobileScreen
