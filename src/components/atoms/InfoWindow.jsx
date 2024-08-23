import { useState, useEffect } from 'react'
import { convertCoordinatesToAddress } from '../../utils/kakaomap'
import { formatDate } from '../../utils/convert'
import ModalInfo from '../molecules/ModalInfo'
import StatusBar from './StatusBar'

/**
 * 특정 풍선에 대한 인포윈도우
 *
 * @param {boolean} isCleaned 청소됐는지 여부
 * @param {number} lat 위도
 * @param {number} lng 경도
 * @param {string} id 세부 풍선 데이터
 * @returns 인포윈도우
 */
export default function InfoWindow({ isCleaned, lat, lng, id, time }) {
  const [address, setAddress] = useState('') // 주소 상태 초기화
  const [showModal, setShowModal] = useState(false) // 모달의 열림/닫힘 상태
  useEffect(() => {
    async function fetchAddress() {
      try {
        const result = await convertCoordinatesToAddress(lat, lng)
        setAddress(result) // 변환된 주소를 상태로 저장
      } catch (error) {
        console.error(error)
        setAddress('주소를 찾을 수 없습니다.') // 주소 변환 실패 시 처리
      }
    }

    fetchAddress()
  }, []) // lat, lng가 변경될 때마다 호출
  const handleOpenModal = (id) => {
    setShowModal(true) // 모달 열기
  }

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="info-container" style={{ padding: '10px', backgroundColor: '#fff', borderRadius: '10px', zIndex: 100 }}>
      <div className="custom-badge d-flex">
        <StatusBar isCleaned={isCleaned} />
      </div>
      <div className="bottom-container d-flex gap-2 align-items-end">
        <div className="text-container d-flex flex-column">
          <span className="fw-bold">{address}</span>
          <span className="text-body-tertiary">{formatDate(time)}</span>
        </div>
        <button
          className="btn"
          type="button"
          style={{
            backgroundColor: '#CBE9FF',
            color: '#258CE6',
            height: '2rem',
            width: '100%', // 버튼의 너비를 100%로 설정하여 중앙 정렬
            display: 'flex',
            justifyContent: 'center', // 가로 가운데 정렬
            alignItems: 'center', // 세로 가운데 정렬
          }}
          onClick={() => handleOpenModal(id)}
        >
          <span className="fw-bold">현황 확인하기</span>
        </button>
      </div>
      {/* InfoModal 컴포넌트 호출 */}
      <ModalInfo show={showModal} onClose={handleCloseModal} id={id} />
    </div>
  )
}
