import React from 'react'
import './css/PendingUpdate.css' // 스타일 파일 경로

export default function PendingUpdate({ text = '처리 완료시 업데이트 됩니다!', image, isCleaned }) {
  return (
    <div className="pending-update-container">
      <div className="pending-update-content">
        {isCleaned ? (
          <img src={image} alt="처리 완료된 이미지" className="pending-update-image" />
        ) : (
          <div className="pending-update-text">
            <p>{text}</p>
          </div>
        )}
      </div>
    </div>
  )
}
