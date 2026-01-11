import {useState, useEffect} from 'react'
import {postJson, getJson} from '../lib/api'

export default function Membership(){
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null)
  const [members, setMembers] = useState([])

  useEffect(()=>{ if(token) fetchMembers(token) }, [token])

  async function handleSignup(e){
    e.preventDefault()
    setMessage('กำลังสมัคร...')
    try{
      const res = await postJson('/api/signup', {name: signupName, email: signupEmail, password: signupPassword})
      if(res.ok){ setMessage('สมัครเรียบร้อยแล้ว — กรุณาเข้าสู่ระบบ')
        setSignupName(''); setSignupEmail(''); setSignupPassword('')
      } else { const j=await res.json(); setMessage(j.detail || 'สมัครไม่สำเร็จ') }
    }catch(err){ setMessage('ไม่สามารถติดต่อเซิร์ฟเวอร์') }
  }

  async function handleLogin(e){
    e.preventDefault()
    setMessage('กำลังเข้าสู่ระบบ...')
    try{
      const res = await postJson('/api/login', {email: loginEmail, password: loginPassword})
      if(res.ok){ const j = await res.json(); const t = j.token; localStorage.setItem('auth_token', t); setToken(t); setMessage('เข้าสู่ระบบสำเร็จ'); setLoginEmail(''); setLoginPassword('') }
      else { const j = await res.json(); setMessage(j.detail || 'เข้าสู่ระบบไม่สำเร็จ') }
    }catch(err){ setMessage('ไม่สามารถติดต่อเซิร์ฟเวอร์') }
  }

  async function fetchMembers(t){
    try{
      const res = await getJson('/api/members', t)
      if(res.ok){ const j = await res.json(); setMembers(j || []) }
      else setMembers([])
    }catch(e){ setMembers([]) }
  }

  function handleLogout(){ localStorage.removeItem('auth_token'); setToken(null); setMembers([]); setMessage('ออกจากระบบแล้ว') }

  return (
    <div className="card">
      <div className="card-header">
        <h2>🔐 สมัครสมาชิก / เข้าสู่ระบบ</h2>
      </div>
      <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:'1rem', padding:'1rem'}}>
        <div>
          <h3>ลงทะเบียน</h3>
          <form onSubmit={handleSignup}>
            <div className="form-group"><label>ชื่อ</label><input value={signupName} onChange={e=>setSignupName(e.target.value)} required /></div>
            <div className="form-group"><label>อีเมล</label><input type="email" value={signupEmail} onChange={e=>setSignupEmail(e.target.value)} required /></div>
            <div className="form-group"><label>รหัสผ่าน</label><input type="password" value={signupPassword} onChange={e=>setSignupPassword(e.target.value)} required /></div>
            <button className="btn btn-primary" type="submit">สมัคร</button>
          </form>
        </div>

        <div>
          <h3>เข้าสู่ระบบ</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group"><label>อีเมล</label><input type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} required /></div>
            <div className="form-group"><label>รหัสผ่าน</label><input type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} required /></div>
            <button className="btn btn-primary" type="submit">เข้าสู่ระบบ</button>
          </form>
        </div>
      </div>

      <div style={{padding:'1rem'}}>
        {message && <div style={{marginBottom: '1rem', color:'#f59e0b'}}>{message}</div>}

        {token ? (
          <div>
            <div style={{marginBottom:'0.5rem'}}>คุณเข้าสู่ระบบแล้ว</div>
            <button className="btn" onClick={handleLogout}>ออกจากระบบ</button>
            <h3 style={{marginTop:'1rem'}}>สมาชิกที่ลงทะเบียน</h3>
            <ul>
              {members.map(m=> <li key={m.id}>{m.name} — {m.email}</li>)}
            </ul>
          </div>
        ) : (
          <div style={{color:'#94a3b8'}}>ยังไม่ได้เข้าสู่ระบบ</div>
        )}
      </div>
    </div>
  )
}
