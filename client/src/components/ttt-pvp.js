const socket = io();

document.getElementById('createLobbyBtn').addEventListener('click', () => {
    socket.emit('createLobby', (lobbyId) => {
    });
});

socket.emit('getOpenLobbies');


socket.on('updateLobbies', (openLobbies, closedLobbies) => {
    const openlobbyList = document.getElementById('lobbyList-open');
    const closedLobbyList = document.getElementById('lobbyList-closed');
    openlobbyList.innerHTML = '';
    closedLobbyList.innerHTML = '';

    openLobbies.forEach((lobby, index) => {
        const lobbyCard = document.createElement('div');
        lobbyCard.classList.add('card');

        const lobbyInfo = document.createElement('div');
        lobbyInfo.classList.add('card-info');

        if (lobby.status === 'waiting') {
            const playerCount = lobby.players.length;
            const userID = socket.id;
            const lobbyId = lobby.id; // Hier holst du die Lobby-ID
            lobbyInfo.textContent = `Lobby ${lobbyId} (Spieler: ${playerCount} / 2) userID ${userID}`;

            const joinButton = document.createElement('button');
            joinButton.textContent = 'Beitreten';
            joinButton.addEventListener('click', () => {
                socket.emit('joinLobby', lobbyId);
            });

            lobbyCard.appendChild(lobbyInfo);
            lobbyCard.appendChild(joinButton);
            openlobbyList.appendChild(lobbyCard);
        }
    });

    closedLobbies.forEach((lobby, index) => {
        const closedInfo = document.createElement('div');
        closedInfo.textContent = `Lobby ${lobby.id} (Spieler: ${lobby.players.join(', ')})`;
        closedLobbyList.appendChild(closedInfo);
    });
});

