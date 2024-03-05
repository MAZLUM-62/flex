const socket = io();

document.addEventListener('DOMContentLoaded', function() {
   
    // Darstellung von der Roulette Animation
    initWheel();
    // Darstellung von der Wettliste und Button Animation
    listofBets();

    // Hier empfängst du das Ergebnis vom Server und steuerst die Animation
    socket.on('result', (data) => {
      const outcome = data.result;
      // Führe die Animation mit dem Ergebnis aus
      spinWheel(outcome);
    });
  

    getLast100Summary();
    getCountdown();
    letUserBet();
});

function getLast100Summary(){
  socket.on('last100Summary', ({ black, green, red }) => {
    const summaryElement = document.getElementById('last100Summary');
    summaryElement.textContent = `Last 100 Rolls: ${black}x black, ${green}x green, ${red}x red`;
});
}

function getCountdown(){
  socket.on('countdown', (data) => {
    const countdownElement = document.getElementById('countdown'); // Füge ein HTML-Element mit dieser ID hinzu
    countdownElement.textContent = `Nächste Runde in ${data.timeLeft / 1000} Sekunden`;
});
}

function letUserBet(){
  const username = 'user';
    //Wettlisten Funktion 

    document.getElementById('blackBtn').addEventListener('click', () => {
      socket.emit('colorSelected', { color: 'black', username });
    });
  
    document.getElementById('greenBtn').addEventListener('click', () => {
      socket.emit('colorSelected', { color: 'green', username });
    });
  
    document.getElementById('redBtn').addEventListener('click', () => {
      socket.emit('colorSelected', { color: 'red', username });
    });
  
    socket.on('blackUsers', (username) => {
      const ul = document.getElementById('blackUsers');
      const li = document.createElement('li');
      li.textContent = username;
      ul.appendChild(li);
    });
  
    socket.on('greenUsers', (username) => {
      const ul = document.getElementById('greenUsers');
      const li = document.createElement('li');
      li.textContent = username;
      ul.appendChild(li);
    });
  
    socket.on('redUsers', (username) => {
      const ul = document.getElementById('redUsers');
      const li = document.createElement('li');
      li.textContent = username;
      ul.appendChild(li);
    });
}

function initWheel() {
  const wheel = document.querySelector('.roulette-wrapper .wheel');
  let row = '';

 /* row += '<div class="row">';
  row += '  <div class="card red">1</div>';
  row += '  <div class="card black">14</div>';
  row += '  <div class="card red">2</div>';
  row += '  <div class="card black">13</div>';
  row += '  <div class="card red">3</div>';
  row += '  <div class="card black">12</div>';
  row += '  <div class="card red">4</div>';
  row += '  <div class="card green">0</div>';
  row += '  <div class="card black">11</div>';
  row += '  <div class="card red">5</div>';
  row += '  <div class="card black">10</div>';
  row += '  <div class="card red">6</div>';
  row += '  <div class="card black">9</div>';
  row += '  <div class="card red">7</div>';
  row += '  <div class="card black">8</div>';
  row += '</div>';
*/

  row += '<div class="row">';
  row += '  <div class="card red"></div>';
  row += '  <div class="card black"></div>';
  row += '  <div class="card red"></div>';
  row += '  <div class="card black"></div>';
  row += '  <div class="card red"></div>';
  row += '  <div class="card black"></div>';
  row += '  <div class="card red"></div>';
  row += '  <div class="card green"></div>';
  row += '  <div class="card black"></div>';
  row += '  <div class="card red"></div>';
  row += '  <div class="card black"></div>';
  row += '  <div class="card red"></div>';
  row += '  <div class="card black"></div>';
  row += '  <div class="card red"></div>';
  row += '  <div class="card black"></div>';
  row += '</div>';

  for (let x = 0; x < 29; x++) {
    wheel.innerHTML += row;
  }
}

function spinWheel(roll) {
  const wheel = document.querySelector('.roulette-wrapper .wheel');
  const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];
  const position = order.indexOf(roll);

  // Determine position where to land
  const rows = 12;
  const card = 75 + 3 * 2;
  const landingPosition = rows * 15 * card + position * card;

  const randomize = Math.floor(Math.random() * 75) - 75 / 2;

  const object = {
    x: Math.floor(Math.random() * 50) / 100,
    y: Math.floor(Math.random() * 20) / 100,
  };

  wheel.style.transitionTimingFunction = `cubic-bezier(0, ${object.x}, ${object.y}, 1)`;
  wheel.style.transitionDuration = '6s';
  wheel.style.transform = `translate3d(-${landingPosition}px, 0px, 0px)`;

  setTimeout(function() {
    wheel.style.transitionTimingFunction = '';
    wheel.style.transitionDuration = '';

    const resetTo = -(position * card + randomize);
    wheel.style.transform = `translate3d(${resetTo}px, 0px, 0px)`;
  }, 6 * 1000);
}


function listofBets(){
  const list = document.querySelector('.totalBets');
}


// Section für Black, Red und Green bet
/*function blackBetstotal{
 totalBlackbets = []
 playerlist = []

 function um spieler zu zeigen mit ihrer wette und das nach wettmenge gelistet {

 }

 funktion to check{
  prüft wer gewonnen hat und wer verloren hat
 }
 
 funtkion by lose{
  totalbets gehen in die haus kasse
 }

 function by win {
  total bets die aus der kasse des hauses gehen
 }

}

*/

// function für das dokumentieren der Sieger und Verlierer