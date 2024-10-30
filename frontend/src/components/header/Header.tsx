import React from "react";
import "./header.css";
import MenuHeader from "./MenuHeader";
const Header = () => {
  return (
    <header>
      <div>
        <h1>Taugor</h1>
        <p>Simplesmente Dinâmico</p>
      </div>
      <div>
        <MenuHeader />
      </div>
    </header>
  );
};

export default Header;
