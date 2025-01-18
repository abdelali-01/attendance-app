import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export default function Login() {
  const serverUri = process.env.REACT_APP_BASE_URI;
  const navigate = useNavigate();
  // set some hooks to manage the form
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();

  // fetching
  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${serverUri}/auth/login`, user, {
        withCredentials: true,
      });
      login();
      navigate("/home");
    } catch (error) {
      console.log("error during the login", error);
      if (error.response.status === 404) {
        alert("Your Email or password is incorrect!");
      } else if (error.response.status === 401) {
        navigate("/verification");
      } else {
        alert("Failed to login, please try again.");
      }
    } finally {
      setLoading(false); // Stop the loading state after the request is done
    }
  };

  return (
    <div
      className="login container-md d-flex align-items-center justify-content-center "
      style={{
        height: "100vh",
      }}
    >
      <form
        onSubmit={fetchData}
        className="p-4 rounded-3 flex-grow-1"
        style={{
          maxWidth: "400px",
          backgroundColor: "#F9FAFB",
          boxShadow: "1px 1px 20px #9a99f9",
        }}
      >
        <h4 className="text-center">Login</h4>
        <div className="field my-3">
          <label htmlFor="email">Email</label>
          <input
            value={user.email}
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="field my-3">
          <label htmlFor="password">Password</label>
          <input
            value={user.password}
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <Link to="/reset-pass">
          <p className="text-primary d-flex justify-content-end" role="button">
            I forgot my password !
          </p>
        </Link>
        <button className="btn open-style w-100 my-3" disabled={loading}>
          {loading ? "Loading ..." : "Login"}
        </button>
        <p className="text-center">
          Don't you have an account?
          <span className="text-primary">
            <Link to={"/signup"}> Signup</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
