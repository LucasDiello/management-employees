import React from "react";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
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
  return <div>{/* Increment auth feature */}</div>;
};

export { Layout, RequireAuth };
