import axios from "axios";
import React, { useState } from "react";

export default function ResetPass({ resetPassword }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        await axios.post(`https://attendance-app-backend-dhre.onrender.com/admin/reset-pass` , email);
    } catch (error) {
        console.log(error);
        if(error.status === 400){
            alert("faild to check you email , please try again !")
        }else{
            alert(error.response.data)
        }
    }finally{
        setLoading(false)
    }
  }
  return (
    <div
      className="login container-md d-flex align-items-center justify-content-center "
      style={{
        height: "100vh",
      }}
    >
      <form
        className="p-4 rounded-3 flex-grow-1"
        style={{
          maxWidth: "400px",
          backgroundColor: "#F9FAFB",
          boxShadow: "1px 1px 20px #9a99f9",
        }}
        onSubmit={submitHandler}
      >
        <h6 className="text-center">
          {resetPassword ? "Select your new password" : "Enter your email"}
        </h6>
        <div className="field my-3">
          {resetPassword ? (
            <>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </>
          ) : (
            <>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </>
          )}
        </div>
        <button className="btn open-style w-100 my-3" disabled={loading}>
          {loading ? "Loading ..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
