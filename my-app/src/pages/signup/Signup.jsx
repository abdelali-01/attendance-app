import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toast/ToastContainer";
import { useDispatch } from "react-redux";
import { signup } from "../../store/auth/authHandler";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { showSuccess, showError} = useToast();
  // set some hooks to manage the form
  const [user, setUser] = useState({
    name: "",
    familyName: "",
    email: "",
    password: "",
    matricule: null,
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await dispatch(signup(user, navigate));
      if (response.success) {
        showSuccess(response.message);
      } else {
        showError(response.message);
      }
    } catch (error) {
      console.log("error during the signup", error);
      showError(error.response?.data || "Failed to signup, please try again.");
    } finally {
      setLoading(false); // Stop the loading state after the request is done
    }
  };


  return (
    <div className="signup container-md d-flex align-items-center justify-content-center my-5">
      <form
        onSubmit={fetchData}
        className="p-4 rounded-3 flex-grow-1"
        style={{
          maxWidth: "400px",
          backgroundColor: "#F9FAFB",
          boxShadow: "1px 1px 20px #9a99f9",
        }}
      >
        <h4 className="text-center">Signup</h4>
        <div className="field my-3">
          <label htmlFor="name">Name</label>
          <input
            value={user.name}
            onChange={handleChange}
            name="name"
            id="name"
            type="text"
            placeholder="you name"
            required
          />
        </div>
        <div className="field my-3">
          <label htmlFor="familyName">Family Name</label>
          <input
            value={user.familyName}
            onChange={handleChange}
            name="familyName"
            id="familyName"
            type="text"
            placeholder="you family name"
            required
          />
        </div>
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
        <div className="field my-3">
          <label htmlFor="role">Select You role </label>
          <select
            name="role"
            id="role"
            required
            value={user.role}
            onChange={handleChange}
          >
            <option value="" hidden selected>
              Select You role
            </option>
            <option value="teacher">teacher</option>
            <option value="student">student</option>
          </select>
        </div>
        <div
          className={`field my-3 ${
            user.role === "student" ? "d-bolck" : "d-none"
          }`}
        >
          <label htmlFor="matricule">Matricule</label>
          <input
            value={user.matricule}
            onChange={handleChange}
            id="matricule"
            name="matricule"
            type="number"
            placeholder="Enter your matricule"
            minLength={"12"}
            maxLength={"12"}
            required={user.role === "student"}
          />
        </div>
        <button className="btn open-style w-100 my-3" disabled={loading}>
          {loading ? "Loading ..." : "Signup"}
        </button>
        <p className="text-center">
          Do you already have an account?
          <span className="text-primary">
            {" "}
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
