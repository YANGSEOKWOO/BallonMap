import { useState, useEffect } from 'react'
import { Badge } from 'react-bootstrap'
import { CheckCircle, Warning } from '@phosphor-icons/react'
import { convertCoordinatesToAddress } from '../../utils/kakaomap'
import { formatDate } from '../../utils/convert'

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

  const StatusBar = ({ isCleaned }) => {
    const badgeStyle = {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: isCleaned ? '#CBE9FF' : '#FFF2B1',
      color: isCleaned ? '#258CE6' : '#FAB002',
    }

    return (
      <>
        {isCleaned ? (
          <div style={badgeStyle}>
            <CheckCircle color="#258CE6" weight="fill" />
            <p className="mb-0 ms-2" style={{ marginBottom: 0, marginLeft: '0.5rem' }}>
              처리 완료
            </p>
          </div>
        ) : (
          <div style={badgeStyle}>
            <Warning color="#FAB002" weight="fill" />
            <p className="mb-0 ms-2" style={{ marginBottom: 0, marginLeft: '0.5rem' }}>
              처리 전
            </p>
          </div>
        )}
      </>
    )
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
        >
          <span className="fw-bold">현황 확인하기</span>
        </button>
      </div>
    </div>
  )
}
