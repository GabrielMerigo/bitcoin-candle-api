import fastify from "fastify";
import { candlesRoutes } from "./routes/candles";

export const app = fastify({
  logger: true,
});

app.register(candlesRoutes, {
  prefix: "candles",
});
