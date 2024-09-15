import React, { useState } from 'react'
import { MapMarker, Circle, CustomOverlayMap } from 'react-kakao-maps-sdk'
import blueballoon from '../../assets/blueballoon.png'
import redballoon from '../../assets/redballoon.png'
import InfoWindow from './InfoWindow'

export default function AppMarker({ lat, lng, isCleaned, id, onClick, time }) {
  const balloonImage = isCleaned ? blueballoon : redballoon
  const [isOpen, setIsOpen] = useState(false) // 인포윈도우의 상태

  const circleColor = isCleaned ? '#CFE7FF' : '#F27B92'

  const toggleInfoWindow = () => {
    console.log('InfoWindow toggle:', !isOpen)
    setIsOpen((prevState) => !prevState) // 상태를 명확히 반전
  }

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
        onClick={toggleInfoWindow} // 클릭 시 인포윈도우 토글
      />

      {/* 인포윈도우가 열려 있을 때만 CustomOverlayMap을 렌더링 */}
      {isOpen && (
        <CustomOverlayMap
          position={{ lat, lng }}
          yAnchor={1.2} // y축 기준점 조정 (마커 위로 이동)
          clickable={true} // 오버레이도 클릭 가능하게
          zIndex={1} // 마커 위로 위치하도록 zIndex 설정
        >
          <InfoWindow isCleaned={isCleaned} lat={lat} lng={lng} time={time} id={id} />
        </CustomOverlayMap>
      )}

      {/* 원형 표시 (Circle) */}
      <Circle
        center={{ lat, lng }}
        radius={25} // 반지름을 적절히 조정
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
