import React from 'react'
import processingBallon from '../../assets/ballon_clean_img.png'
import detectingBallon from '../../assets/ballon_img.png'
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
function TimelineItem({ status, date, time, result, image }) {
  return (
    <div className="d-flex align-items-center mt-4">
      <div className="text-center me-4">
        <p className="text-muted">
          {date} <br /> {time}
          {result && <p className="text-muted mt-2 fw-bold text-danger">{result}</p>}
        </p>
      </div>
      <div>
        <img src={image} alt="status" style={{ width: '150px', height: '150px', border: status.color === '처리 완료' ? '2px solid blue' : 'none' }} />
      </div>
    </div>
  )
}

export default function ModalBottomContent() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        {/* 발견 */}
        <StatusHeader status="발견" icon="📷" color="#ffedb0" fontColor="#FAB002" />

        {/* 그라데이션 연결선 */}
        <GradientConnection />

        {/* 처리 완료 */}
        <StatusHeader status="처리 완료" icon="👮‍♂️" color="#CBE9FF" fontColor="#255BE6" />
      </div>

      <div className="d-flex justify-content-between">
        {/* 발견 */}
        <TimelineItem status={{ title: '발견', color: '#ffedb0' }} date="2024년 6월 17일" time="20시 07분" image={detectingBallon} />

        {/* 처리 완료 */}
        <TimelineItem status={{ title: '처리 완료', color: '#d0e9ff' }} date="2024년 6월 17일" time="20시 42분" result="검출결과 : 단순 쓰레기" image={processingBallon} />
      </div>
    </>
  )
}
