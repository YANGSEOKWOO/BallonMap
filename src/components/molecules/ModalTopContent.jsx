import React, { useState, useEffect } from 'react'
import { NavigationArrow, ShareNetwork } from '@phosphor-icons/react'
import Process from '../atoms/Process'
import Detect from '../atoms/Detect'
import { convertCoordinatesToAddress } from '../../utils/kakaomap'
import { formatDate } from '../../utils/convert'

export default function ModalTopContent({ isCleaned, lat, lng, time, isMobile }) {
  const [address, setAddress] = useState(null) // 주소 상태 관리
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태 관리
  const [error, setError] = useState(null) // 에러 상태 관리
  const showingTime = formatDate(time)

  useEffect(() => {
    if (lat && lng) {
      setIsLoading(true)
      // 좌표로부터 주소 변환 시도
      convertCoordinatesToAddress(lat, lng)
        .then((result) => {
          setAddress(result) // 주소 상태 업데이트
        })
        .catch((error) => {
          console.error(error) // 에러 발생 시 콘솔 출력
          setError('주소를 불러오는 데 실패했습니다.') // 에러 메시지 설정
        })
        .finally(() => {
          setIsLoading(false) // 로딩 상태 해제
        })
    }
  }, [lat, lng])

  return (
    <div>
      {/* 처리 중일때, 처리 전일때 구분 */}
      {/* 모바일화면이라면 이부분은 안나옴 */}
      {isMobile ? '' : isCleaned ? <Process /> : <Detect />}
      <div className="d-flex align-items-center justify-content-between p-3">
        {/* 아이콘과 텍스트 컨테이너 */}
        <div className="d-flex align-items-center">
          <div className="bg-black text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
            <NavigationArrow size={24} weight="fill" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <div className="ms-3">
            {isLoading ? <p className="mb-1 fw-bold h3">주소를 불러오는 중...</p> : error ? <p className="mb-1 fw-bold h3 text-danger">{error}</p> : <p className="mb-1 fw-bold h3">{address}</p>}
            <p className="mb-0 text-muted">{showingTime}</p>
          </div>
        </div>

        {/* 공유 버튼 */}
        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: '#eeeeee', width: '40px', height: '40px' }}>
          <ShareNetwork size={20} weight="fill" />
        </div>
      </div>
    </div>
  )
}
