/* =========================================================
   ClearPath Automation Console — local login gate
   ---------------------------------------------------------
   IMPORTANT — read this:
   This is a LIGHT, LOCAL-ONLY lock. It only stops someone
   from casually opening these files on THIS computer.
   It is NOT real security. If you ever put these files on
   a public web server, this password check is not enough —
   come back and we'll build real server-side login first.
   ========================================================= */

// STEP 1: Change this to your own password.
// Just replace the text between the quotes. Save the file.
const APP_PASSWORD = "changeme123";

const SESSION_KEY = "cpac_session";
const SESSION_HOURS = 12; // how long you stay logged in before it asks again

function cpacIsLoggedIn() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    return data.expires > Date.now();
  } catch (e) {
    return false;
  }
}

function cpacLogin(password) {
  if (password === APP_PASSWORD) {
    const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ expires }));
    return true;
  }
  return false;
}

function cpacLogout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

// Call this at the very top of every protected page.
// It sends you back to login.html if you're not signed in.
function cpacGuardPage() {
  if (!cpacIsLoggedIn()) {
    window.location.href = "login.html";
  }
}
