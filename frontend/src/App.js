import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes , Route} from 'react-router-dom' ;
import axios from "axios";
import Class from "./pages/class/Class"

function App() {
  // create state to put the classes in
  const [classes, setClasses] = useState([]);

  // get the classes
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4620/class/all");
      setClasses(res.data);
    };
    fetchData();
  }, [classes]);
  return (
    <div className="App d-flex gap-4">
      <Sidebar classes={classes}/>
      <Routes>
        {classes.map((c)=>{
          return <Route path={`/${c.class}`} element={<Class classData={c}/>} />
        })}
      </Routes>
    </div>
  );
}

export default App;
