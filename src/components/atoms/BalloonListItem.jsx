import React, { useEffect, useState } from 'react'
import detectionballoon from '../../assets/balloon_img.png'
import processingballoon from '../../assets/balloon_clean_img.png'
import { SecurityCamera, Siren } from '@phosphor-icons/react'
import { convertCoordinatesToAddress } from '../../utils/kakaomap'

const BalloonListItem = ({ data }) => {
  const [address, setAddress] = useState(null)
  useEffect(() => {
    convertCoordinatesToAddress(data.latitude, data.longitude)
      .then((result) => {
        setAddress(result) // 주소 상태 업데이트
      })
      .catch((error) => {
        console.error(error) // 에러 발생 시 콘솔 출력
      })
  })
  return (
    <div className="balloon-list-item border rounded p-3 mb-3" style={{ backgroundColor: '#f8f9fa', width: '90%', margin: 'auto' }}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="detect-container">
          <div className="badge text-dark me-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#FFF2B1', maxWidth: '80px' }}>
            <SecurityCamera color="#FAB002" size={28} weight="fill" className="me-1" />
            <p className="h5 m-0" style={{ color: '#FAB002' }}>
              발견
            </p>
          </div>
          <div className="fw-bold" style={{ fontSize: '1.2rem' }}>
            {address || '주소 불러오는 중...'}
          </div>
          <div className="text-muted">{new Date(data.detection_time).toLocaleString('ko-KR')}</div>
        </div>
        <img src={detectionballoon} alt="Detection" className="img-fluid rounded mb-3" style={{ maxHeight: '150px', minHeight: '80px' }} />
      </div>
      {data.processing_state === '처리 완료' && (
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="processing-content d-flex flex-column">
            <div className="badge d-flex align-items-center justify-content-center" style={{ backgroundColor: '#CBE9FF', padding: '0.5rem', maxWidth: '120px' }}>
              <Siren color="#255BE6" size={28} weight="fill" className="me-1" />
              <p className="m-0" style={{ color: '#255BE6', fontSize: '1.2rem' }}>
                처리완료
              </p>
            </div>
            <div className="text-muted">{new Date(data.processing_time).toLocaleString('ko-KR')}</div>
            <div className="fw-bold">특이사항 : {data.description || '없음'}</div>
          </div>
          <img src={processingballoon} alt="Processing" className="img-fluid rounded mb-3" style={{ maxHeight: '150px', minHeight: '80px' }} />
        </div>
      )}
    </div>
  )
}

export default BalloonListItem
