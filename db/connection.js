import mongoose from "mongoose";
import env from "dotenv";

env.config();
// DB connection for Atlas
const userName = process.env.USER_NAME || "msaranyanirmala";
const password = process.env.PASSWORD || "jvy2IE1KgAFACjLW";
const cluster = process.env.CLUSTER || "cluster0.j5rdv22.mongodb.net";
const dbName = process.env.DB_NAME || "Capstone";

const atlasURL = `mongodb+srv://${userName}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

// DB Connection for Local Storage
const localDb = "mongodb://localhost:27017/DynamicPortfolio";

export const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(atlasURL);
    if (connect) {
      console.log("Db Connected Successfully");
    }
  } catch (err) {
    console.error("Error Occured", err);
  }
};
