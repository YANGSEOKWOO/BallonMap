import React, { useState } from 'react'
import { MapMarker, Circle } from 'react-kakao-maps-sdk'
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
export default function AppMarker({ lat, lng, isCleaned, id, onClick }) {
  const balloonImage = isCleaned ? blueballoon : redballoon
  const [isOpen, setIsOpen] = useState(false)
  const circleColor = isCleaned ? '#CFE7FF' : '#F27B92'

  return (
    <>
      {/* 마커 */}
      <MapMarker
        position={{ lat, lng }}
        image={{
          src: balloonImage,
          size: { width: 24, height: 28 }, // 이미지 크기
          options: { offset: { x: 12, y: 28 } }, // 마커의 하단 중앙이 좌표에 맞도록 오프셋 설정
        }}
        clickable={true}
        onClick={() => {
          console.log('클릭!')
          setIsOpen(!isOpen) // 클릭 시 인포윈도우 상태 토글
        }}
      >
        {/* 인포윈도우 */}
        {isOpen && (
          <div>
            Hello World! <br />
          </div>
        )}
      </MapMarker>

      {/* 원형 표시 (Circle) */}
      <Circle
        center={{
          lat: lat,
          lng: lng,
        }}
        radius={100}
        strokeWeight={2}
        strokeColor={circleColor} // 선의 색깔
        strokeOpacity={1} // 선의 불투명도
        strokeStyle={'solid'} // 선의 스타일
        fillColor={circleColor} // 채우기 색깔
        fillOpacity={0.7} // 채우기 불투명도
      />
    </>
  )
}
