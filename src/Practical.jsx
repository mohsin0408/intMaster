import React from "react";
import { Outlet, Link } from "react-router-dom";

const Practical = () => {
  return (
    <div className="p-6 bg-gray-100 rounded shadow-lg">
      <nav className="flex justify-center gap-6 mb-6">
        <Link
          to="pstyle"
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
          CSS
        </Link>
        <Link
          to="pscript"
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
          JS
        </Link>
        <Link
          to="preact"
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
          React
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Practical;
