import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function MarkerModal({ show, handleClose, markerData }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Marker Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {markerData ? (
            <>
              <p>ID: {markerData.id}</p>
              <p>Latitude: {markerData.lat}</p>
              <p>Longitude: {markerData.lng}</p>
              <p>Processing State: {markerData.isCleaned ? '처리 완료' : '처리 중'}</p>
            </>
          ) : (
            <p>No marker data available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
