import { FastifyInstance } from "fastify";
import { CandleController } from "../controllers/CandleController";

const candleCtrl = new CandleController();

export const candlesRoutes = (app: FastifyInstance) => {
  app.get("/:quantity", async (request, reply) => {
    const quantity = Number((request.params as any).quantity);
    const lastCandles = await candleCtrl.findLastCandles(quantity);

    return reply.send({
      lastCandles,
    });
  });
};
