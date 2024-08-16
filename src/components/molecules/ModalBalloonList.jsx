import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Badge } from 'react-bootstrap'
import BalloonListItem from '../atoms/BalloonListItem'
import './css/ModalBalloonList.css' // 확장자 ".css" 포함

export default function ModalBalloonList({ show, handleClose, balloons, onballoonClick }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>목록 보기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container d-flex justify-content-start align-items-center my-3 gap-2">
          <h5 className="m-0">현재 발견된 오물풍선 목록</h5>
          <Badge bg="danger">{balloons.length}</Badge>
        </div>
        <div className="overflow-scroll">
          {balloons.map((balloon) => (
            <div key={balloon.id} onClick={() => onballoonClick(balloon.latitude, balloon.longitude)} style={{ cursor: 'pointer' }}>
              <BalloonListItem data={balloon} />
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
