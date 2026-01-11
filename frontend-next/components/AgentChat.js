import {useState, useRef} from 'react'

export default function AgentChat(){
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  async function sendMessage(e){
    e && e.preventDefault()
    const text = input.trim()
    if(!text) return
    const userMsg = {role:'user', text}
    setMessages(prev=>[...prev, userMsg])
    setInput('')
    setLoading(true)
    try{
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({message: text})
      })
      if(!res.ok){
        const err = await res.text()
        setMessages(prev=>[...prev, {role:'agent', text:'(error) '+err}])
      } else {
        // try parse JSON response
        const j = await res.json()
        const reply = j.reply || j.message || JSON.stringify(j)
        setMessages(prev=>[...prev, {role:'agent', text: reply}])
      }
    }catch(err){
      setMessages(prev=>[...prev, {role:'agent', text: '(network error) '+err.message}])
    } finally {
      setLoading(false)
      // scroll
      setTimeout(()=>{ if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight }, 50)
    }
  }

  return (
    <div className="card">
      <div className="card-header"><h2>🤖 AI-CRM Agent</h2></div>
      <div style={{padding:'1rem', display:'flex', flexDirection:'column', gap: '0.75rem'}}>
        <div ref={listRef} style={{maxHeight: '40vh', overflowY:'auto', padding:'0.5rem', background:'rgba(255,255,255,0.02)', borderRadius:6}}>
          {messages.length===0 && <div style={{color:'#94a3b8'}}>เริ่มการสนทนาได้เลย</div>}
          {messages.map((m,i)=> (
            <div key={i} style={{marginBottom:8}}>
              <div style={{fontSize:12, color:'#94a3b8'}}>{m.role}</div>
              <div style={{padding:'0.5rem', background: m.role==='user' ? 'rgba(99,102,241,0.1)' : 'rgba(16,185,129,0.06)', borderRadius:6}}>{m.text}</div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} style={{display:'flex', gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="พิมพ์ข้อความถึง AI-CRM..." style={{flex:1, padding:'0.5rem', borderRadius:6, border:'1px solid rgba(255,255,255,0.04)'}}/>
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading? 'กำลัง...' : 'ส่ง'}</button>
        </form>
      </div>
    </div>
  )
}
