import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import axios from "axios";


// create context
const GetStudentClasses = createContext();

export const useStudentClasses = ()=>{
    return useContext(GetStudentClasses);
}


// provider 
export default function GetStudentClassesProvider({children}){
  const serverUri = process.env.REACT_APP_BASE_URI;
  const {user , role} = useAuth();

  const [studentClasses , setStudentClasses] = useState(null);
  const [loading , setLoading] = useState(true);
  
  useEffect(()=>{
    const fetchClasses = async () => {
        try {
            const response = await axios.get(`${serverUri}/student/classes/${user}`);
            setStudentClasses(response.data);
        } catch (error) {
            console.error('error during getStudentClasses' , error);
            alert('Request Faild , Try later !');
        }finally{
          setLoading(false)
        }
    }

    if(user && role === "student"){
        fetchClasses();
    }
  },[user , role , serverUri]);


  return(
    <GetStudentClasses.Provider value={{studentClasses , loading}}>
        {children}
    </GetStudentClasses.Provider>
  )
}