// html for the User-Chat
userchat.innerHTML =`
<div class="username" id="username" >   </div>
    <main class="container" >
       <div class="container-arrow-img-open">  
       <img id="arrow-img-o class="arrow-img-o" src="../src/assets/arrow.png">  
       </div>
        <div class="container-arrow-img-close">
        <img id="arrow-img" class="arrow-img" src="../src/assets/arrow.png">
        </div>


      <div class="main-chat" id="main-chat">
        <div class="messages" id="messages" ></div>
        <form class="input_container" id="form">
          <input class="input" id="input" placeholder="send message" />
          <button class="btn" type="submit" >Send</button>
        </form>
    </div>
`

const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

/*const userName = prompt("Enter Your Name Please.");*/
const userName = "User";


socket.emit("user:join", userName);

socket.on("global:messages", (user) => {
    messages.innerHTML += `
    <p class="join_messages" >${user}</p>
    `;
});


socket.on("messages:receive", (payload) => {
	messages.innerHTML += `          
    <div class="receive_messages_container" >
        <p class="receiver_name" >${payload.name}</p>
        <p class="sent_messages" >${payload.messages}</p>
    </div>
    `;
});

form.addEventListener("submit", (e) => {
	e.preventDefault();

	messages.innerHTML += `
    <div class="sent_messages_container" >
        <p class="your_name" >${userName}</p>
        <p class="sent_messages" >${input.value}</p>
    </div>
    `;
	socket.emit("messages:send", { name: userName, messages: input.value });
	input.value = "";
});


// Finde das Bild-Element
const arrowImg = document.querySelector('.container-arrow-img-close');

// Finde das Bild-Element
const arrowImgopen = document.querySelector('.container-arrow-img-open');

// Finde den Chat-Bereich
const chatMain = document.getElementById('main-chat');

// Füge einen Klick-Eventlistener zum Bild hinzu
arrowImg.addEventListener('click', () => {
  chatMain.style.display = 'none';
  arrowImg.style.display ='none';
  arrowImgopen.style.display ='flex';
});

arrowImgopen.addEventListener('click', () => {
    chatMain.style.display = 'flex';
    arrowImg.style.display ='flex';
    arrowImgopen.style.display ='none';
});

