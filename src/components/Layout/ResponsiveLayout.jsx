import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import DesktopScreen from '../templates/DesktopScreen'
import MobileScreen from '../templates/MobileScreen'
import Spinner from '../atoms/Spinner'
import { getballoonListData } from '../../apis'
import { useLocation } from '../../context/LocationContext'

const ResponsiveLayout = () => {
  const { location, loading: locationLoading } = useLocation()
  const isDesktop = useMediaQuery({ minWidth: 768 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const [data, setData] = useState(null) // 풍선 데이터를 저장할 상태
  const [loading, setLoading] = useState(true) // 데이터 로딩 상태
  const [error, setError] = useState(null) // 오류 상태

  useEffect(() => {
    const fetchData = async () => {
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
      {isDesktop && <DesktopScreen balloons={data?.balloons || []} initialLocation={location} />}
      {isMobile && <MobileScreen balloons={data?.balloons || []} initialLocation={location} />}
    </div>
  )
}

export default ResponsiveLayout
