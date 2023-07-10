import { Candle, CandleModel } from "../models/CandleModel";

export class CandleController {
  async save(candle: Candle): Promise<Candle> {
    const newCandle = await CandleModel.create(candle);
    return newCandle;
  }

  async findLastCandles(quantity: number): Promise<Candle[]> {
    const lastCandles = await CandleModel.find()
      .sort({ _id: -1 })
      .limit(quantity);

    return lastCandles;
  }
}
