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
        onClick={() => setIsOpen(!isOpen)} // 클릭 시 인포윈도우 토글
      />

      {/* 인포윈도우가 열려 있을 때만 CustomOverlayMap을 렌더링 */}
      {isOpen && (
        <CustomOverlayMap
          position={{ lat, lng }}
          yAnchor={1.6} // y축 기준점 조정 (마커 위로 이동)
          clickable={true} // 오버레이도 클릭 가능하게
          zIndex={1} // 마커 위로 위치하도록 zIndex 설정
        >
          <InfoWindow isCleaned={isCleaned} lat={lat} lng={lng} time={time} id={id} />
          {/* <div className="wrap">
            <div className="info">
              <div className="title">
                카카오 스페이스닷원
                <div className="close" onClick={() => setIsOpen(false)} title="닫기"></div>
              </div>
              <div className="body">
                <div className="img">
                  <img src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005" width="73" height="70" alt="카카오 스페이스닷원" />
                </div>
                <div className="desc">
                  <div className="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div className="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                  <div>
                    <a href="https://www.kakaocorp.com/main" target="_blank" className="link" rel="noreferrer">
                      홈페이지
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </CustomOverlayMap>
      )}

      {/* 원형 표시 (Circle) */}
      <Circle
        center={{ lat, lng }}
        radius={100} // 반지름을 적절히 조정
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
