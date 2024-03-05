
import bcrypt from "bcrypt";
import con from "../config/database.js";

export const loginUser = async (username, password) => {
    try {
        // Überprüfen Sie, ob der Benutzer existiert
        const [rows] = await con.promise().execute('SELECT * FROM accounts WHERE username = ?', [username]);
        if (rows.length === 0) {
            throw new Error("Benutzer nicht gefunden.");
        }

        // Überprüfen Sie das eingegebene Passwort mit dem gespeicherten Passwort
        const user = rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Falsches Passwort.");
        }

        // Erfolgreich eingeloggt
        return { success: true, message: "Login erfolgreich.", user };
    } catch (error) {
        console.error("Fehler beim Einloggen:", error);
        return { success: false, message: "Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldeinformationen." };
    }
};

export default loginUser;