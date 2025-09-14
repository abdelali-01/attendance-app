import { useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Class from "./pages/class/Class";
import Home from "./pages/home/Home";
import AddClass from "./pages/addClass/AddClass";
import Classes from "./pages/Classes";
import Settings from "./pages/settings/Settings";
import Reports from "./pages/Reports";
import NoDisponibleFeature from "./components/ui/NoDisponibleFeature";

import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./store/auth/authHandler";
import Loader from "./components/ui/Loader";
import UpgradePopup from "./components/modals/UpgradePopup";
import CheckoutRedirecter from "./components/modals/ChekoutRedirecter";
import { getClasses } from "./store/class/classHandler";
import ClassSettings from "./pages/class/Settings";
import ToastContainer from "./components/Toast/ToastContainer";
import { SidebarProvider } from "./contexts/SidebarContext";
import Navbar from "./layout/Navbar";
import ExpiredSession from "./components/ExpiredSession";
import StudentClass from './pages/StudentClass'

function Dashboard() {
  const { user, role , checkLoading} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // create state to put the classes in
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUser(navigate));
    dispatch(getClasses());
  }, []);

  return (
    <ToastContainer>
      {user && role && (
        <SidebarProvider>
          <div className="App d-flex gap-0" style={{ minHeight: "100vh" }}>
            {role === "teacher" && <UpgradePopup />}
            <CheckoutRedirecter />
            <Sidebar />
            <div className="position-relative flex-grow-1 d-flex flex-column" style={{ minHeight: "100vh" }}>
              <Navbar />
              <div style={{ flex: 1, minHeight: 0 }}>
                <Routes location={location}>
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/messages" element={<NoDisponibleFeature />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/classes/:classId" element={role === "teacher" ? <Class /> : <StudentClass/>} />
                  {role === "teacher" ? (
                    <>
                      {/* set the teacher pages */}
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/classes/:classId/settings"
                        element={<ClassSettings />}
                      />
                      <Route path="/add-class" element={<AddClass />} />
                    </>
                  ) : (
                    // the students pages
                    <>
                      <Route path="/" element={<Classes />} />
                    </>
                  )}
                </Routes>
              </div>
            </div>
          </div>
        </SidebarProvider>
      )}

      {
        !user && !checkLoading && <ExpiredSession/>
      }
    </ToastContainer>
  );
}

export default Dashboard;
