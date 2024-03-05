const choices = ["rock", "paper", "scissors"];
let isGameRunning = false; // Initialer Zustand: Spiel läuft nicht
let coins = parseInt(document.getElementById("coins").textContent, 10); // Wert aus dem Element lesen

function computerChoiceAnimation(userChoice, betAmount) {
    if (isGameRunning) {
        return;
    }
    
    if (betAmount > coins) {
        alert("You don't have enough coins!");
        return;
    }

    isGameRunning = true;

    const userIcon = `<img class="rps-icons" src="../src/assets/${userChoice}.png" alt="${userChoice}">`;
    document.getElementById("user-choice").innerHTML = userIcon;

    let currentIndex = 0;
    const interval = setInterval(() => {
        const computerIcon = `<img class="rps-icons" src="../src/assets/${choices[currentIndex]}.png" alt="${choices[currentIndex]}">`;
        document.getElementById("computer-choice").innerHTML = computerIcon;

        currentIndex = (currentIndex + 1) % choices.length;
    }, 300);

    setTimeout(() => {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * 3);
        const computer = choices[randomIndex];
        
        const computerIcon = `<img class="rps-icons" src="../src/assets/${computer}.png" alt="${computer}">`;
        document.getElementById("computer-choice").innerHTML = computerIcon;

        const result = determineWinner(userChoice, computer);
        document.getElementById("result").textContent = result;

        if (result === "You win!") {
            coins += betAmount;
        } else if (result === "Computer wins!") {
            coins -= betAmount;
        }

        document.getElementById("coins").textContent = coins;
        
        isGameRunning = false;
    }, 2000);
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

const choiceButtons = document.querySelectorAll(".choice");

choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (isGameRunning) {
            return;
        }

        const betAmount = parseInt(document.getElementById("bet-amount").value);

        if (isNaN(betAmount) || betAmount <= 0 || betAmount > coins) {
            alert("Invalid bet amount!");
            return;
        }

        choiceButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");

        document.getElementById("result").textContent = "";
        document.getElementById("user-choice").innerHTML = "";
        document.getElementById("computer-choice").innerHTML = "Computer is choosing...";

        const userChoice = button.id;
        computerChoiceAnimation(userChoice, betAmount);
    });
});
