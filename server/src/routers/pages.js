import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import session from 'express-session'; // Importieren Sie express-session
import { registerUser } from "../controllers/registerController.js"; 
import { loginUser } from "../controllers/loginController.js"; 
import generateHeader from "../controllers/headerController.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();




// Session-Konfiguration
router.use(session({
  secret: 'dasdsfkasldfkoefwl2304ß20öksofasof,032dsf', // Ändern Sie dies zu einem sicheren geheimen Schlüssel
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 300000, // Lebensdauer der Session in Millisekunden (5 Minuten)
  },
}));

router.get("/", (req, res) => {
  const indexPath = path.join(__dirname,  "..", "..", "..", "client", "public", "index.html");
  res.sendFile(indexPath);
});

router.get('/a', (req, res) => {
  // Überprüfen, ob der Benutzer eingeloggt ist
  const username = req.session.user ? req.session.user.username : null;

  // Generieren Sie das Header-HTML basierend auf dem Benutzerstatus
  const headerHTML = generateHeader(username);

  // Senden Sie das Header-HTML an den Client
  res.send(headerHTML);
});


router.get("/rps", (req, res) => {
  const rpsPath = path.join(__dirname,  "..",  "..", "..", "client", "public", "rps.html");
  res.sendFile(rpsPath);
});

router.get("/pvp/ttt", (req, res) => {
  const tttSocket = path.join(__dirname,  "..",  "..", "..", "client", "public", "ttt-pvp.html");
  res.sendFile(tttSocket);
});

router.get("/roulette", (req, res) => {
  const roulettePath = path.join(__dirname,  "..",  "..", "..", "client", "public", "roulette.html");
  res.sendFile(roulettePath);
});

// Verwenden Sie den body-parser
router.use(bodyParser.urlencoded({ extended: true })); 

router.get("/register", (req, res) => {
  const reigsterPath = path.join(__dirname,  "..",  "..", "..", "client", "public", "register.html");
  res.sendFile(reigsterPath);
});

router.post("/register", async (req, res) => {
  const { username, email, password, passwordconfirm, agb } = req.body;

  try {
    // Führe deine Registrierungslogik aus
    const registrationResult = await registerUser(username, email, password, passwordconfirm, agb);

    // Hier kannst du je nach `registrationResult` entscheiden, welche Rückmeldung an den Client gesendet wird
    if (registrationResult.success) {
      res.send("Registrierung erfolgreich!");
    } else {
      res.status(400).send("Registrierung fehlgeschlagen.");
    }
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
    res.status(500).send("Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.");
  }
});

router.get("/login", (req, res) => {
  const reigsterPath = path.join(__dirname,  "..",  "..", "..", "client", "public", "login.html");
  res.sendFile(reigsterPath);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hier rufst du die Login-Funktion auf
    const loginResult = await loginUser(username, password);

    if (loginResult.success) {
      // Session-Daten setzen
      req.session.user = { username }; // Hier können Sie zusätzliche Benutzerdaten speichern

      res.redirect("/dashboard");
    } else {
      res.status(400).json({ error: "Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldeinformationen." });
    }
  } catch (error) {
    console.error("Fehler beim Einloggen:", error);
    res.status(500).json({ error: "Einloggen fehlgeschlagen. Bitte versuchen Sie es erneut." });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Fehler beim Ausloggen:", err);
      res.status(500).send("Fehler beim Ausloggen. Bitte versuchen Sie es erneut.");
    } else {
      res.json("Logout!");
    }
  });
});

router.get('/dashboard', (req, res) => {
  // Überprüfen, ob der Benutzer eingeloggt ist
  if (req.session.user) {
    res.send(`Willkommen im Dashboard, ${req.session.user.username}!`);
  } else {
    res.redirect("/login");
  }
});

export default router;