import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ModalTopContent from '../molecules/ModalTopContent'
import ModalBottomContent from '../molecules/ModalBottomContent'
import './css/MarkerModal.css'

export default function MarkerModal({ show, handleClose, markerData }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton className="border-0 pb-0"></Modal.Header>
        <Modal.Body>
          <ModalTopContent />
          <ModalBottomContent />
        </Modal.Body>
      </Modal>
    </>
  )
}
