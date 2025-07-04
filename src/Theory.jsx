import React from "react";
import { Outlet, Link } from "react-router-dom";

const Theory = () => {
  return (
    <div className="theory">
      <nav className="theory-links">
        <Link to="text" style={{ color: "blue", textDecoration: "none" }}>
          HTML
        </Link>
        <Link to="style" style={{ color: "blue", textDecoration: "none" }}>
          CSS
        </Link>
        <Link to="script" style={{ color: "blue", textDecoration: "none" }}>
          JS
        </Link>
        <Link to="react" style={{ color: "blue", textDecoration: "none" }}>
          React
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Theory;
