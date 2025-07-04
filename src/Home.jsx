import React from "react";
import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="header ">
        <h1>🏠 Home Page</h1>
        <nav className=" theory-links">
          {/* <Link to="accord">Accordion</Link> */}
          <Link to="todo" style={{ textDecoration: "none" }}>
            Todo
          </Link>
          <Link to="theory" style={{ textDecoration: "none" }}>
            Theory
          </Link>
          <Link to="practical" style={{ textDecoration: "none" }}>
            Practical
          </Link>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
