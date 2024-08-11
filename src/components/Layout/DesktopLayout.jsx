import React from 'react'
import { Map } from 'react-kakao-maps-sdk'
import Marker from '../atoms/Marker'
import Sidebar from '../molecules/Sidebar'

const DesktopLayout = ({ ballons, children }) => {
  console.log('ballons:', ballons)
  return (
    <div style={{ height: '100%', width: '100%' }} className="d-flex">
      <Sidebar ballons={ballons} />
      <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: '100%', height: '100%' }} level={4}>
        {ballons.map((ballon) => (
          <Marker key={ballon.id} lat={ballon.latitude} lng={ballon.longitude} isCleaned={ballon.processing_state === '처리 완료'} id={ballon.id} />
        ))}
      </Map>
    </div>
  )
}

export default DesktopLayout
