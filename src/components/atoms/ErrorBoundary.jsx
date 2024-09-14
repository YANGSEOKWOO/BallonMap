import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 에러가 발생하면 상태를 업데이트하여 에러 페이지를 렌더링하게 함
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로그를 서버로 보낼 수 있는 부분
    console.error('Error caught by ErrorBoundary: ', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생하면 사용자에게 보여줄 UI
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>Sorry, an unexpected error has occurred. Please try again later.</p>
        </div>
      )
    }

    // 에러가 없으면 자식 컴포넌트를 렌더링
    return this.props.children
  }
}

export default ErrorBoundary
