// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccordionCarousel from "./AccordionCarousel";
import TodoApp from "./TodoApp";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected routes */}
        <Route
          path="/accord"
          element={
            <ProtectedRoute>
              <AccordionCarousel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
