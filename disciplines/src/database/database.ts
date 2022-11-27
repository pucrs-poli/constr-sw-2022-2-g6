import {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,  
} from "../config";



import Discipline from "../models/Discipline";

import mongoose from "mongoose";


const DATABASE_NAME = "disciplines";
const url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${DATABASE_NAME}?authSource=admin`;
//const url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${DATABASE_NAME}?authSource=admin`;
export async function startDatabase() {
  try {
    mongodb://user:password@my-shard-00.atlas.mongodb.net:27017
    //await mongoose.connect("mongodb://admin:a12345678@mongo:27017");
    await mongoose.connect(url);
    await Discipline.createCollection();
    console.log("[OK] Building collection.");
  } catch (error) {
    throw error;
  }
}
