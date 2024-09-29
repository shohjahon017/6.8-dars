import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
      <header className=" flex gap-4  m-5   justify-center  ">
        <NavLink
          className="bg-slate-400 p-2 rounded-md hover:bg-slate-500 transition-all duration-300"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="bg-slate-400 p-2 rounded-md hover:bg-slate-500 transition-all duration-300"
          to="/register"
        >
          Register
        </NavLink>
        <NavLink
          className="bg-slate-400 p-2 rounded-md hover:bg-slate-500 transition-all duration-300"
          to="/login"
        >
          Login
        </NavLink>
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>{" "}
        <Route path="*" element={<ErrorPage />}></Route>{" "}
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
