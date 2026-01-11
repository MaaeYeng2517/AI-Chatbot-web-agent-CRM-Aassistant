let coin = 50; // เหรียญเริ่มต้น

function openWallet() {
  if (!isLoggedIn) {
    alert("กรุณา Login ก่อน");
    openLogin();
    return;
  }
  show("wallet");
  updateCoin();
}

function addCoin(amount) {
  coin += amount;
  updateCoin();
  alert("เพิ่มเหรียญแล้ว (ตัวอย่าง)");
}

function useCoin(amount) {
  if (coin < amount) {
    alert("เหรียญไม่พอ");
    return false;
  }
  coin -= amount;
  updateCoin();
  return true;
}

function updateCoin() {
  document.getElementById("coinBalance").innerText = coin;
}
