import { NavigationArrow, ShareNetwork } from '@phosphor-icons/react'
import Process from '../atoms/Process'

export default function ModalTopContent() {
  return (
    <div>
      <Process />
      <div className="d-flex align-items-center justify-content-between p-3">
        {/* 아이콘과 텍스트 컨테이너 */}
        <div className="d-flex align-items-center">
          <div className="bg-black text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
            <NavigationArrow size={24} weight="fill" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <div className="ms-3">
            <h3 className="mb-1 fw-bold">모란역</h3>
            <p className="mb-1 fw-bold">경기 성남시 수정구 산성대로 100</p>
            <p className="mb-0 text-muted">2024년 6월 17일 20시 42분</p>
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
