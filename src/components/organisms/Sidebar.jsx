import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BellRinging, Envelope, Balloon } from '@phosphor-icons/react'
import BalloonListItem from '../atoms/BalloonListItem'
import './css/Sidebar.css'
import { Badge } from 'react-bootstrap'
import ModalLocation from '../molecules/ModalLocation'
import { convertCoordinatesToAddress } from '../../utils/kakaomap'
import dayjs from 'dayjs'

const Sidebar = ({ balloons, onballoonClick }) => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('') // 선택된 위치 저장
  const [detectionTime, setDetectionTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss')) // 기본값을 현재 시간으로 설정
  const [imagePreview, setImagePreview] = useState(null) // 미리보기 이미지 상태
  const [imageError, setImageError] = useState(null) // 이미지 형식 오류 상태
  const [image, setImage] = useState(null) // 업로드된 이미지 파일

  const handleCheckboxChange = (e) => {
    setIsConfirmed(e.target.checked)
  }

  const handleballoonListClick = (event) => {
    event.stopPropagation() // 이벤트 버블링 방지
    // 오프캔버스를 여는 로직
  }

  const handleReportClick = (event) => {
    event.stopPropagation()
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
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result) // 미리보기 이미지 상태 업데이트
        }
        reader.readAsDataURL(file) // 파일 읽기
      } else {
        setImageError('JPG 또는 PNG 형식의 파일만 업로드 가능합니다.') // 오류 메시지 설정
        setImagePreview(null) // 미리보기 제거
      }
    }
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // 선택된 위도와 경도를 분리하여 추출 (위도, 경도는 콤마로 구분된 문자열로 가정)
    const [latitude, longitude] = selectedLocation.replace('위도: ', '').replace(' 경도: ', '').split(',')

    try {
      // postBallonData 호출
      await postBallonData({
        latitude: parseFloat(latitude.trim()), // 위도
        longitude: parseFloat(longitude.trim()), // 경도
        detection_time: detectionTime, // 발견 시각
        detection_image: image, // 이미지 파일
      })
      alert('제보가 성공적으로 전송되었습니다!')
    } catch (error) {
      alert('제보 전송에 실패했습니다.')
    }
  }

  return (
    <>
      {/* 사이드바 */}
      <div className="sidebar rounded-end text-bg-light" style={{ width: '60px', height: '100%', position: 'fixed', top: 0, zIndex: 1000 }}>
        <div className="logo d-flex justify-content-center align-items-center my-3 mx-2">
          <Balloon size={40} weight="fill" alt="logo" />
        </div>
        <div className="side-bar-menu">
          <div className="side-bar-menu-balloon-list border-top d-flex justify-content-center align-items-center">
            <BellRinging id="bell" className="my-3 mx-2" size={32} weight="fill" alt="목록보기" data-bs-toggle="offcanvas" data-bs-target="#balloon_list" onClick={handleballoonListClick} />
            <Badge
              bg="danger"
              style={{
                position: 'absolute',
                right: '5px',
                top: '82px',
              }}
            >
              {balloons.length}
            </Badge>
          </div>
          <div className="side-bar-menu-report border-top border-bottom d-flex justify-content-center align-items-center">
            <Envelope id="report" className="my-3 mx-2" size={32} weight="fill" alt="제보하기" data-bs-toggle="offcanvas" data-bs-target="#report_modal" onClick={handleReportClick} />
          </div>
        </div>
      </div>

      {/* 풍선 목록 오프캔버스 */}
      <div className="balloon-list">
        <div className="offcanvas offcanvas-start border rounded-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="balloon_list" style={{ marginLeft: '60px', zIndex: 900 }}>
          <div className="offcanvas-header border-bottom" style={{ height: '72px' }}>
            <h5 className="offcanvas-title" id="#balloon_list">
              balloonMap
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#balloon_list"></button>
          </div>
          <div className="offcanvas-body">
            <div className="container d-flex justify-content-start align-items-center mb-3 gap-2">
              <h5 className="m-0">현재 발견된 오물풍선 목록</h5>
              <Badge bg="danger">{balloons.length}</Badge>
            </div>
            {balloons.map((balloon) => (
              <div key={balloon.id} onClick={() => onballoonClick(balloon.latitude, balloon.longitude)} style={{ cursor: 'pointer' }}>
                <BalloonListItem data={balloon} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 제보하기 오프캔버스 */}
      <div className="report-modal">
        <div className="offcanvas offcanvas-start border rounded-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="report_modal" style={{ marginLeft: '60px', zIndex: 900 }}>
          <div className="offcanvas-header border-bottom" style={{ height: '72px' }}>
            <h5 className="offcanvas-title" id="report_modal">
              제보하기
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#report_modal"></button>
          </div>
          <div className="offcanvas-body">
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
                {/* 미리보기 이미지 */}
                {imagePreview && (
                  <div className="mb-3 d-flex justify-content-center align-items-center">
                    <img src={imagePreview} alt="미리보기" style={{ height: '200px', width: 'auto' }} />
                  </div>
                )}
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
              <button type="button" className="btn btn-light text-danger ms-2" data-bs-dismiss="offcanvas" data-bs-target="#report_modal">
                취소
              </button>
            </form>
          </div>
        </div>
      </div>
      <ModalLocation show={showLocationModal} onClose={handleLocationCloseModal} onPositionSelect={handlePositionSelect} />
    </>
  )
}

export default Sidebar
