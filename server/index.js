import express from "express"; 
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser"; // Import body-parser
import db from "./config/database.js";
import router from "./routes/index.js"
import Users from "./models/userModel.js"
import Blogs from "./models/blogModel.js"

dotenv.config();
const app = express(); 
const PORT = 5000; 

async function initializeDatabase() {
    try {
        await db.authenticate();
        console.log("Database connected.");
        
        // Sync models
        await Users.sync();
        await Blogs.sync();

    } catch (error) {
        console.error("Failed to initialize database:", error);
    }
}

initializeDatabase();

// Configure body-parser to handle larger request bodies
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as per your requirement

app.use(cors({ credentials:true, origin:'http://localhost:3000'}))
app.use(cookieParser());
// Remove the line below since bodyParser.json() is already handling JSON request bodies
// app.use(express.json());
app.use(router);

app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else
        console.log("Error occurred, server can't start", error); 
    } 
); 
