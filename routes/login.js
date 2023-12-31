import Express from "express";
import { registerModel } from "../db/models.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const loginRouter=Express.Router();

loginRouter.post('/', async(req, res) => {
   const payload=req.body;
   try{
    const checkUser= await registerModel.findOne({email: payload.email}, {_id:0, email:1, password:1,name:1});
    if(checkUser){
        bcrypt.compare(payload.password, checkUser.password, (err, result) =>{
            if(result){
                const response = checkUser.toObject();
                const accessToken = jwt.sign(response, 'Capstone',{
                    expiresIn:'1d'
                })
                res.send({...response, accessToken});
            } else{
                res.status(401).send({msg:"Password invalid"});
            }
        });
    } else{
        res.status(403).send({msg:"Please register with US"});
    }
   } catch(err){
    console.Error("error", err);
   }
})