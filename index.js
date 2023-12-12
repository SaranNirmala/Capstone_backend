import Express from "express";
import { connectToDb } from "./db/connection.js";
import { inputRouter } from "./routes/input.js";
import cors from "cors";
import { registerRouter } from "./routes/register.js";
import { loginRouter } from "./routes/login.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import env from "dotenv";
import { forgotPasswordRouter } from "./routes/forgotPassword.js";
import { resetPasswordRouter } from "./routes/resetPassword.js";

env.config();

const app = Express();

// Port
const port = process.env.PORT;
console.log(`Port: ${port}`);

// Db connection
await connectToDb();

// Middleware

app.use(Express.json());

app.use(cors());

// app.use('/uploadImages', Express.static('uploadImages'));

const authMiddleware = (req, res, next) => {
  const token = req.headers["auth-token"];
  try {
    jwt.verify(token, "Capstone");
    next();
  } catch (err) {
    res.status(401).send({ msg: "unauthorized" });
  }
};

//  Routes

app.use("/input", authMiddleware, inputRouter);

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/forgotPassword", forgotPasswordRouter);

app.use("/resetPassword", resetPasswordRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

// Server

app.listen(port, () => console.log("Welcome to server", port));
