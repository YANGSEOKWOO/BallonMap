import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ModalLocation from './ModalLocation'
import dayjs from 'dayjs'
import { convertCoordinatesToAddress } from '../../utils/kakaomap'
import { postBalloonData } from '../../apis'

export default function ReportModal({ show, handleClose }) {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('') // 선택된 위치 저장
  const [detectionTime, setDetectionTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss')) // 기본값을 현재 시간으로 설정
  const [imagePreview, setImagePreview] = useState(null) // 미리보기 이미지 상태
  const [imageError, setImageError] = useState(null) // 이미지 형식 오류 상태
  const [image, setImage] = useState(null) // 업로드된 이미지 파일
  const [location, setLocation] = useState({ latitude: '', longitude: '' })

  const handleCheckboxChange = (e) => {
    setIsConfirmed(e.target.checked)
  }

  const handleLocationOpenModal = () => {
    setShowLocationModal(true)
  }
  const handleLocationCloseModal = () => {
    setShowLocationModal(false)
  }

  const handlePositionSelect = async (position) => {
    const address = await convertCoordinatesToAddress(position.lat, position.lng)
    setSelectedLocation(address)
    setLocation({
      latitude: position.lat,
      longitude: position.lng,
    })
  }

  const handleTimeChange = (e) => {
    setDetectionTime(e.target.value)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0] // 첫 번째 파일 선택
    if (file) {
      const fileType = file.type
      // 파일 형식 검사 (jpg, png만 허용)
      if (fileType === 'image/jpeg' || fileType === 'image/png') {
        setImageError(null) // 오류 상태 초기화
        setImage(file) // 선택된 파일을 상태로 저장
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result) // 미리보기 이미지 상태 업데이트
        }
        reader.readAsDataURL(file) // 파일 읽기
      } else {
        setImageError('JPG 또는 PNG 형식의 파일만 업로드 가능합니다.') // 오류 메시지 설정
        setImagePreview(null) // 미리보기 제거
        setImage(null) // 잘못된 파일이므로 이미지 상태 초기화
      }
    }
  }

  const handleFormSubmit = async (e) => {
    console.log('data 보내기')
    e.preventDefault()

    try {
      // postBallonData 호출
      await postBalloonData({
        latitude: location.latitude, // 위도
        longitude: location.longitude, // 경도
        detection_time: detectionTime, // 발견 시각
        detection_image: image, // 이미지 파일
      })
      alert('제보가 성공적으로 전송되었습니다!')
    } catch (error) {
      console.error(error)
      alert('제보 전송에 실패했습니다.')
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="badge text-dark me-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#FFF2B1' }}>
            <p className="h5 m-0" style={{ color: '#FAB002' }}>
              오물풍선 위치 제보하기
            </p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              오물풍선 발견 위치를 작성해주세요!
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={selectedLocation} // 선택된 위치를 여기에 표시
              placeholder="이곳에 작성해주세요!"
              onClick={handleLocationOpenModal}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              오물풍선 발견 시각을 작성해주세요!
            </label>
            <input
              type="text"
              className="form-control"
              id="time"
              value={detectionTime} // 상태에서 관리하는 시간을 표시
              onChange={handleTimeChange} // 시간을 수정 가능하게
            />
          </div>
          {/* 이미지 업로드 필드 */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              오물풍선 사진이 있다면 첨부해주세요! 감사합니다 🥰
            </label>
            {/* 미리보기 이미지 공간 */}
            <div className="mb-3 d-flex justify-content-center align-items-center" style={{ height: '200px', width: 'auto', border: '1px solid #ccc', backgroundColor: '#f8f8f8' }}>
              {imagePreview ? <img src={imagePreview} alt="미리보기" style={{ height: '100%', width: 'auto' }} /> : <p className="text-muted">사진을 업로드해주세요.</p>}
            </div>
            <input
              type="file"
              className="form-control"
              id="image"
              accept=".jpg,.jpeg,.png" // 허용할 파일 형식 제한
              onChange={handleImageChange} // 이미지 파일 변경 시 처리
            />
            {imageError && <p className="text-danger">{imageError}</p>} {/* 오류 메시지 */}
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="confirmation" onChange={handleCheckboxChange} />
            <label className="form-check-label" htmlFor="confirmation">
              위 내용을 충분히 인지하였으며, 작성한 내용을 제보합니다.
            </label>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!isConfirmed}>
            전송하기
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-light text-danger ms-2" onClick={handleClose}>
          취소
        </button>
      </Modal.Footer>
      <ModalLocation show={showLocationModal} onClose={handleLocationCloseModal} onPositionSelect={handlePositionSelect} />
    </Modal>
  )
}
