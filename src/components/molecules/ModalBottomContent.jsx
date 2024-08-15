import React from 'react'
import processingballoon from '../../assets/balloon_clean_img.png'
import detectingballoon from '../../assets/balloon_img.png'
import PendingUpdate from '../atoms/PendingUpdate'
import { formatDate } from '../../utils/convert'
function StatusHeader({ status, icon, color, fontColor }) {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center px-3 py-2" style={{ backgroundColor: color, borderRadius: '25px' }}>
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

  return (
    <div className="d-flex mt-4">
      <div className="text-center me-4">
        {/* 텍스트 내 줄바꿈을 <br />로 처리 */}
        <p className="text-muted fw-bold">
          {formatTime.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        {status.title === true ? <span className="mt-2 fw-bold text-danger">특이사항 : {result || '없음'}</span> : ''}
      </div>
      <div>{status.title ? <PendingUpdate isCleaned={true} image={processingballoon} /> : <PendingUpdate isCleaned={false} />}</div>
    </div>
  )
}

export default function ModalBottomContent({ isCleaned, detectImage, detectTime, processImage, processTime, description }) {
  console.log('description', description)
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        {/* 발견 */}
        <StatusHeader status="발견" icon="📷" color="#ffedb0" fontColor="#FAB002" />

        {/* 그라데이션 연결선 */}
        <GradientConnection />

        {/* 처리 완료 */}
        <StatusHeader status={isCleaned ? '처리 완료' : '처리중 ...'} icon="👮‍♂️" color="#CBE9FF" fontColor="#255BE6" />
      </div>

      <div className="d-flex justify-content-between">
        {/* 발견 */}
        <TimelineItem status={{ title: '발견', color: '#ffedb0' }} time={detectTime} image={detectImage} />

        {/* 처리 완료 */}
        <TimelineItem status={{ title: isCleaned, color: '#d0e9ff' }} time={processTime} result={description} image={processImage} />
      </div>
    </>
  )
}
