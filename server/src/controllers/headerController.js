//headerController.js

export function generateHeader(username) {
    if (username) {
      return `
        <nav>
            <a class="logo" href="/">CS2</a>
            
            <!-- Restlicher HTML-Code für das Menü -->
  
            <div class="log-reg-button" id="log-reg-button">
              <span>Willkommen, ${username}!</span>
              <a href="/logout" class="navbar-signin-button" id="navbar-signin-button">Logout</a>
            </div>
        </nav>
      `;
    } else {
      return `
        <nav>
            <a class="logo" href="/">CS2</a>
            
            <!-- Restlicher HTML-Code für das Menü -->
  
            <div class="log-reg-button" id="log-reg-button">
              <a href="/login" class="navbar-signin-button" id="navbar-signin-button">Sign In</a>
            </div>
        </nav>
      `;
    }
  }
  
export default generateHeader;
  