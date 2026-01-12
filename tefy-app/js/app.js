let starCount = 0;

function show(page) {
  ["home", "article", "login", "wallet"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
  document.getElementById(page).classList.remove("hidden");
}

function openArticle() { show("article"); }
function goHome() { show("home"); updateStatus(); }
function openLogin() { show("login"); }

function giveStar(amount) {
  if (!isLoggedIn) {
    alert("กรุณา Login ก่อน");
    openLogin();
    return;
  }

  if (!useCoin(amount)) return;

  starCount += amount;
  document.getElementById("stars").innerText = starCount;
  alert("ขอบคุณสำหรับการสนับสนุน ⭐");

}