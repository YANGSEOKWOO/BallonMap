import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function ReportModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>제보하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 제보 폼이나 내용을 여기에 추가 */}
        <p>여기에서 제보 내용을 작성하세요.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleClose}>
          제보하기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
