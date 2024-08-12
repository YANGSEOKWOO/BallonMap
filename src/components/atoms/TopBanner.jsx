import { Balloon } from '@phosphor-icons/react'
import { Badge } from 'react-bootstrap'

export default function TopBanner() {
  return (
    <Badge bg="dark" className="d-flex align-items-center justify-content-center gap-2">
      <Balloon size={32} />
      <p className="h5 m-0">Ballon Map</p>
    </Badge>
  )
}
