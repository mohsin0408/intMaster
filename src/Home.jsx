import React from "react";
import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>🏠 Home Page</h1>

      <nav>
        <Link to="accord">Accordion</Link>
        <Link to="todo">Todo</Link>
        <Link to="theory">Theory</Link>
        <Link to="practical">Practical</Link>
      </nav>
      {/* Nested content will render here */}
      <Outlet />
    </div>
  );
};

export default Home;
