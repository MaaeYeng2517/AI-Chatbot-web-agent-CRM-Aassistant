import Header from './Header'

export default function Layout({children}){
  return (
    <div className="container">
      <Header />
      <main className="main-content">{children}</main>
      <footer className="footer">ผู้ช่วยจัดการ AI Chatbot Web Agent - CRM</footer>
    </div>
  )
}
