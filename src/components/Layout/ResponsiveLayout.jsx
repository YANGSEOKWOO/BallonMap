import { useMediaQuery } from 'react-responsive'

import DesktopLayout from './DesktopLayout'
import MobileLayout from './MobileLayout'
import { getBallonListData } from '../../apis'

const ResponsiveLayout = ({ children }) => {
  const Desktop = ({ ballons }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 })

    return isDesktop && <DesktopLayout ballons={ballons}>{children}</DesktopLayout>
  }

  const Mobile = ({ ballons }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })

    return isMobile && <MobileLayout ballons={ballons}>{children}</MobileLayout>
  }

  const data = getBallonListData()

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Desktop ballons={data} />
      <Mobile ballons={data} />
    </div>
  )
}

export default ResponsiveLayout
