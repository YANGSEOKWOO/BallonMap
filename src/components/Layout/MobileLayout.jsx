import React from 'react'
import { Map } from 'react-kakao-maps-sdk'
import Marker from '../atoms/Marker'
import { useState } from 'react'
import { ChatTeardrop, ChatTeardropText, Envelope, Siren } from '@phosphor-icons/react'
import './css/MobileLayout.css'
import TopBanner from '../atoms/TopBanner'
// import MobileSideBar from 'components/Sidebar/MobileSidebar';
// import MobileNavbar from 'components/Navbar/MobileNavbar';
// import COLOR from 'constants/color.constant';

const MobileLayout = ({ ballons }) => {
  console.log('ballons:', ballons)
  const [mapCenter, setMapCenter] = useState({ lat: 33.450701, lng: 126.570667 })
  return (
    <div style={{ height: '100%', width: '100%' }} className="d-flex">
      <div className="banner-container">
        <TopBanner />
      </div>
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
      {/* 하단 고정바 */}
      <div className="report-container">
        <Siren size={36} className="bottom-fixed" weight="fill" color="#ffffff" />
      </div>
      <div className="list-container">
        <ChatTeardropText size={36} className="bottom-fixed" weight="fill" color="#ffffff" />
      </div>
    </div>
  )
}

export default MobileLayout
