import React from 'react'
import ResponsiveLayout from './components/Layout/ResponsiveLayout'

function App() {
  // TODO :: center위도 경도, 사용자의 위치를 가져와서 처음 위치를 볼 수 있도록 변환
  // TODO :: 추후 Data Fetch 할 때, Marker는 계속 가져와야하도록 수정
  // TODO :: Marker 주변에 500 정도의 radius를 볼 수 있는 방법?

  return <ResponsiveLayout />
}

export default App
