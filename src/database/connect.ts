import mongoose, { ConnectOptions } from "mongoose";

mongoose.connection.on("error", () => {
  // TODO: Logger Here
  process.exit(-1);
});
const Connect = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    } as ConnectOptions);

    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

export default Connect;
