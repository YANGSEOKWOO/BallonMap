import { useMediaQuery } from 'react-responsive'

import DesktopScreen from '../templates/DesktopScreen'
import MobileScreen from '../templates/MobileScreen'
import { getballoonListData } from '../../apis'

const ResponsiveLayout = ({ children }) => {
  const Desktop = ({ balloons }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 })

    return isDesktop && <DesktopScreen balloons={balloons}>{children}</DesktopScreen>
  }

  const Mobile = ({ balloons }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })

    return isMobile && <MobileScreen balloons={balloons}>{children}</MobileScreen>
  }

  const data = getballoonListData()

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Desktop balloons={data} />
      <Mobile balloons={data} />
    </div>
  )
}

export default ResponsiveLayout
