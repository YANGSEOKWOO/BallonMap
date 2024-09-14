import React from 'react'
import ResponsiveLayout from './components/Layout/ResponsiveLayout'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  // TODO :: center위도 경도, 사용자의 위치를 가져와서 처음 위치를 볼 수 있도록 변환
  // TODO :: 추후 Data Fetch 할 때, Marker는 계속 가져와야하도록 수정
  // TODO :: Marker 주변에 500 정도의 radius를 볼 수 있는 방법?
  // TODO :: totalRowData : 효정이가 API에다가 추가해준다고 했는데, 어떤 row 위치에다가 바뀌는지 몰라서..... 일단 length로 해놈, 추후에 수정해야함

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResponsiveLayout />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
