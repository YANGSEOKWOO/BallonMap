export default function Detect() {
  return (
    <div className="badge text-dark me-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#FFF2B1', maxWidth: '80px' }}>
      <SecurityCamera color="#FAB002" size={28} weight="fill" className="me-1" />
      <p className="h5 m-0" style={{ color: '#FAB002' }}>
        발견
      </p>
    </div>
  )
}
