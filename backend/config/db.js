const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`MongoDB connected: ${conn.connection.host}`)

  } catch (error) {

    console.log(error);
    process.exit(1)
  }
}


module.exports= connectDB




const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", false);

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(`Mongoose connection ${err}`);
    } else {
      console.log("Successfully connected!");
      const db = mongoose.connection;
      db.on("disconnected", () => {
        console.log("Connection disconnected");
      });
      process.on("SIGINT", () => {
        mongoose.connection.close(() => {
          console.log("Mong disconn");
          process.exit(0);
        });
      });
    }
  }
);
