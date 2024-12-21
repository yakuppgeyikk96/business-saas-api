import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { NotFoundError } from "./types/error";

import routes from "@/routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("", routes);

app.use(errorHandler);

app.use((_req, _res, next) => {
  next(new NotFoundError("Route not found"));
});

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("------------------");

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
  });
