import {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,  
} from "../config";



import Discipline from "../models/Discipline";

import mongoose from "mongoose";


const DATABASE_NAME = "disciplines";
const url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:/${DATABASE_NAME}?authSource=admin`;
export async function startDatabase() {
  try {
    await mongoose.connect(url);
    await Discipline.createCollection();
    console.log("[OK] Building collection.");
  } catch (error) {
      throw error;
    }
}
