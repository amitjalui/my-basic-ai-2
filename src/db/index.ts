import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
  const MongoDB_Uri = process.env.MONGODB_URI || "";
  
  try {
    const connectionInstance = await mongoose.connect(`${MongoDB_Uri}/${DB_NAME}`);
    console.log(`\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection failed ", error);
    process.exit(1)
  }
}

export default connectDB;