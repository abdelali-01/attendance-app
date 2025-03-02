import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Class from "./pages/class/Class";
import Home from "./pages/home/Home";
import AddClass from "./pages/addClass/AddClass";
import Classes from "./pages/studentPages/Classes";
import { Class as StudentClassPage } from "./pages/studentPages/Class";
import Settings from "./pages/settings/Settings";
import Reports from "./pages/Reports";
import NoDisponibleFeature from "./components/NoDisponibleFeature";

import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./store/auth/authHandler";
import Loader from "./components/Loader";
import UpgradePopup from "./components/UpgradePopup";

function Dashboard() {
  const { user, role, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // create state to put the classes in
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // get the classes
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("/class/all/" + user);
  //       setClasses(res.data);
  //     } catch (error) {
  //       console.error("error during getting classes", error);
  //       alert("Request issue , Try later !");
  //     }
  //   };
  //   fetchData();
  // }, [classes, user]);

  // check if there is user
  //   useEffect(() => {
  //     if (
  //       !user &&
  //       location.pathname !== "/signup" &&
  //       !location.pathname.startsWith("/verification") &&
  //       !location.pathname.startsWith("/reset-pass")
  //     ) {
  //       navigate("/login");
  //     }
  //   }, [user, navigate, location.pathname]);

  useEffect(() => {
    dispatch(checkUser(navigate));
  }, [dispatch, navigate]);

  return (
    <div className="App d-flex gap-4">
      <UpgradePopup />
      {loading && user ? (
        <Loader />
      ) : (
        <>
          {" "}
          {user && <Sidebar classes={classes} />}
          <div className="position-relative flex-grow-1">
            <Routes location={location}>
              <Route
                path="/settings"
                element={<Settings classes={classes} />}
              />
              <Route path="/reports" element={<Reports classes={classes} />} />
              <Route path="/messages" element={<NoDisponibleFeature />} />
              {role === "teacher" ? (
                <>
                  {/* set the teacher pages */}
                  <Route path="/" element={<Home classes={classes} />} />
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
                  <Route path="/home" element={<NoDisponibleFeature />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route
                    path="/classes/:classId"
                    element={<StudentClassPage />}
                  />
                </>
              )}
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
