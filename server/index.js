import express from "express"; 
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js"
import Users from "./models/userModel.js"


dotenv.config();
const app = express(); 
const PORT = 5000; 

async function initializeDatabase() {
    try {
        await db.authenticate();
        console.log("Database connected.");
        
        // Sync models
        await Users.sync();

    } catch (error) {
        console.error("Failed to initialize database:", error);
    }
}

initializeDatabase();


app.use(cors({ credentials:true, origin:'http://localhost:3000'}))
app.use(cookieParser());
app.use(express.json());
app.use(router);


app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
