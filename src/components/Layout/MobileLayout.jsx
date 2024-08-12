import React from 'react'
// import MobileSideBar from 'components/Sidebar/MobileSidebar';
// import MobileNavbar from 'components/Navbar/MobileNavbar';
// import COLOR from 'constants/color.constant';

const MobileLayout = ({ ballons, props }) => {
  console.log('ballons:', ballons)
  return (
    <div
      style={{
        backgroundColor: 'blue',
        width: '100%',
      }}
    >
      모바일
      {/* <MobileNavbar /> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '1170px',
          margin: 'auto',
          marginTop: '4rem',
          height: '100%',
        }}
      >
        {/* <MobileSideBar /> */}
        <div>{props.children}</div>
      </div>
    </div>
  )
}

export default MobileLayout
