import React from "react";
import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-6 ">
        <h1 className="text-3xl font-bold mb-4 ">🏡 Home Page</h1>
        <nav className="flex justify-center space-x-6">
          <Link
            to="todo"
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
            Todo
          </Link>
          <Link
            to="theory"
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
            Theory
          </Link>
          <Link
            to="practical"
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
            Practical
          </Link>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
