import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes , Route, useNavigate, useLocation} from 'react-router-dom' ;
import axios from "axios";
import Class from "./pages/class/Class"
import CreateStudent from "./pages/createStudent/CreateStudent";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AddClass from "./pages/addClass/AddClass";
import ResetPass from "./pages/ResetPass";

function App() {
  // create state to put the classes in
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // get the classes
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://attendance-app-backend-dhre.onrender.com/class/all");
      setClasses(res.data);
    };
    fetchData();
  }, [classes]);

  // check if there is admin in the page or not 
  const admin = localStorage.getItem('admin');
  useEffect(()=>{
    if (!admin && !location.pathname.startsWith("/reset-pass")) {
      navigate("/");
    }
  },[admin , navigate , location.pathname]);

  
  return (
    <div className="App d-flex gap-4">
      {admin === null ? <></> : <Sidebar classes={classes}/>}
      <Routes>
        <Route path="/" element={admin === null ? <Login/> : <Home classes={classes}/>} />
        {classes.map((c)=>{
          return <Route path={`/${c.class}`} element={<Class classData={c}/>} />
        })}
        <Route path="/:class/create-student" element={<CreateStudent classes={classes} updateStudent={false}/>}/>
        <Route path="/add-class" element={<AddClass/>}/>
        <Route path="/:class/:studentMatricule" element={<CreateStudent classes={classes} updateStudent={true}/> }/>
        <Route path="/reset-pass" element={<ResetPass/>} />
        <Route path="/reset-pass/:token" element={<ResetPass resetPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
