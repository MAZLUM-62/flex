Schnellstart
Folge diesen Schritten, um das Projekt zu starten:

Übungsprojekt!

1. Initialisierung
Führe die folgenden Befehle im Terminal aus:

bash
Copy code
#1: npm init --yes
#2: npm i socket.io express
#3: npm i --save-dev nodemon
Falls der Befehl in Schritt #3 nicht funktioniert, versuche es mit:

bash
Copy code
npm install nodemon --save-dev
2. Konfiguration
Öffne Visual Studio Code (VS Code) und ändere die package.json-Datei:

json
Copy code
{
  "main": "server.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "type": "module"
}
Zusätzlicher Tipp (Bonus): Um die Konsole zu leeren, verwende cls.

bash
Copy code
cls # Clear Console
3. Datenbank-Anbindung
Installiere MySQL und das dazugehörige Modul:

bash
Copy code
#5: npm install mysql
#6: npm i mysql2 --save
#7: npm install ajax

Hinweise
Stelle sicher, dass Node.js und npm auf deinem System installiert sind.
Überprüfe die Installationsanweisungen für MySQL, um eine reibungslose Datenbankanbindung sicherzustellen.
Dieses Projekt verwendet die Module Socket.io und Express für die Serverkommunikation.
Das Datenbankmodul MySQL2 wird für die Anbindung an die Datenbank benötigt.
Beachte, dass Ajax für die Vereinfachung der Datenbankoperationen verwendet wird.
