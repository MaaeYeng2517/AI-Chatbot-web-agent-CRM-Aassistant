import Link from 'next/link'
import {useEffect, useState} from 'react'

export default function Header(){
  const [statusText, setStatusText] = useState('กำลังตรวจสอบ...')
  useEffect(()=>{
    // simple health check to backend
    fetch('/api/').then(r=>r.json()).then(j=>{
      if(j && j.status) setStatusText('พร้อมใช้งาน')
    }).catch(()=>setStatusText('ออฟไลน์'))
  },[])

  return (
    <header className="header">
      <div className="header-content">
        <h1>🤖 ผู้ช่วยจัดการลูกค้า AI CRM</h1>
        <p>ระบบจัดการสัมพันธ์ลูกค้าที่ใช้ปัญญาประดิษฐ์</p>
      </div>
      <div className="status" id="status">
        <span className="status-dot" id="statusDot"></span>
        <span id="statusText">{statusText}</span>
      </div>

      <nav className="navbar">
        <div className="nav-wrapper">
          <Link href="/" className="nav-link">🏠 หน้าแรก</Link>
          <Link href="/solution" className="nav-link">💡 โซลูชั่น</Link>
          <Link href="/product" className="nav-link">📦 สินค้า</Link>
          <Link href="/membership" className="nav-link">🔐 สมัครสมาชิก</Link>
          <Link href="/agent" className="nav-link">🤖 AI-CRM</Link>
          <Link href="/learning" className="nav-link">📚 เรียนรู้</Link>
          <Link href="/contact" className="nav-link">📞 ติดต่อ</Link>
        </div>
      </nav>
    </header>
  )
}
