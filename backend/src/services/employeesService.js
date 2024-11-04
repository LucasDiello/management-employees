import { db } from "../../index.js";

export const createEmployees = async (data) => {
  console.log(data);
  const doc = await db.collection("employees").add(data);
  return { status: "CREATED", data: { id: doc.id, ...data } };
};

export const getEmployeess = async () => {
  const getAllEmployees = await db.collection("employees").get();
  const employees = getAllEmployees.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return { status: "SUCCESSFUL", data: employees };
};

export const updateEmployees = async (id, data) => {
  const employeeRef = db.collection("employees").doc(id);
  const employeeDoc = await employeeRef.get();

  if (!employeeDoc.exists) {
    return {
      status: "NOT_FOUND",
      data: { message: "Funcionário não encontrado" },
    };
  }

  const dataAlteracao = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  await employeeRef.collection("historico").add({
    ...employeeDoc.data(),
    dataAlteracao,
  });

  await employeeRef.update(data);
  return { status: "SUCCESSFUL", data: { id, ...data } };
};

export const getEmployeeHistory = async (employeeId) => {
  const historySnapshot = await db
    .collection("employees")
    .doc(employeeId)
    .collection("historico")
    .orderBy("dataAlteracao", "desc")
    .get();

  const history = historySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { status: "SUCCESSFUL", data: history };
};

export const getEmployeeById = async (id) => {
  const employee = await db.collection("employees").doc(id).get();
  if (!employee.exists) {
    return {
      status: "NOT_FOUND",
      data: { message: "Employee not found!" },
    };
  }
  return {
    status: "SUCCESSFUL",
    data: { id: employee.id, ...employee.data() },
  };
};

export const deleteEmployees = async (id) => {
  await db.collection("employees").doc(id).delete();
  return {
    status: "NOT_CONTENT",
    data: { message: "User deleted successfully" },
  };
};
