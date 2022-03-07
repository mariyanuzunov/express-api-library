import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// DB configs
import { connectMongo } from "./config/db.js";

// Middlewares
import { withAuth } from "./auth/auth.middleware.js";
import { errorHandler } from "./utils/error.middleware.js";

// Controllers
import userController from "./resources/user/user.controller.js";
import bookController from "./resources/book/book.controller.js";
import genreController from "./resources/genre/genre.controller.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

start();

async function start() {
  await connectMongo();

  const app = express();

  app.disable("x-powered-by");

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("dev"));

  // Routes
  app.use("/api/users", userController);
  app.use("/api/books", withAuth, bookController);
  app.use("/api/genres", withAuth, genreController);

  // 404
  app.use("*", (req, res) =>
    res.status(404).json({ message: "Page Not Found" })
  );

  // Global error handler
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
}
