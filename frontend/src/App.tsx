import React from "react";
import "./App.scss";
import Login from "./pages/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./pages/layout/Layout";
import Employees from "./pages/employees/Employees";
import Register from "./pages/register/Register";
import EmployeesUpdate from "./pages/employeesUpdate/EmployeesUpdate";
import AddEmployee from "./pages/addemployee/AddEmployee";
import EmployeeHistory from "./pages/employeeHistory/EmployeeHistory";
import { employeeLoader, historyEmployeeLoader } from "./libs/loader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/employees",
          element: <Employees />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/employees/update/:id",
          element: <EmployeesUpdate />,
          loader: employeeLoader,
        },
        {
          path: "/employees/add",
          element: <AddEmployee />,
        },
        {
          path: "/employee/history/:id",
          element: <EmployeeHistory />,
          loader: historyEmployeeLoader,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
