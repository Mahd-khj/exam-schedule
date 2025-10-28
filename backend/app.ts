import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.ts";

// Import models
import User from "./models/User.ts";
import Room from "./models/Room.ts";
import ClassCode from "./models/ClassCode.ts";
import ExamTable from "./models/ExamTable.ts";

// Import routes
import userRoutes from "./routes/userRoutes.ts";
import roomRoutes from "./routes/roomRoutes.ts";
import classCodeRoutes from "./routes/classCodeRoutes.ts";
import examTableRoutes from "./routes/examTableRoutes.ts";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Exam Schedule API is running");
});

// API routes
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/classcodes", classCodeRoutes);
app.use("/exam-table", examTableRoutes);
export default app;

// Start server if running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 3000;

  const startServer = async () => {
    try {
      // Test DB connection
      await sequelize.authenticate();
      console.log("Database connection established.");

      // Sync all models
      await sequelize.sync({ alter: true });
      console.log("All models were synchronized.");

      // Start server
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Unable to start server:", error);
    }
  };

  startServer();
}
