import { connect } from "mongoose";
import { env } from "../env";

export const connectToMongoDB = async () => {
  await connect(env.MONGODB_URL);
};
