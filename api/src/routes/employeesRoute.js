import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeeHistory,
  getEmployees,
  updateEmployee,
} from "../controllers/employeesController.js";

const router = express.Router();

router.post("/employees", createEmployee);
router.get("/employees", getEmployees);
router.get("/employee/:id", getEmployeeById);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);
router.get("/employee/:id/history", getEmployeeHistory);

export default router;
