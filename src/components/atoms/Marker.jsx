import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import blueballon from "../../assets/blueballon.png";
import redballon from "../../assets/redballon.png";

/**
 * 위도와 경도를 받고, 그 위치에 마커를 생성하는 함수 
 * 
 * @param {number} lat 마커 위도
 * @param {number} lng 마커 경도
 * @param {bool} isCleaned 제거 됐는지 여부
 * @param {number} id 풍선 id값
 * 
 * @returns {JSX.Element} 마커 컴포넌트
 */
export default function Marker({ lat, lng, isCleaned, id }) {
    const ballonImage = isCleaned ? blueballon : redballon;
    
  return (
    <MapMarker
      position={{
        lat: lat,
        lng: lng
      }}
      image={{
        src: ballonImage, // import한 이미지 파일을 src로 사용
        size: {
          width: "auto",
          height: "auto",
        },
        options: {
          offset: {
            x: "50%", // 가로 방향 중앙
            y: "100%", // 세로 방향 아래쪽
          },
        }
      }}
      style={{
        width: "64px",
        height: "69px",
        maxWidth: "100%", // 반응형 크기 조절
        maxHeight: "100%", // 반응형 크기 조절
      }}
    />
  );
}