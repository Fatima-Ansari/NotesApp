import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import connectToMongoDB from "./db/db.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter); 
app.use("/api/note", noteRouter); 

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening on port ${PORT}`);
});
