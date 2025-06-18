import React from "react";
import { Outlet, Link } from "react-router-dom";

const Practical = () => {
  return (
    <div>
      <nav>
        <Link to="pstyle">CSS</Link>
        <Link to="pscript">JS</Link>
        <Link to="preact">React</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Practical;
