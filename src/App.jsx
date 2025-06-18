import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccordionCarousel from "./AccordionCarousel";
import TodoApp from "./TodoApp";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import Theory from "./Theory";
import Text from "./Text";
import Style from "./Style";
import Script from "./Script";
import Practical from "./Practical";
import Library from "./Library";
import Pstyle from "./Pstyle";
import Pscript from "./Pscript";
import Plibrary from "./Plibrary";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route with nested routes inside Home */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />}>
            <Route path="accord" element={<AccordionCarousel />} />
            <Route path="todo" element={<TodoApp />} />
            <Route path="theory" element={<Theory />}>
              <Route path="text" element={<Text />} />
              <Route path="style" element={<Style />} />
              <Route path="script" element={<Script />} />
              <Route path="react" element={<Library />} />
            </Route>
            <Route path="practical" element={<Practical />}>
              <Route path="pstyle" element={<Pstyle />} />
              <Route path="pscript" element={<Pscript />} />
              <Route path="preact" element={<Plibrary />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
