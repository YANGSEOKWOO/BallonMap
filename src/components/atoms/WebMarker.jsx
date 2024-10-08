import React from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'
import blueballoon from '../../assets/blueballoon.png'
import redballoon from '../../assets/redballoon.png'
import { Circle } from 'react-kakao-maps-sdk'

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
export default function WebMarker({ lat, lng, isCleaned, id, onClick }) {
  const balloonImage = isCleaned ? blueballoon : redballoon
  const circleColor = isCleaned ? '#CFE7FF' : '#F27B92'

  return (
    <>
      <MapMarker
        position={{ lat, lng }}
        image={{
          src: balloonImage,
          size: { width: 32, height: 35 }, // 마커 크기를 작게 설정
          options: { offset: { x: 16, y: 35 } }, // 마커 중심 하단에 맞게 offset 설정
        }}
        clickable={true}
        onClick={onClick} // 마커 클릭 시 부모로부터 전달받은 onClick 함수 호출
      />
      <Circle
        center={{
          lat: lat,
          lng: lng,
        }}
        radius={100}
        strokeWeight={2}
        strokeColor={circleColor} // 선의 색깔입니다
        strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={'solid'} // 선의 스타일 입니다
        fillColor={circleColor} // 채우기 색깔입니다
        fillOpacity={0.7} // 채우기 불투명도 입니다
      />
    </>
  )
}
