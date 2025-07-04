import React from "react";
import { Outlet, Link } from "react-router-dom";

const Practical = () => {
  return (
    <div>
      <nav className="theory-links">
        <Link to="pstyle" style={{ color: "purple", textDecoration: "none" }}>
          CSS
        </Link>
        <Link to="pscript" style={{ color: "purple", textDecoration: "none" }}>
          JS
        </Link>
        <Link to="preact" style={{ color: "purple", textDecoration: "none" }}>
          React
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Practical;
