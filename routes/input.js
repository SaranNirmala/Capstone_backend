import Express from "express";
import { inputModel } from "../db/models.js";
import multer from "multer";


export const inputRouter = Express.Router();

const storage =multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploadImages/');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "-"+file.originalname);   
    }
})

const upload= multer({
    storage: storage
})




inputRouter.get('/' , async(req, res) =>{
    
try{
    const inputData = await inputModel.find({});
    // const imagename= req.files; 
    if(inputData){
        res.send(inputData)
    } else {
        res.send("Not Received!");
    }
} catch(e){
    console.error("Error", e);
}
});

inputRouter.get('/:id' , async(req, res) =>{
    const payload = req.body;
    const id = req.params.id; 
    console.log(id);
    console.log(payload);
    
    try{
        const inputData = await inputModel.findOne({id:id});
        if(inputData){
            res.send(inputData)
        } else {
            res.send("Not Received!");
        }
    } catch(e){
        console.error("Error", e);
    }
    });



inputRouter.post('/',upload.single('images') ,async(req, res) => {
    const payload=req.body;
    const imagePath=req.files.path;
    console.log(payload);
  try{
    const data= await inputModel.create({...payload, filename:imagePath, path:imagePath});
        if(data){
           res.send(data);
        } else{
            res.send('error creating');
        }
  } catch(err){
    console.log(err);
    
   
  }
}
) 

inputRouter.put('/:email' , async(req, res) => {
    const payload = req.body;    //postman 
    console.log(payload);
    const email=req.params.email;
    try{
        const url=await inputModel.findOne({email:email});
        if(url) {
            const updateData= await inputModel.findOneAndUpdate({email:email}, {...payload});
            res.send("Updated");
        } else{
             res.send("Invalid");
        } } 
    catch(error){
      console.error(error);
    }
})

inputRouter.delete('/:id', async(req, res) => {
    const  payload =req.body;
    const id=req.params.id;

    try{
        const deleteData= await inputModel.findOneAndDelete({id:id});
           if(deleteData){
            res.send("data deleted");
        } else {
            res.send("data not found");
        }

    } catch(err){
        res.status(500).send("Delete data failed");
    }
})

