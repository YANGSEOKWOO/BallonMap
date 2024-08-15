import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ModalTopContent from '../molecules/ModalTopContent'
import ModalBottomContent from '../molecules/ModalBottomContent'
import './css/MarkerModal.css'

export default function MarkerModal({ show, handleClose, markerData }) {
  if (!markerData) {
    return null
  }
  console.log('markerData:', markerData)
  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton className="border-0 pb-0"></Modal.Header>
        <Modal.Body className="modal-body-padding">
          <ModalTopContent isCleaned={markerData.isCleaned} lat={markerData.lat} lng={markerData.lng} time={markerData.processingTime ? markerData.processingTime : markerData.detectionTime} />
          <ModalBottomContent
            isCleaned={markerData.isCleaned}
            detectImage={markerData.detectionImage}
            detectTime={markerData.detectionTime}
            processImage={markerData.processingImage}
            processTime={markerData.processingTime}
            description={markerData.description}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
