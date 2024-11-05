import Employee from "../models/Employee.js";
import EmployeeHistorySchema from "../models/EmployeeHistorySchema.js";

export const createEmployees = async (data) => {
  const newEmployee = new Employee(data);
  await newEmployee.save();
  return { status: "CREATED", data: newEmployee };
};

export const getEmployeess = async () => {
  const employees = await Employee.find();
  return { status: "SUCCESSFUL", data: employees };
};

export const updateEmployees = async (id, data) => {
  const employee = await Employee.findById(id);

  if (!employee) {
    return {
      status: "NOT_FOUND",
      data: { message: "Funcionário não encontrado" },
    };
  }

  // Salvar o estado atual no histórico antes da atualização
  const historyData = { ...employee.toObject(), employeeId: id };
  await EmployeeHistorySchema.create(historyData);

  // Atualizar os dados do funcionário
  const updatedEmployee = await Employee.findByIdAndUpdate(id, data, {
    new: true,
  });
  return { status: "SUCCESSFUL", data: updatedEmployee };
};

export const getEmployeeById = async (id) => {
  const employee = await Employee.findById(id);
  if (!employee) {
    return { status: "NOT_FOUND", data: { message: "Employee not found!" } };
  }
  return { status: "SUCCESSFUL", data: employee };
};

export const deleteEmployees = async (id) => {
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) {
    return { status: "NOT_FOUND", data: { message: "Employee not found!" } };
  }
  return {
    status: "NO_CONTENT",
    data: { message: "User deleted successfully" },
  };
};

export const getEmployeeHistory = async (employeeId) => {
  const history = await EmployeeHistory.find({ employeeId }).sort({
    dataAlteracao: -1,
  });
  return { status: "SUCCESSFUL", data: history };
};
