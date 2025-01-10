import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
  const serverUri = process.env.BASE_URI ;

    // set some hooks to manage the form 
    const [admin , setAdmin]= useState({
        email : "" ,
        password : ""
    });
    
    const [loading , setLoading] = useState(false) ;
    const handleChange =(e)=>{
        setAdmin({...admin , [e.target.name] : e.target.value})
    }


    // fetching 
    const fetchData = async(e) =>{
        e.preventDefault()
        setLoading(true);

        try {
            const res = await axios.post(serverUri+'/admin/login' , admin);
            const adminData = res.data ;
            localStorage.setItem('admin' , adminData);
        } catch (error) {
            if(error.status === 404){
            alert("Your Email or password is incorrect!")
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
            maxWidth : "400px" ,
            backgroundColor : "#F9FAFB",
            boxShadow : "1px 1px 20px #9a99f9"
        }}>
            <h4 className='text-center'>Login - teacher -</h4>
            <div className="field my-3" >
                <label htmlFor="email">Email</label>
                <input value={admin.email} onChange={handleChange} name='email' id='email' type="email" placeholder='admin@gmail.com' required/>
            </div>
            <div className="field my-3">
                <label htmlFor="password">Password</label>
                <input value={admin.password} onChange={handleChange} id='password' name='password'  type="password" placeholder='Enter your password' required/>
            </div>
            <Link to="/reset-pass">
            <p className='text-primary d-flex justify-content-end' role='button'>I forgot my password !</p>
            </Link>
            <button className='btn open-style w-100 my-3' disabled={loading}>{loading ? "Loading ..." : "Login"}</button>
        </form>
    </div>
  )
}
