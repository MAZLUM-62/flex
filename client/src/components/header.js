header.innerHTML =`
<nav>
    <a class="logo" href="/">CS2</a>
    
    <input type="checkbox" id="toggle_button">
    <label for="toggle_button" class="toggle_button">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </label>
    <ul>
        <li class="expandable_li">
        <input type="checkbox" id="games_checkbox">
            <label for="games_checkbox" class="link" >Games ⇩</label>
            <ul class="dropdown">
                <li><a href="/rps">Rock Paper Sicssor</a></li>
                
                <li><a href="/roulette">Roulette</a></li>
                <li><a href="/case">(Closed)Case</a></li>
                <li><a href="/dice">(Closed)Dice</a></li>
                <li><a href="/crash">(Closed)Crash</a></li>
                <li><a href="/upgrade">(Closed)Upgrade</a></li>
                <li><a href="/esport">(Closed)E-Sport</a></li>
            </ul>
        </li>    

        <li class="expandable_li">
        <input type="checkbox" id="products_checkbox">
            <label for="products_checkbox" class="link" >PVP ⇩</label>
            <ul class="dropdown">
                <li><a href="/pvp/rps">(Closed)Rock Paper Scissor</a></li>
                <li><a href="/pvp/ttt">Tic Tac To</a></li>
                <li><a href="/pvp/case">(Closed)Case</a></li>
                <li><a href="/pvp/roulette">(Closed)Roulette</a></li>
                <li><a href="/pvp/dice">(Closed)Dice</a></li>
            </ul>
        </li>
        <li><a href="/rewards">Rewards</a></li>
        <li><a href="/free2play">Free2Play</a></li>
        <li class="sign-in-mobile"><a href="#">Sign In</a></li>

    </ul>

    <div class="log-reg-button id="log-reg-button">
    <a href="#" class="navbar-signin-button" id="navbar-signin-button">Sign In</a>    
    </div>
</nav>
`


