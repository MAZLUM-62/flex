import con from '../config/database.js';
import RouletteModel from '../models/rouletteModel.js';

const COLORS = {
  BLACK: 'black',
  GREEN: 'green',
  RED: 'red',
};

export const rouletteController = (io) => {
  let last100Results = [];

  io.on('connection', (socket) => {
    let currentRound = new RouletteModel(
      null,
      null,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    );

    socket.emit('currentRound', currentRound);

    // Letzten 100 Farben nach jeder Runde aktualisieren
    last100Summary();

    socket.on('colorSelected', (data) => {
      console.log(`User ${data.username} selected ${data.color}.`);
      io.emit(`${data.color}Users`, data.username);
    });
  });

  async function startRouletteRound() {
    const result = generateRouletteResult();
    const color = getRouletteNumberColor(result);

    const roundData = new RouletteModel(
      result,
      color,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    );

    await insertRoundData(roundData);

    io.emit('result', { result, color });

    setTimeout(() => {
      last100Summary();
    }, 6000);

    startCountdown();
  }

  async function last100Summary() {
    try {
      const query = `
        SELECT RolledColor
        FROM RouletteGame
        ORDER BY GameDate DESC
        LIMIT 100;
      `;

      const [rows] = await con.promise().query(query);

      const last100ColorsFromDB = rows.map((result) => result.RolledColor);
      last100Results = last100ColorsFromDB;

      const black = blackCount();
      const green = greenCount();
      const red = redCount();

      io.emit('last100Summary', { black, green, red });
      io.emit('last100Results', last100ColorsFromDB);
    } catch (err) {
      console.error('Fehler beim Abrufen der letzten 100 Runden:', err);
    }
  }

  function startCountdown() {
    let countdown = 20000;
    const countdownInterval = setInterval(() => {
      io.emit('countdown', { timeLeft: countdown });

      if (countdown === 0) {
        clearInterval(countdownInterval);
        startRouletteRound();
      }

      countdown -= 100;
    }, 100);
  }

  function generateRouletteResult() {
    return Math.floor(Math.random() * 15);
  }

  function getRouletteNumberColor(number) {
    if (number === 0) {
      return COLORS.GREEN;
    } else if (number >= 1 && number <= 7) {
      return COLORS.RED;
    } else {
      return COLORS.BLACK;
    }
  }

  async function insertRoundData(roundData) {
    const {
      result,
      color,
      BetsOnRed,
      BetsOnBlack,
      BetsOnGreen,
      TotalBets,
      TotalBetsOnRed,
      TotalBetsOnBlack,
      TotalBetsOnGreen,
      ParticipantsCount,
      GameDate,
      Winnings,
      HouseProfit,
    } = roundData;

    const insertQuery = `
      INSERT INTO roulettegame (RolledColor, BetsOnRed, BetsOnBlack, BetsOnGreen, TotalBets, TotalBetsOnRed, TotalBetsOnBlack, TotalBetsOnGreen, ParticipantsCount, GameDate, Winnings, HouseProfit)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      color,
      BetsOnRed,
      BetsOnBlack,
      BetsOnGreen,
      TotalBets,
      TotalBetsOnRed,
      TotalBetsOnBlack,
      TotalBetsOnGreen,
      ParticipantsCount,
      GameDate,
      Winnings,
      HouseProfit,
    ];

    try {
      await con.promise().query(insertQuery, values);
      console.log('Rundendaten erfolgreich in die Datenbank eingefügt');
    } catch (err) {
      console.error('Fehler beim Einfügen der Rundendaten:', err);
    }
  }

  function blackCount() {
    return last100Results.filter((result) => result === COLORS.BLACK).length;
  }

  function greenCount() {
    return last100Results.filter((result) => result === COLORS.GREEN).length;
  }

  function redCount() {
    return last100Results.filter((result) => result === COLORS.RED).length;
  }

  startRouletteRound();
};

export default rouletteController;
