import React from 'react'
import PendingUpdate from '../atoms/PendingUpdate'
import { formatDate } from '../../utils/convert'

function StatusHeader({ status, icon, color, fontColor, isMobile }) {
  const mobileStyle = isMobile
    ? { padding: '0.25rem 0.5rem', maxWidth: '120px', minWidth: '80px' } // 모바일일 때 글자수에 맞춘 크기
    : { padding: '0.25rem 0.75rem', width: 'auto' } // 웹일 때는 기본 스타일

  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center" style={{ ...mobileStyle, backgroundColor: color, borderRadius: '25px' }}>
        <div className="me-2">{icon}</div>
        <h5 className="mb-0 fw-bold" style={{ color: fontColor }}>
          {status}
        </h5>
      </div>
    </div>
  )
}

function GradientConnection() {
  return (
    <div
      style={{
        height: '6px',
        background: 'linear-gradient(to right, #ffedb0, #d0e9ff)',
        flexGrow: 1,
      }}
    ></div>
  )
}
// 타임라인 항목 컴포넌트
function TimelineItem({ status, time, result, image }) {
  // time이 있는 경우 formatDate로 포맷팅
  const formatTime = time ? formatDate(time) : ''
  console.log('sats', time)
  return (
    <div className="d-flex mt-4 justify-content-around align-items-center">
      <div className="text-center me-4">
        {/* 텍스트 내 줄바꿈을 <br />로 처리 */}
        {status.title === false ? <span className="mt-2 fw-bold">최초 발견시간</span> : <span className="mt-2 fw-bold">처리 완료시간</span>}
        <p className="text-muted">
          {formatTime.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        {status.title === true ? <span className="mt-2 fw-bold text-danger">특이사항 : {result || '없음'}</span> : ''}
      </div>
      <div>{image ? <PendingUpdate isCleaned={true} image={image} /> : <PendingUpdate isCleaned={false} />}</div>
    </div>
  )
}

export function WebModalBottomContent({ isCleaned, detectImage, detectTime, processImage, processTime, description }) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        {/* 발견 */}
        <StatusHeader status="발견" icon="📷" color="#ffedb0" fontColor="#FAB002" isMobile={false} />

        {/* 그라데이션 연결선 */}
        <GradientConnection />

        {/* 처리 완료 */}
        <StatusHeader status={isCleaned ? '처리 완료' : '처리중 ...'} icon="👮‍♂️" color="#CBE9FF" fontColor="#255BE6" isMobile={false} />
      </div>

      <div className="d-flex justify-content-between">
        {/* 발견 */}
        <TimelineItem status={{ title: false, color: '#ffedb0' }} time={detectTime} image={detectImage} />
        {/* 처리 완료 */}
        <TimelineItem status={{ title: true, color: '#d0e9ff' }} time={processTime} result={description} image={processImage} />
      </div>
    </>
  )
}

export function MobileModalBottomContent({ isCleaned, detectImage, detectTime, processImage, processTime, description }) {
  return (
    <>
      <div className="d-flex flex-column">
        {/* 발견 */}
        <StatusHeader status="발견" icon="📷" color="#ffedb0" fontColor="#FAB002" isMobile={true} />

        <TimelineItem status={{ title: false, color: '#ffedb0' }} time={detectTime} image={detectImage} />
      </div>

      <div className="d-flex flex-column">
        {/* 처리 완료 */}
        <StatusHeader status={isCleaned ? '처리 완료' : '처리중 ...'} icon="👮‍♂️" color="#CBE9FF" fontColor="#255BE6" isMobile={true} />
        <TimelineItem status={{ title: true, color: '#d0e9ff' }} time={processTime} result={description} image={processImage} />
      </div>
    </>
  )
}
