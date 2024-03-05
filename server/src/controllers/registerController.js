import bcrypt from "bcrypt";
import con from "../config/database.js"; // Importieren Sie Ihre Datenbankverbindung


export const registerUser = async (username, email, password, passwordconfirm, agb) => {
    try {
        // Überprüfen Sie, ob das Passwort und die Passwortbestätigung übereinstimmen
        if (password !== passwordconfirm) {
            throw new Error("Passwort und Passwortbestätigung stimmen nicht überein.");
        }

        // Überprüfen Sie, ob die AGB akzeptiert wurden
        if (!agb) {
            throw new Error("Bitte akzeptieren Sie die AGB.");
        }

        // Überprüfen Sie, ob der Benutzername oder die E-Mail bereits existieren
        const existingUser = await con.promise().execute('SELECT * FROM accounts WHERE username = ? OR email = ?', [username, email]);
        if (existingUser[0].length > 0) {
            throw new Error("Benutzername oder E-Mail existieren bereits.");
        }

        // Hashen Sie das Passwort, bevor Sie es speichern
        const hashedPassword = await bcrypt.hash(password, 10);

        // Fügen Sie den neuen Benutzer zur Datenbank hinzu
        const insertSql = 'INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)';
        await con.promise().execute(insertSql, [username, email, hashedPassword]);

        return { success: true, message: "Registrierung erfolgreich." };
    } catch (error) {
        console.error("Fehler bei der Registrierung:", error);
        return { success: false, message: "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut." };
    }
};

export default registerUser;
