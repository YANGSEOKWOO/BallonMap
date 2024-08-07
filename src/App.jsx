import React from "react";
import { Map } from "react-kakao-maps-sdk";
import Marker from "./components/atoms/Marker";
import ResponsiveLayout from "./components/Layout/ResponsiveLayout";

function App() {
  // TODO :: center위도 경도, 사용자의 위치를 가져와서 처음 위치를 볼 수 있도록 변환
  // TODO :: 추후 Data Fetch 할 때, Marker는 계속 가져와야하도록 수정
  return (
    <ResponsiveLayout/>
  );
}

export default App;