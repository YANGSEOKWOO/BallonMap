import { CheckCircle, Warning } from '@phosphor-icons/react'

const StatusBar = ({ isCleaned }) => {
  const badgeStyle = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: isCleaned ? '#CBE9FF' : '#FFF2B1',
    color: isCleaned ? '#258CE6' : '#FAB002',
  }

  return (
    <>
      {isCleaned ? (
        <div style={badgeStyle}>
          <CheckCircle color="#258CE6" weight="fill" />
          <p className="mb-0 ms-2" style={{ marginBottom: 0, marginLeft: '0.5rem' }}>
            처리 완료
          </p>
        </div>
      ) : (
        <div style={badgeStyle}>
          <Warning color="#FAB002" weight="fill" />
          <p className="mb-0 ms-2" style={{ marginBottom: 0, marginLeft: '0.5rem' }}>
            처리 전
          </p>
        </div>
      )}
    </>
  )
}

export default StatusBar
