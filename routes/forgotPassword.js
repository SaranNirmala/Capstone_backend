import Express from "express";
import { registerModel } from "../db/models.js";
import env from "dotenv";
import jwt from "jsonwebtoken";
import { mailOptions, transporter } from "./mail.js";

env.config();

export const forgotPasswordRouter = Express.Router();

export let userMail = [];

forgotPasswordRouter.post("/", async (req, res) => {
  const payload = req.body.email;
  userMail = [];
  userMail.push(payload);

  try {
    const user = await registerModel.findOne({ email: payload });
    if (user) {
      const verificationToken = jwt.sign(
        { email: payload },
        process.env.JWT_SECRET,
        { expiresIn: "5minutes" }
      );
      const verificationLink = `${process.env.FE_URL}/resetPassword?verify=${verificationToken}`;
      const transferToken = {
        ...mailOptions,
        to: payload,
        text: `Hi please click the link below to confirm your account ${verificationLink}`,
      };
      await transporter.sendMail(transferToken);
      res.status(200).send({ msg: "your account has beed verified" });
    } else {
      res.status(401).send({ mas: "Email not found" });
    }
  } catch (e) {
    console.error(e);
  }
});
