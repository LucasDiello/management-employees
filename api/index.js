import admin from "firebase-admin";
import cors from "cors";
import express from "express";
import employeeRoutes from "./src/routes/employeesRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
const permissions = JSON.parse(process.env.FIREBASE_PERMISSIONS);

const serviceAccount = permissions;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const db = admin.firestore();

//routes
app.get("/hello", (req, res) => {
  res.send("Hello from Firebase!");
});

//ROUTES
app.use("/api", employeeRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
