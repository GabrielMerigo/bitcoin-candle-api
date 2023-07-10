import { connection } from "mongoose";
import { app } from "./app";
import { connectToMongoDB } from "./config/db";
import { env } from "./env";

const createServer = async () => {
  await connectToMongoDB();
  const server = app.listen(
    {
      port: env.PORT,
    },
    () => console.log(`App running on port ${env.PORT}`)
  );

  process.on("SIGINT", async () => {
    connection.close();
  });
};

createServer();
