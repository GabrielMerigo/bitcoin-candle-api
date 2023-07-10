import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  QUEUE_NAME: z.string(),
  AMQP_SERVER: z.string(),
  SOCKET_EVENT_NAME: z.string(),
  SOCKET_CLIENT_SERVER: z.string(),
  MONGODB_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠️ Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
