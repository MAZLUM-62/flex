registerpopup.innerHTML =`
<div class="register-popup">
<div class="register-popup-block">
    <div class="register-header-block">
        <a href="#"class="login-link-white">Login</a>    
        <a href="#" class="register-link-blue">Register</a>
        <div class="close-icon-register"><img src="https://uploads-ssl.webflow.com/648c200555e9a75ff846c555/6493e9a7c32a3c2b9fa3d716_x-symbol-svgrepo.svg" loading="lazy" /></div>
    </div>
    
    <div class="form-block w-form">
        <form id="register-form" name="register-form" data-name="register Form" method="get" class="form">
        
            <label for="username" class="field-label">Username</label>
            <input type="text" class="text-field w-input" maxlength="256" name="username" data-name="username" placeholder="" id="username" />
            <label for="email" class="field-label">E-Mail</label>
            <input type="email" class="text-field w-input" maxlength="256" name="email" data-name="email" placeholder="" id="email" required="" />
            <label for="password" class="field-label">Password</label>
            <input type="password" class="text-field w-input" maxlength="256" name="password" data-name="password" placeholder="" id="password" required="" />
            <label for="passwordconfirm" class="field-label">Confirm Password</label>
            <input type="password" class="text-field w-input" maxlength="256" name="passwordconfirm" data-name="passwordconfirm" placeholder="" id="passwordconfirm" required="" />
            
                <label class="w-checkbox checkbox-field">
                <input type="checkbox" id="agb" name="agb" data-name="agb" required="" class="w-checkbox-input" />
                    <span class="checkbox-label w-form-label" for="agb">AGB</span>
                </label>
            
            <div class="captcha"> </div>
            <input type="submit" value="Sign in" data-wait="Please wait..." class="signin-check-data w-button" />
        </form>

    </div>
    <div class="register-alternativ-block">
        <div class="alternativ-headerblock">
            <div class="text-block-1">alternativ Methods</div>
        </div>
        <div class="alternativ-login-block"><a href="#" class="button-login-steam w-button">sign in Steam</a><a
                href="#" class="button-login-google w-button">Sign in Google</a></div>
    </div>
</div>
</div>
`

