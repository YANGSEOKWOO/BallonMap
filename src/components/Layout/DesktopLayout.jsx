import React from 'react'
import { Map } from 'react-kakao-maps-sdk'
import Marker from '../atoms/Marker'
import Sidebar from '../molecules/Sidebar'

const DesktopLayout = (props) => {
  return (
    <div style={{ height: '100%', width: '100%' }} className="d-flex">
      <Sidebar />
      <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: '100%', height: '100%' }} level={4}>
        <Marker lat={33.450701} lng={126.570667} isCleaned={true} id={1} />
        <Marker lat={33.451701} lng={126.571667} isCleaned={false} id={2} />
      </Map>
    </div>
  )
}

export default DesktopLayout
