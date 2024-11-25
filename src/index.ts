import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use("/", router);

// Default route (not found)
app.use((req: Request, res: Response) => {
    res.status(404).json({
        status: "fail",
        message: "Endpoint not found",
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
