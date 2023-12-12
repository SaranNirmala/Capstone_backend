import Express from "express";
import { inputModel } from "../db/models.js";
import multer from "multer";
import { v4 } from "uuid";

export const inputRouter = Express.Router();
// Using Multer for Imgae Uploading
// const storage =multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, 'uploadImages/');
//     },
//     filename: (req, file, cb) =>{
//         cb(null, Date.now() + "-"+file.originalname);
//     }
// })

// const upload= multer({
//     storage: storage
// })

//  Get all the data from DB
inputRouter.get("/", async (req, res) => {
  try {
    const inputData = await inputModel.find({});
    // const imagename= req.files;
    if (inputData) {
      res.send(inputData);
    } else {
      res.send("Not Received!");
    }
  } catch (e) {
    console.error("Error", e);
  }
});

//  Get single data from DB using ID
inputRouter.get("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    const inputData = await inputModel.findOne({ id: id });
    if (inputData) {
      res.send(inputData);
    } else {
      res.send({ msg: "Not Received!" });
    }
  } catch (e) {
    console.error("Error", e);
  }
});

// upload.array('images',1) - filename:filename, path:path,
//  create the data and store the DB
inputRouter.post("/", async (req, res) => {
  // const {filename, path}=req.files[0];
  const payload = req.body;
  try {
    const data = await inputModel.create({ ...payload });
    if (data) {
      res.status(200).send(data);
    } else {
      res.send({ use: "error creating" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// update the data using ID
inputRouter.put("/:id", async (req, res) => {
  const payload = req.body; //postman
  const id = req.params.id;
  try {
    const url = await inputModel.findOne({ id: id });
    if (url) {
      const updateData = await inputModel.findOneAndUpdate(
        { id: id },
        { ...payload }
      );
      res.send({ msg: "Updated" });
    } else {
      res.send({ msg: "Invalid" });
    }
  } catch (error) {
    console.error(error);
  }
});

// detale the data using ID
inputRouter.delete("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const deleteData = await inputModel.findOneAndDelete({ id: id });
    if (deleteData) {
      res.send("data deleted");
    } else {
      res.send("data not found");
    }
  } catch (err) {
    res.status(500).send("Delete data failed");
  }
});
