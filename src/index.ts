import dotenv from "dotenv";
import connectDB from "./db";
import app from "./app";

dotenv.config();

// Start the server
const port = process.env.PORT || 8000;

app.listen(port, () =>{
  console.log("Server listening", port);
})

// 
// connectDB();
