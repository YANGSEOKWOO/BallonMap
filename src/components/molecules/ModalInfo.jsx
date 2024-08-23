import { useEffect, useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap' // Spinner 컴포넌트 추가
import { getBallonData } from '../../apis'
import ModalTopContent from './ModalTopContent'
import Process from '../atoms/Process'
import StatusBar from '../atoms/StatusBar'
import { MobileModalBottomContent, WebModalBottomContent } from './ModalBottomContent'

/**
 * Modal 컴포넌트
 *
 * @param {boolean} show 모달 열림/닫힘 상태
 * @param {function} onClose 모달 닫기 함수
 * @param {string} id 풍선 ID
 */
export default function ModalInfo({ show, onClose, id }) {
  const [balloonData, setBalloonData] = useState(null) // 풍선 데이터를 저장할 상태
  const [isCleaned, setIsCleaned] = useState(null)
  const [loading, setLoading] = useState(true) // 로딩 상태
  const [error, setError] = useState(null) // 오류 상태

  // 모달이 열릴 때마다 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true) // 로딩 상태 시작
        const data = await getBallonData({ balloon_id: id })
        setBalloonData(data) // 데이터를 상태에 저장
        setLoading(false) // 로딩 상태 종료
        data.processing_state === '처리 완료' ? setIsCleaned(true) : setIsCleaned(false)
      } catch (err) {
        console.error('Error fetching balloon data:', err)
        setError('데이터를 불러오는데 실패했습니다.') // 오류 상태 저장
        setLoading(false)
      }
    }

    if (show && id) {
      // show가 true일 때만 데이터를 불러옴
      fetchData()
    }
  }, [show, id])

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {/* 로딩이 끝났을 때만 StatusBar를 보여줍니다 */}
          {!loading && <StatusBar isCleaned={isCleaned} />}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          // 로딩 중일 때는 Spinner를 보여줍니다
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : balloonData ? (
          <>
            {/* balloonData가 존재할 때만 ModalTopContent를 렌더링 */}
            <ModalTopContent
              isCleaned={isCleaned}
              lat={balloonData.latitude}
              lng={balloonData.longitude}
              time={balloonData.processing_time ? balloonData.processing_time : balloonData.detection_time}
              isMobile={true}
            />
            <MobileModalBottomContent
              isCleaned={isCleaned}
              detectImage={balloonData.detection_image}
              detectTime={balloonData.detection_time}
              processImage={balloonData.processing_image}
              processTime={balloonData.processing_time}
              description={balloonData.description}
            />
          </>
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </Modal.Body>

      {!loading && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}
