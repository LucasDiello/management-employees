import { db } from "../../../index.js";

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
  await db.collection("employees").doc(id).update(data);
  return { status: "SUCCESSFUL", data: { id, ...data } };
};

export const deleteEmployees = async (id) => {
  await db.collection("employees").doc(id).delete();
  return {
    status: "NOT_CONTENT",
    data: { message: "User deleted successfully" },
  };
};
