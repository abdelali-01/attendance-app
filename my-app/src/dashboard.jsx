import { useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Class from "./pages/dashboard/class/Class";
import Home from "./pages/dashboard/home/Home";
import AddClass from "./pages/dashboard/addClass/AddClass";
import Classes from "./pages/dashboard/studentPages/Classes";
import { Class as StudentClassPage } from "./pages/dashboard/studentPages/Class";
import Settings from "./pages/dashboard/settings/Settings";
import Reports from "./pages/dashboard/Reports";
import NoDisponibleFeature from "./components/NoDisponibleFeature";

import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./store/auth/authHandler";
import Loader from "./components/Loader";
import UpgradePopup from "./components/UpgradePopup";
import { getClasses } from "./store/class/classHandler";
import ClassSettings from "./pages/dashboard/class/Settings";

function Dashboard() {
  const { user, role } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  // create state to put the classes in
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUser(navigate));
    dispatch(getClasses());
  }, []);

  return (
    <>
      {user && role && (
        <>
          {/* <Loader /> */}
          <div className="App d-flex gap-4">
            {role === "teacher" && <UpgradePopup />}
            <Sidebar />
            <div className="position-relative flex-grow-1">
              <Routes location={location}>
                <Route path="/settings" element={<Settings />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/messages" element={<NoDisponibleFeature />} />
                {role === "teacher" ? (
                  <>
                    {/* set the teacher pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="/classes/:classId" element={<Class />} />
                    <Route
                      path="/classes/:classId/settings"
                      element={<ClassSettings />}
                    />
                    <Route path="/add-class" element={<AddClass />} />
                  </>
                ) : (
                  // the students pages
                  <>
                    <Route path="/" element={<NoDisponibleFeature />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route
                      path="/classes/:classId"
                      element={<StudentClassPage />}
                    />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
