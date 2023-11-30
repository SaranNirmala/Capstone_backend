import Express from "express";
import { inputModel, registerModel } from "../db/models.js";
import {v4} from "uuid";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const registerRouter=Express.Router();

registerRouter.post('/', async(req,res) =>{
    const payload=req.body;
try{
    const registerData = await registerModel.findOne({
        email: payload.email,
    });
    if(registerData) {
        const response = registerData.toObject();
        res.status(409).send(response);
    } else {
        bcrypt.hash(payload.password, 10, async(err, hash) =>{
            const registerData=await registerModel.create({...payload, id:v4(), password:hash});
            if(registerData){
                const response =await registerData.toObject();
                const accessToken=jwt.sign(response, 'Capstone',{
                    expiresIn:"1d"
                });
                res.send({...response, accessToken});
            } else {
                res.status(409).send(err)
            }
        });

        
    }
  
} catch(e){
    console.error("Error", e);
    res.status(500).send(err);
}
})


registerRouter.get('/', async(req,res) =>{
    try{
        const registerData=await registerModel.find({});
        if(registerData){
            res.send(registerData);
        } else {
            res.send("No register data");
        }
    } catch(e){
        console.error("Error", e);
    }
})
