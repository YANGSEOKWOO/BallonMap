import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import SelectMap from '../atoms/SelectMap'

export default function ModalLocation({ show, onClose, onPositionSelect }) {
  const [selectedPosition, setSelectedPosition] = useState(null) // 선택된 위치 저장

  const handlePositionChange = (position) => {
    setSelectedPosition(position) // 지도에서 선택된 좌표 업데이트
  }

  const handlePositionSelect = () => {
    if (selectedPosition) {
      onPositionSelect(selectedPosition) // 선택된 위치를 부모로 전달
    }
    onClose() // 모달 닫기
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>위치 선택</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* SelectMap에서 위치가 변경되면 handlePositionChange 실행 */}
        <SelectMap onPositionChange={handlePositionChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handlePositionSelect}>
          위치 선택 완료
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
