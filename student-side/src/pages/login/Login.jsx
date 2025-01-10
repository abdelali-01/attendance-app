import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const serverUri = process.env.BASE_URI ;

    const navigate = useNavigate();
    // set some hooks to manage the form 
    const [student , setStudent]= useState({
        matricule : "" ,
        password : ""
    });
    const [loading , setLoading] = useState(false) ;
    const handleChange =(e)=>{
        setStudent({...student , [e.target.name] : e.target.value})
    }

    // fetching 
    const fetchData = async(e) =>{
        e.preventDefault()
        setLoading(true);

        try {
            const res = await axios.post(serverUri+'/student/login' , student);
            const studentData = res.data ;
            localStorage.setItem('Student' , JSON.stringify(studentData));
            navigate("/")
        } catch (error) {
            console.log(error);
            
            if(error.status === 401){
            alert("Your Matricule or password is incorrect!")
        }else{
            alert("faild to login , please try again ")
        }
        } finally {
            setLoading(false)
        }
    }

    return (
    <div className='login container-md d-flex align-items-center justify-content-center ' style={{
        height  :"100vh" ,
    }}>
        <form onSubmit={fetchData} className='p-4 rounded-3 flex-grow-1' style={{
            maxWidth : "500px" ,
            backgroundColor : "#F9FAFB",
            boxShadow : "1px 1px 20px #9a99f9"
        }}>
            <h4 className='text-center'>Login</h4>
            <div className="field my-3" >
                <label htmlFor="matricule">Matricule</label>
                <input value={student.matricule} onChange={handleChange} name='matricule' id='matricule' type="matricule" placeholder='Enter you matricule' required/>
            </div>
            <div className="field my-3">
                <label htmlFor="password">Password</label>
                <input value={student.password} onChange={handleChange} id='password' name='password'  type="password" placeholder='Enter your password' required/>
            </div>
            <button className='btn open-style w-100 my-3' disabled={loading}>{loading ? "Loading ..." : "Login"}</button>
        </form>
    </div>
  )
}
