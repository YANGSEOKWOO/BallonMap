import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BellRinging, Envelope, Balloon } from '@phosphor-icons/react'
import BallonListItem from '../atoms/BallonListItem'
import './css/Sidebar.css'
// TODO :: 아이콘 이제 누를때마다 보이는 화면 다르게 + 색깔처리 + 클릭표시
const Sidebar = () => {
  return (
    <>
      <div className="sidebar rounded-end text-bg-light" style={{ width: '60px', height: '100%', position: 'fixed', top: 0, zIndex: 1000 }}>
        <div className="logo d-flex justify-content-center align-items-center my-3 mx-2">
          <Balloon size={40} weight="fill" alt="logo" />
        </div>
        <div className="side-bar-menu ">
          <div className="side-bar-menu-ballon-list border-top d-flex justify-content-center align-items-center">
            <BellRinging id="bell" className="my-3 mx-2" size={32} weight="fill" alt="목록보기" data-bs-toggle="offcanvas" data-bs-target="#ballon_list" />
          </div>
          <div className="side-bar-menu-report border-top border-bottom d-flex justify-content-center align-items-center">
            <Envelope id="report" className="my-3 mx-2" size={32} weight="fill" alt="제보하기" />
          </div>
        </div>
      </div>
      <div className="ballon-list">
        <div className="offcanvas offcanvas-start border rounded-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="ballon_list" style={{ marginLeft: '60px', zIndex: 900 }}>
          <div className="offcanvas-header border-bottom" style={{ height: '72px' }}>
            <h5 className="offcanvas-title " id="#ballon_list">
              BallonMap
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <h5>현재 발견된 오물풍선 목록</h5>
            <BallonListItem />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
