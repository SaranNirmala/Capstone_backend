import Express from "express";
import { connectToDb } from "./db/connection.js";
import { inputRouter } from "./routes/input.js";
import cors from "cors";
import { registerRouter } from "./routes/register.js";
import { loginRouter } from "./routes/login.js";
import jwt from 'jsonwebtoken';
import multer from "multer";
import path from "path";
import dotenv from 'dotenv'

dotenv.config();

const app = Express();

const port=process.env.PORT;
console.log(`Port: ${port}`);
await connectToDb();

// Middleware

app.use(Express.json());

app.use(cors());

app.use('/uploadImages', Express.static('uploadImages'));

const authMiddleware = (req, res, next) => {
    const token= req.headers['auth-token'];
    try{
        jwt.verify(token, 'Capstone')
        next()
    } catch(err){
        res.status(401).send({msg:'unauthorized'})
    }
}

//  Route

app.use('/input' , inputRouter);

app.use("/register", registerRouter );

app.use('/login', loginRouter);

app.get('/', (req, res) => {
    res.send("Welcome");
})


// Server

app.listen(port , ()=> console.log('Welcome to server', port))

