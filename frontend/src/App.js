import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes , Route, useNavigate} from 'react-router-dom' ;
import axios from "axios";
import Class from "./pages/class/Class"
import CreateStudent from "./pages/createStudent/CreateStudent";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AddClass from "./pages/addClass/AddClass";
import ViewStudent from "./pages/viewStudent/ViewStudent";

function App() {
  // create state to put the classes in
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  // get the classes
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4620/class/all");
      setClasses(res.data);
    };
    fetchData();
  }, [classes]);

  // check if there is admin in the page or not 
  const admin = localStorage.getItem('admin');
  useEffect(()=>{
    if(!admin){
      navigate("/");
    }
  },[navigate]);

  
  return (
    <div className="App d-flex gap-4">
      {admin === null ? <></> : <Sidebar classes={classes}/>}
      <Routes>
        <Route path="/" element={admin === null ? <Login/> : <Home/>} />
        {classes.map((c)=>{
          return <Route path={`/${c.class}`} element={<Class classData={c}/>} />
        })}
        <Route path="/:class/create-student" element={<CreateStudent classes={classes}/>}/>
        <Route path="/add-class" element={<AddClass/>}/>
        <Route path="/:class/:matricule" element={<ViewStudent/>}/>
      </Routes>
    </div>
  );
}

export default App;
