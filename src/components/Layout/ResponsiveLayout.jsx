import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import DesktopScreen from '../templates/DesktopScreen'
import MobileScreen from '../templates/MobileScreen'
import Spinner from '../atoms/Spinner'
import { getballoonListData, triggerFCM } from '../../apis'
import { useLocation } from '../../context/LocationContext'

const ResponsiveLayout = () => {
  const { location, loading: locationLoading, setLocation } = useLocation()
  const isDesktop = useMediaQuery({ minWidth: 768 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const [data, setData] = useState(null) // 풍선 데이터를 저장할 상태
  const [loading, setLoading] = useState(true) // 데이터 로딩 상태
  const [error, setError] = useState(null) // 오류 상태

  const fetchData = async () => {
    setLoading(true) // 데이터 불러오기 시작 시 로딩 상태로 설정
    try {
      const balloonData = await getballoonListData()
      console.log('ballonData:', balloonData)
      setData(balloonData) // 받아온 데이터 저장
    } catch (err) {
      setError(err.message) // 오류 발생 시 오류 상태에 저장
    } finally {
      setLoading(false) // 데이터 불러오기가 끝나면 로딩 상태 해제
    }
  }

  // 테스트용 데이터
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        console.log('App is in the foreground')
        // 포그라운드로 전환될 때 데이터 다시 불러오기
        fetchData()
        // await triggerFCM()
        // TODO::
        // setLocation({ lat: 35.17128593803895, lng: 126.92323224018912 }) // 예: 서울의 위경도
        console.log('location설정:', location)
      } else {
        // await triggerFCM()
        console.log('App is in the background')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 클린업 함수로 이벤트 리스너 제거
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
  // useEffect(() => {
  //   const handleVisibilityChange = async () => {
  //     if (document.visibilityState === 'visible') {
  //       console.log('App is in the foreground')
  //       // 포그라운드로 전환될 때 데이터 다시 불러오기
  //       fetchData()
  //       await triggerFCM()
  //     } else {
  //       console.log('App is in the background')
  //     }
  //   }

  //   document.addEventListener('visibilitychange', handleVisibilityChange)

  //   // 클린업 함수로 이벤트 리스너 제거
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange)
  //   }
  // }, [])

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 데이터를 한 번 불러오기
    fetchData()
  }, [])

  if (locationLoading || loading) {
    return <Spinner /> // 위치나 데이터 로딩 중일 때 스피너 표시
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div> // 오류 발생 시 오류 메시지 표시
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {isDesktop && <DesktopScreen balloons={data || []} initialLocation={location} />}
      {isMobile && <MobileScreen balloons={data || []} initialLocation={location} />}
    </div>
  )
}

export default ResponsiveLayout
