import {Routes , Route, useNavigate} from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar";
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();

 // check if there is admin in the page or not 
 const student = localStorage.getItem('Student');
 useEffect(()=>{
   if(!student){
     navigate("/");
   }
 },[student , navigate]);


  return (
    <div className="App d-flex gap-3">
      {student ? <Sidebar/> : <></>}
      <Routes>
        <Route path="/" element={student ? <Home/> : <Login/>} />
      </Routes>
    </div>
  );
}

export default App;
