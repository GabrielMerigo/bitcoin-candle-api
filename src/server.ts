import { connection } from "mongoose";
import { app } from "./app";
import { connectToMongoDB } from "./config/db";
import { env } from "./env";
import CandleMessageChannel from "./messages/CandleMessageChannel";

const createServer = async () => {
  await connectToMongoDB();
  app.listen(
    {
      port: env.PORT,
    },
    () => console.log(`App running on port ${env.PORT}`)
  );

  const candleMsgChannel = new CandleMessageChannel(app.server);
  candleMsgChannel.consumeMessage();

  process.on("SIGINT", async () => {
    connection.close();
  });
};

createServer();
