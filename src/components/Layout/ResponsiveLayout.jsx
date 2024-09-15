import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import DesktopScreen from '../templates/DesktopScreen'
import MobileScreen from '../templates/MobileScreen'
import { getballoonListData } from '../../apis'
import Spinner from '../atoms/Spinner'

const ResponsiveLayout = ({ children }) => {
  const [data, setData] = useState(null) // 풍선 데이터를 저장할 상태
  const [loading, setLoading] = useState(true) // 로딩 상태
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

  const Desktop = ({ balloons }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 })
    return isDesktop && <DesktopScreen balloons={balloons}></DesktopScreen>
  }

  const Mobile = ({ balloons }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile && <MobileScreen balloons={balloons}></MobileScreen>
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {/* {error && <div style={{ color: 'red' }}>Error: {error}</div>}  */}
      {loading && <Spinner />} {/* 로딩 중일 때 스피너를 화면에 표시 */}
      {/* BE 연동 */}
      <Desktop balloons={data?.balloons || []} />
      <Mobile balloons={data?.balloons || []} />
      {/* 목업 데이터 */}
      {/* <Desktop balloons={data || []} />
      <Mobile balloons={data || []} /> */}
    </div>
  )
}

export default ResponsiveLayout
