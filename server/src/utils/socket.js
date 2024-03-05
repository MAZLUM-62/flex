import con from '../config/database.js';

let user = [];

export const onSocket = (io) => {
	io.on("connection", (socket) => {
		
		console.log("User ID LOG", socket.id);
		socket.on("user:join", (name) => {
			!user.some((user) => user.name === name) &&
				user.push({ name, sockeId: socket.id });
			io.emit("global:messages", `${name} just joined !`);
		});

		socket.on("messages:send", (payload) => {
			insertmessagesToDatabase(payload.name, payload.messages);
			socket.broadcast.emit("messages:receive", payload);
		});

		socket.on("user:mute", ({ userId, muteDurationMinutes }) => {
			updateUserMuteStatus(userId, muteDurationMinutes);
		});

		/*socket.on("disconnect", () => {
			const user = user.filter((user) => user.sockeId === socket.id);
			io.emit("global:messages", `${user[0].name} just left !`);
		});*/
	});
};

export function insertmessagesToDatabase(name, message) {
	const sql = "INSERT INTO messages (user_name, message) VALUES (?, ?)";
	const values = [name, message];
	con.query(sql, values, (err, result) => {
	if (err) {
		console.error('Fehler beim Einfügen der Nachricht in die Datenbank:', err);
	} else {
		console.log('Nachricht erfolgreich in die Datenbank eingefügt.');
	}
	});
}

export function updateUserMuteStatus(userId, muteDurationMinutes) {
	const muteEndTime = new Date(Date.now() + muteDurationMinutes * 60000);
	const sql = "UPDATE messages SET user_status = 'muted', mute_start_time = NOW(), mute_duration = ? WHERE user_id = ?";
	const values = [muteDurationMinutes, userId];
	con.query(sql, values, (err, result) => {
	if (err) {
		console.error('Fehler beim Aktualisieren des Benutzer-Mute-Status:', err);
	} else {
		console.log('Benutzer erfolgreich gemutet.');
		setTimeout(() => {
		updateUserStatus(userId, 'active'); // Benutzerstatus nach Ablauf der Mute-Dauer auf 'active' aktualisieren
		}, muteDurationMinutes * 60000);
	}
	});
}

export function updateUserStatus(userId, userStatus) {
	const sql = "UPDATE messages SET user_status = ? WHERE user_id = ?";
	const values = [userStatus, userId];
	con.query(sql, values, (err, result) => {
	if (err) {
		console.error('Fehler beim Aktualisieren des Benutzer-Status:', err);
	} else {
		console.log('Benutzerstatus erfolgreich aktualisiert.');
	}
	});
}

export default onSocket;
