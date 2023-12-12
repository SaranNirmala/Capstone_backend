import Express from "express";
import bcrypt from "bcrypt";
import { userMail } from "./forgotPassword.js";
import { registerModel } from "../db/models.js";

export const resetPasswordRouter = Express.Router();

resetPasswordRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const resetdata = await registerModel.find({ email: userMail[0] });
    bcrypt.hash(payload.password, 10, async (err, data) => {
      if (data) {
        const userData = await registerModel.findOneAndUpdate(
          { email: userMail[0] },
          { ...resetdata, password: data }
        );
        res.status(200).send(userData);
      } else {
        res.status(401).send({ msg: "password not updated" });
      }
    });
  } catch (err) {
    console.error(err);
  }
});
