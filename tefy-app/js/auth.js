let isLoggedIn = false;

function login() {
  isLoggedIn = true;
  alert("Login สำเร็จ");
  show("home");
  updateStatus();
}

function updateStatus() {
  const status = document.getElementById("userStatus");
  status.innerText = isLoggedIn
    ? "👤 เข้าสู่ระบบแล้ว"
    : "ยังไม่ได้ Login";
}