import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import ResetPass from "./pages/ResetPass";
import Signup from "./pages/signup/Signup";
import Verification from "./pages/Verification";

import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./store/auth/authHandler";
import Navbar from "./components/website/Navbar";
import Home from "./pages/website/Home";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // create state to put the classes in
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUser(navigate , "/"));
  },[]);

  return (
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/verification/:token" element={<Verification />} />
          <Route path="/reset-pass" element={<ResetPass />} />
          <Route
            path="/reset-pass/:token"
            element={<ResetPass resetPassword />}
          />
        </Routes>
      
    </div>
  );
}

export default App;
