import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BellRinging, Envelope, Balloon } from '@phosphor-icons/react'
import BalloonListItem from '../atoms/BalloonListItem'
import './css/Sidebar.css'
import { Badge } from 'react-bootstrap'

const Sidebar = ({ balloons, onballoonClick }) => {
  const [isConfirmed, setIsConfirmed] = useState(false)

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
            <form>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  오물풍선 발견 위치를 작성해주세요!
                </label>
                <input type="text" className="form-control" id="location" placeholder="이곳에 작성해주세요!" />
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">
                  오물풍선 발견 시각을 작성해주세요!
                </label>
                <input type="text" className="form-control" id="time" placeholder="이곳에 작성해주세요!" />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  오물풍선 사진이 있다면 첨부해주세요! 감사합니다 🥰
                </label>
                <input type="file" className="form-control" id="image" />
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
    </>
  )
}

export default Sidebar
