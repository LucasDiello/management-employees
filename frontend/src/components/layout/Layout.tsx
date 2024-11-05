import React, { useEffect } from "react";
import Header from "../header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import "./layout.scss";
import { useAuth } from "../../context/authContext";

const Layout = () => {
  return (
    <div className="layout">
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

const RequireAuth = () => {
  const { signed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signed) {
      navigate("/login");
    }
  }, [signed, navigate]);

  if (!signed) return null;

  return <Outlet />;
};

export { Layout, RequireAuth };
