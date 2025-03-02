import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Class from "./pages/class/Class";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AddClass from "./pages/addClass/AddClass";
import ResetPass from "./pages/ResetPass";
import Signup from "./pages/signup/Signup";
import Verification from "./pages/Verification";
import Classes from "./pages/studentPages/Classes";
import { Class as StudentClassPage } from "./pages/studentPages/Class";
import Settings from "./pages/settings/Settings";
import Reports from "./pages/Reports";
import NoDisponibleFeature from "./components/NoDisponibleFeature";

import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./store/auth/authHandler";
import UpgradePopup from "./components/UpgradePopup";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // create state to put the classes in
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUser(navigate));
  }, [dispatch , navigate]);

  return (
    <div className="App d-flex gap-4">
      <div>
        <Routes>
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
    </div>
  );
}

export default App;
