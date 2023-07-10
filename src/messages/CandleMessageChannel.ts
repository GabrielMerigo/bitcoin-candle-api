import { Channel, connect } from "amqplib";
import * as http from "http";
import { Server } from "socket.io";
import { CandleController } from "../controllers/CandleController";
import { env } from "../env";
import { Candle } from "../models/CandleModel";

export default class CandleMessageChannel {
  private _channel: Channel;
  private _candleCtrl: CandleController;
  private _io: Server;

  constructor(server: http.Server) {
    this._candleCtrl = new CandleController();
    this._io = new Server(server, {
      cors: {
        origin: env.SOCKET_CLIENT_SERVER,
        methods: ["GET", "POST"],
      },
    });
    this._io.on("connection", () =>
      console.log("Web socket connection created")
    );

    this._createMessageChannel();
  }

  private async _createMessageChannel() {
    try {
      const connection = await connect(env.AMQP_SERVER);
      console.log("->", connection);
      this._channel = await connection.createChannel();
      this._channel.assertQueue(env.QUEUE_NAME);
    } catch (err) {
      console.log("Connection to RabbitMQ failed");
      console.log(err);
    }
  }

  consumeMessage() {
    if (this._channel) {
      this._channel.consume(env.QUEUE_NAME, async (msg) => {
        const candleObj = JSON.parse(msg!.content.toString());
        this._channel.ack(msg!);

        const candle: Candle = candleObj;
        this._candleCtrl.save(candle);
        this._io.emit(env.SOCKET_EVENT_NAME, candle);

        console.log("New candle emited by web socket");
      });

      console.log("Candle consumer started!");
    }
  }
}
