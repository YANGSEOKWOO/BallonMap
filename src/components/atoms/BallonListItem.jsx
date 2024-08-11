import React from 'react'
// import PropTypes from 'prop-types'
// import detection_image from '../../assets/ballon_img'
import detectionBallon from '../../assets/ballon_img.png'
import processingBallon from '../../assets/ballon_clean_img.png'
import { SecurityCamera, Siren } from '@phosphor-icons/react'
// import _image from '../../assets/ballon_img'
// import { format } from 'date-fns'

const BallonListItem = ({ datt }) => {
  const data = {
    id: 1,
    address: '광주 북구 용봉동 77 인근',
    detection_image: '../../assets/ballon_img.png',
    detection_time: '2024-08-04T17:20:00Z',
    processing_image: '../../assets/ballon_clean_img.png',
    processing_time: '2024-08-04T17:20:00Z',
    processing_state: '완료',
    description: '없음',
  }
  return (
    // Detection 부분
    <div className="ballon-list-item border rounded p-3 mb-3" style={{ backgroundColor: '#f8f9fa', width: '90%', margin: 'auto' }}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="detect-container">
          <div className="badge text-dark me-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#FFF2B1', maxWidth: '80px' }}>
            <SecurityCamera color="#FAB002" size={28} weight="fill" className="me-1" />
            <p className="h5 m-0" style={{ color: '#FAB002' }}>
              발견
            </p>
          </div>
          <div className="fw-bold" style={{ fontSize: '1.2rem' }}>
            {data.address}
          </div>
          <div className="text-muted">{(new Date(data.detection_time), 'yyyy년 M월 d일 H시 mm분')}</div>
        </div>
        <img src={detectionBallon} alt="Detection" className="img-fluid rounded mb-3" style={{ maxHeight: '150px', minHeight: '80px' }} />
      </div>
      {/* Processing 부분 */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="processing-content d-flex flex-column">
          <div className="badge d-flex align-items-center justify-content-center" style={{ backgroundColor: '#CBE9FF', padding: '0.5rem', maxWidth: '120px' }}>
            <Siren color="#255BE6" size={28} weight="fill" className="me-1" />
            <p className="m-0" style={{ color: '#255BE6', fontSize: '1.2rem' }}>
              처리완료
            </p>
          </div>
          <div className="text-muted">{(new Date(data.processing_time), 'yyyy년 M월 d일 H시 mm분')}</div>
          <div className="fw-bold">특이사항 : {data.description || '없음'}</div>
        </div>
        <img src={processingBallon} alt="Processing" className="img-fluid rounded mb-3" style={{ maxHeight: '150px', minHeight: '80px' }} />
      </div>
    </div>
  )
}

// BallonListItem.propTypes = {
//   data: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     address: PropTypes.string.isRequired,
//     detection_image: PropTypes.string.isRequired,
//     detection_time: PropTypes.string.isRequired,
//     processing_image: PropTypes.string.isRequired,
//     processing_time: PropTypes.string.isRequired,
//     processing_state: PropTypes.string.isRequired,
//     description: PropTypes.string,
//   }).isRequired,
// }

export default BallonListItem
