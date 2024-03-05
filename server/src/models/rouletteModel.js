export class rouletteModel {
  constructor(result, color, BetsOnRed, BetsOnBlack, BetsOnGreen, TotalBets, TotalBetsOnRed, TotalBetsOnBlack, TotalBetsOnGreen, ParticipantsCount, Winnings, HouseProfit) {
    this.result = result;
    this.color = color;
    this.BetsOnRed = BetsOnRed;
    this.BetsOnBlack = BetsOnBlack;
    this.BetsOnGreen = BetsOnGreen;
    this.TotalBets = TotalBets;
    this.TotalBetsOnRed = TotalBetsOnRed;
    this.TotalBetsOnBlack = TotalBetsOnBlack;
    this.TotalBetsOnGreen = TotalBetsOnGreen;
    this.ParticipantsCount = ParticipantsCount;
    this.GameDate = new Date();
    this.Winnings = Winnings;
    this.HouseProfit = HouseProfit;
  }
}

export default rouletteModel;
