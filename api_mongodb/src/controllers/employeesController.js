import * as employeesServices from "../services/employeesService.js";
import mapStatusHTTP from "../utils/mapStatusHttp.js";

export const createEmployee = async (req, res) => {
  try {
    const { data, status } = await employeesServices.createEmployees(req.body);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    res
      .status(mapStatusHTTP("INTERNAL_SERVER_ERROR"))
      .json({ error: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const { data, status } = await employeesServices.getEmployeess();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    res
      .status(mapStatusHTTP("INTERNAL_SERVER_ERROR"))
      .json({ error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, status } = await employeesServices.updateEmployees(
      id,
      req.body
    );
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    res
      .status(mapStatusHTTP("INTERNAL_SERVER_ERROR"))
      .json({ error: error.message });
  }
};

export const getEmployeeHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, status } = await employeesServices.getEmployeeHistory(id);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    res
      .status(mapStatusHTTP("INTERNAL_SERVER_ERROR"))
      .json({ error: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, status } = await employeesServices.getEmployeeById(id);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    res
      .status(mapStatusHTTP("INTERNAL_SERVER_ERROR"))
      .json({ error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await employeesServices.deleteEmployees(id);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    res.status(mapStatusHTTP("NOT_CONTENT")).json({ error: error.message });
  }
};
