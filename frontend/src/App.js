import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Class from "./pages/class/Class";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AddClass from "./pages/addClass/AddClass";
import ResetPass from "./pages/ResetPass";
import { useAuth } from "./contexts/auth";
import Signup from "./pages/signup/Signup";
import Verification from "./pages/Verification";
import Classes from "./pages/studentPages/Classes";
import { Class as StudentClassPage } from "./pages/studentPages/Class";
import Settings from "./pages/settings/Settings";
import Reports from "./pages/Reports";
import NoDisponibleFeature from "./components/NoDisponibleFeature";

function App() {
  const serverUri = process.env.REACT_APP_BASE_URI;
  const { user, role } = useAuth();

  // create state to put the classes in
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // get the classes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(serverUri + "/class/all/" + user);
        setClasses(res.data);
      } catch (error) {
        console.error("error during getting classes", error);
        alert("Request issue , Try later !");
      }
    };
    fetchData();
  }, [classes, serverUri, user]);

  // check if there is user
  useEffect(() => {
    if (
      !user &&
      location.pathname !== "/signup" &&
      !location.pathname.startsWith("/verification") &&
      !location.pathname.startsWith("/reset-pass")
    ) {
      navigate("/login");
    }
  }, [user, navigate, location.pathname]);

  return (
    <div className="App d-flex gap-4">
      {user === null ? <></> : <Sidebar classes={classes} />}
      <div className="position-relative flex-grow-1">
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
          <Route path="/settings" element={<Settings classes={classes}/>} />
          <Route path="/reports" element={<Reports classes={classes}/>} />
          <Route path="/messages" element={<NoDisponibleFeature/>} />
          {role === "teacher" ? (
            <>
              {/* set the teacher pages */}
              <Route path="/home" element={<Home classes={classes} />} />
              {classes.map((c) => {
                return (
                  <Route
                    key={c._id}
                    path={`/${c._id}`}
                    element={<Class classData={c} />}
                  />
                );
              })}
              <Route path="/add-class" element={<AddClass />} />
            </>
          ) : (
            // the students pages
            <>
              <Route
                path="/home"
                element={<NoDisponibleFeature/>}
              />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/:classId" element={<StudentClassPage />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
