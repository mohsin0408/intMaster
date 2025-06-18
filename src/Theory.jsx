import React from "react";
import { Outlet, Link } from "react-router-dom";

const Theory = () => {
  return (
    <div>
      <nav>
        <Link to="text">HTML</Link>
        <Link to="style">CSS</Link>
        <Link to="script">JS</Link>
        <Link to="react">React</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Theory;
