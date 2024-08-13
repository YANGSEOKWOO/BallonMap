import { Siren } from '@phosphor-icons/react'

export default function Process() {
  return (
    <div
      className="badge d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#CBE9FF', padding: '0.2rem', maxWidth: '140px', borderRadius: '20px', boxShadow: ' 5px 5px 3px #666' }}
    >
      <Siren color="#258CE6" size={24} weight="fill" className="me-1" />
      <p className="m-0" style={{ color: '#258CE6', fontSize: '1.2rem' }}>
        처리완료
      </p>
    </div>
  )
}
