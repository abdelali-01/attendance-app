import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ResetPass({ resetPassword }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const {token} = useParams();

  useEffect(() => {
    if (token) {
      // If there is a token, we are on the reset password page
      setIsSubmit(false);
      setEmail("");  // Clear the email field
    }
  }, [token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // For password reset, pass both token and new password
        if (token) {
          const res = await axios.post(
            `https://attendance-app-backend-dhre.onrender.com/admin/reset-pass/${token}`,
            { password }
          );
          if (res.status === 200) {
            setIsSubmit(true);
          }
        } else {
          // For email submission
          const res = await axios.post(
            `https://attendance-app-backend-dhre.onrender.com/admin/reset-pass`,
            { email }
          );
          if (res.status === 200) {
            setIsSubmit(true);
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response?.status === 400) {
          alert("Failed to check your email, please try again!");
        } else {
          alert(error.response?.data || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
  };
  return (
    <div
      className="login container-md d-flex align-items-center justify-content-center "
      style={{
        height: "100vh",
      }}
    >
      {isSubmit ? (
        <div className="p-4 rounded-3 flex-grow-1"
        style={{
          maxWidth: "400px",
          backgroundColor: "#F9FAFB",
          boxShadow: "1px 1px 20px #9a99f9",
        }}>
        <h6 className="text-center">Check you Email</h6>
        <p className="mt-4">A password reset link has been sent to your email. <b>{email}</b></p>
        <span disabled={loading} className="text-primary" role="button" onClick={submitHandler} style={{
            textDecoration : "underline",
            userSelect : "none"
        }}>I don't recive the Link</span>
        <Link to={"/"}>
        <button className="btn open-style w-100 mt-3">back to Login</button>
        </Link>
        </div>
      ) : (
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}
          </div>
          <button className="btn open-style w-100 my-3" disabled={loading}>
            {loading ? "Loading ..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
