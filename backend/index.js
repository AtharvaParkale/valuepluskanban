import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/error.js";
import cardRoutes from "./routes/cardRoutes.js";

//HANDLING UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log("Shutting down the server due to the uncaught exception ! ");
  process.exit(1);
});

dotenv.config({ path: "./config/config.env" });

//MIDDLEWARE
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

// ROUTES
app.use("/api/v1", cardRoutes);

//ERROR MIDDLEWARE
app.use(errorMiddleware);

//SERVER CONNECTION
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("=================================");
      console.log(`App running on port : ${PORT}`);
      console.log("=================================");
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
