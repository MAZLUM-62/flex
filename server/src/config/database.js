import mysql from 'mysql2';
//Create a Database Connection

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'flex'
})

con.connect((err) => {
    if(err)
    {
        console.log(err)
    }else{
        console.log("CONNECTION SUCCESSFUL!")
    }
})

// Fügen Sie die Registrierungsfunktion hinzu
export const registerUser = async (username, email, password) => {
    try {
        // Hashe das Passwort
        const hashedPassword = await bcrypt.hash(password, 10);

        // Füge den neuen Nutzer zur Datenbank hinzu
        const sql = 'INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)';
        await con.promise().execute(sql, [username, email, hashedPassword]);

        return { success: true, message: 'Registrierung erfolgreich.' };
    } catch (error) {
        console.error('Fehler bei der Registrierung:', error);
        return { success: false, message: 'Registrierung fehlgeschlagen. Bitte versuche es erneut.' };
    }
};



export default con;
