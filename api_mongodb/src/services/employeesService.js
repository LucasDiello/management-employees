import Employee from "../models/Employee.js";
import EmployeeHistorySchema from "../models/EmployeeHistorySchema.js";

// Função para transformar os funcionários, substituindo _id por id
const transformEmployee = (employee) => ({
  id: employee._id,
  ...employee.toObject(), // Espalha outras propriedades do objeto
});

export const createEmployees = async (data) => {
  const newEmployee = new Employee(data);
  await newEmployee.save();
  return { status: "CREATED", data: transformEmployee(newEmployee) };
};

export const getEmployeess = async () => {
  const employees = await Employee.find();
  const formattedEmployees = employees.map(transformEmployee);
  return { status: "SUCCESSFUL", data: formattedEmployees };
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
  delete historyData._id; // Garante que não enviamos um _id

  await EmployeeHistorySchema.create(historyData); // Cria novo histórico sem _id

  // Atualizar os dados do funcionário
  const updatedEmployee = await Employee.findByIdAndUpdate(id, data, {
    new: true,
  });
  return { status: "SUCCESSFUL", data: transformEmployee(updatedEmployee) };
};

export const getEmployeeById = async (id) => {
  const employee = await Employee.findById(id);
  if (!employee) {
    return { status: "NOT_FOUND", data: { message: "Employee not found!" } };
  }
  return { status: "SUCCESSFUL", data: transformEmployee(employee) };
};

export const deleteEmployees = async (id) => {
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) {
    return { status: "NOT_FOUND", data: { message: "Employee not found!" } };
  }
  return {
    status: "NOT_CONTENT",
    data: { message: "User deleted successfully" },
  };
};

export const getEmployeeHistory = async (employeeId) => {
  const history = await EmployeeHistorySchema.find({ employeeId }).sort({
    dataAlteracao: -1,
  });
  return { status: "SUCCESSFUL", data: history };
};
