import React from "react";
import { Map } from "react-kakao-maps-sdk";
import Marker from "./components/atoms/Marker";

function App() {
  // TODO :: center위도 경도, 사용자의 위치를 가져와서 처음 위치를 볼 수 있도록 변환
  // TODO :: 추후 Data Fetch 할 때, Marker는 계속 가져와야하도록 수정
  return (
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Marker lat={33.450701} lng={126.570667} isCleaned={true} id={1}/>
      {/* 필요한 만큼 Marker 컴포넌트를 추가 */}
        <Marker lat={33.451701} lng={126.571667} isCleaned={false} id = {2} />
      </Map>
  );
}

export default App;