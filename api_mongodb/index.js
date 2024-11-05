import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import employeeRoutes from "./src/routes/employeesRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Rotas
app.get("/hello", (req, res) => {
  res.send("Hello from MongoDB!");
});

// Rotas de empregados
app.use("/api", employeeRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
