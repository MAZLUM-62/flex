const openLobbies = [];
const closedLobbies = [];

const MAX_LOBBY_CREATION_LIMIT = 5; // Maximale Anzahl von Lobbys, die ein Benutzer erstellen kann
const userLobbyCounts = {}; // Ein Objekt zur Verfolgung der von jedem Benutzer erstellten Lobbys

const lobbyStatus = {
    WAITING: 'waiting',
    RUNNING: 'running',
    CLOSED: 'closed',
};
  
export const tttpvpSocket = (io) => {
    
  io.on("connection", (socket) => {
        // Sende die offenen Lobbys an den neuen Benutzer, sobald er sich verbindet
        socket.on('getRunningLobbies', () => {
          io.emit('updateLobbies', openLobbies, closedLobbies);
        });

        // Lobby Erstellen mit einer Random ID
        socket.on('createLobby', () => {
          const userId = socket.id;
          
          // Überprüfe, ob der Benutzer bereits in der Benutzer-Lobby-Zählung ist
          if (!(userId in userLobbyCounts)) {
              userLobbyCounts[userId] = 0;
          }
      
          // Überprüfe, ob der Benutzer die maximale Anzahl von Lobbys erreicht hat
          if (userLobbyCounts[userId] < MAX_LOBBY_CREATION_LIMIT) {
              const lobby = {
                  id: generateLobbyId(),
                  creator: userId,
                  status: lobbyStatus.WAITING,
                  players: [userId],
                  lastActivity: Date.now(),
              };
              openLobbies.push(lobby);
              socket.emit('lobbyCreated', lobby.id, lobbyStatus);
              io.emit('updateLobbies', openLobbies, closedLobbies);
      
              // Erhöhe die Anzahl der vom Benutzer erstellten Lobbys um 1
              userLobbyCounts[userId]++;
          } else {
              // Der Benutzer hat das Lobby-Erstellungslimit erreicht, sende eine Benachrichtigung
              socket.emit('lobbyCreationLimitReached');
         }
        });

    
        socket.on('joinLobby', (lobbyId) => {
            const lobby = openLobbies.find((lobby) => lobby.id === lobbyId);
          
            if (lobby && lobby.status === lobbyStatus.WAITING && lobby.players.length < 2) {
              // Überprüfe, ob der Spieler bereits in der Lobby ist, bevor du ihn hinzufügst
              if (!lobby.players.includes(socket.id)) {
                lobby.players.push(socket.id);
          
                if (lobby.players.length === 2) {
                  lobby.status = lobbyStatus.RUNNING;
                  startGame(io, lobby);
                }
          
                io.emit('updateLobbies', openLobbies, closedLobbies);
              }
            }
        });
    });
};

function generateLobbyId() {
    const length = 6; // Die Länge der Lobby-ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Zeichen, aus denen die ID erstellt wird
    let lobbyId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        lobbyId += characters.charAt(randomIndex);
    }

    return lobbyId;
}


function startGame(io, lobby) {
    io.to(lobby.players[0]).emit('startGame', { player: 'X' });
    io.to(lobby.players[1]).emit('startGame', { player: 'O' });

    lobby.status = 'running';
    closedLobbies.push(lobby);
}

export default tttpvpSocket;
