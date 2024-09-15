import React from 'react'

const Spinner = () => {
  return (
    <div style={spinnerStyle}>
      <div style={spinnerInnerStyle}></div>
    </div>
  )
}

const spinnerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 999,
}

const spinnerInnerStyle = {
  width: '50px',
  height: '50px',
  border: '5px solid lightgray',
  borderTop: '5px solid blue',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
}

// keyframes를 정의하여 애니메이션을 추가
const styles = document.createElement('style')
styles.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
document.head.appendChild(styles)

export default Spinner
