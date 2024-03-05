// html for the User-Chat
popup.innerHTML =`
<div class="login-popup">
<div class="login-popup-block">
    <div class="login-header-block">
        <a href="#" class="login-link-blue">Login</a>
        <a href="#" class="register-link-white">Register</a>
        <div class="close-icon-login"><img src="https://uploads-ssl.webflow.com/648c200555e9a75ff846c555/6493e9a7c32a3c2b9fa3d716_x-symbol-svgrepo.svg" loading="lazy"/></div>
    </div>

    <div class="form-block w-form">
        <form id="login-form" name="login-form" data-name="login Form" method="POST" class="form">
            <label for="email" class="field-label">E-Mail</label>
            <input type="email" class="text-field w-input" maxlength="256" name="email" data-name="email" placeholder="" id="email" required="" />
            <label for="password" class="field-label">Password</label>
            <input type="password" class="text-field w-input" maxlength="256" name="password" data-name="password" placeholder="" id="password" required="" />
            <label class="w-checkbox checkbox-field">
                <input type="checkbox" id="save-Password" name="save-Password" data-name="Save Password" class="w-checkbox-input" />
                <span class="checkbox-label w-form-label" for="save-Password">Save Password</span>
            </label>
            
            <div class="captcha"></div>

            <input type="submit" value="Sign in" data-wait="Please wait..." class="signin-check-data w-button" />
            <label for="" class="field-label-password-reset">reset Password</label>
        </form>
    </div>

    <div class="login-alternativ-block">
        <div class="alternativ-headerblock">
            <div class="text-block-1">alternativ Methods</div>
        </div>
        <div class="alternativ-login-block"><a href="#" class="button-login-steam w-button">sign in Steam</a><a
            href="#" class="button-login-google w-button">Sign in Google</a></div>
        </div>
    </div>
</div>`


document.addEventListener('DOMContentLoaded', () => {
    const loginClosePopup = document.querySelector('.close-icon-login');
    const registerClosePopup = document.querySelector('.close-icon-register');

    const registerSwitch = document.querySelector('.register-link-white');
    const loginSwitch = document.querySelector('.login-link-white');


    const loginPopup = document.querySelector('.login-popup');
    const registerPopup = document.querySelector('.register-popup');
    const navLoginButton = document.querySelector('.log-reg-button');

    navLoginButton.addEventListener('click', () => {
        togglePopup(loginPopup, true);
    });
    
    loginClosePopup.addEventListener('click', () => {
        togglePopup(loginPopup, false);
        togglePopup(registerPopup, false);
    });

    registerClosePopup.addEventListener('click', () => {
        togglePopup(loginPopup, false);
        togglePopup(registerPopup, false);
    });
    registerSwitch.addEventListener('click', () => {
        togglePopup(loginPopup, false);
        togglePopup(registerPopup, true);
    });
    loginSwitch.addEventListener('click', () => {
        togglePopup(loginPopup, true);
        togglePopup(registerPopup, false);
    });

    // Funktion zum Anzeigen/Ausblenden des Popups
    function togglePopup(popup, show) {
        popup.style.display = show ? 'block' : 'none';
    }

//LOGIN Script//
const loginForm = document.getElementById('login-form'); // ID deines Login-Formulars

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Email:", email);
    console.log("Password:", password);

    // ... der restliche Code hier
});


loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            console.log("Login erfolgreich!");
            // Hier könntest du eine Aktion ausführen, wenn der Login erfolgreich ist
        } else {
            console.error("Login fehlgeschlagen.");
            // Hier könntest du eine Aktion ausführen, wenn der Login fehlgeschlagen ist
        }
    } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
    }
});
});

