import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function ModalBallonList({ show, handleClose, balloons }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>목록 보기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {balloons.map((balloon) => (
            <li key={balloon.id}>
              {balloon.id} - {balloon.processing_state}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
