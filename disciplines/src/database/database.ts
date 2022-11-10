import mongoose from "mongoose";
import {
  MONGODB_HOST,
  MONGODB_PASSWORD,
  MONGODB_PORT,
  MONGODB_USER,
} from "../config";
import Disciplines from "../models/Discipline";


const DATABASE_NAME = "disciplines";
const url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${DATABASE_NAME}?authSource=admin`;

export async function startDatabase() {
  try {
    await mongoose.connect(url);
    await Disciplines.createCollection();
    console.log("[OK] Building collection.");
  } catch (error) {
    throw error;
  }
}
