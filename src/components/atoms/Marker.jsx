import React from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'
import blueballoon from '../../assets/blueballoon.png'
import redballoon from '../../assets/redballoon.png'

/**
 * 위도와 경도를 받고, 그 위치에 마커를 생성하는 함수
 *
 * @param {number} lat 마커 위도
 * @param {number} lng 마커 경도
 * @param {bool} isCleaned 제거 됐는지 여부
 * @param {number} id 풍선 id값
 * @param {function} onClick 마커 클릭 시 호출되는 함수
 *
 * @returns {JSX.Element} 마커 컴포넌트
 */
export default function Marker({ lat, lng, isCleaned, id, onClick }) {
  const balloonImage = isCleaned ? blueballoon : redballoon

  return (
    <MapMarker
      position={{ lat, lng }}
      image={{
        src: balloonImage,
        size: { width: 'auto', height: 'auto' },
        options: { offset: { x: '50%', y: '100%' } },
      }}
      style={{
        width: '64px',
        height: '69px',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
      clickable={true}
      onClick={onClick} // 마커 클릭 시 부모로부터 전달받은 onClick 함수 호출
    />
  )
}
