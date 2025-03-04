import React, { useEffect, useState } from "react";
import arrow from "../../../components/icons/Downarrow-black.svg";
import axios from "axios";
import Loader from "../../../components/Loader";
import {useSelector} from 'react-redux';

export default function UpdateProfile() {
  const serverUri = process.env.REACT_APP_BASE_URI;

  const {role, user } = useSelector(state => state.user);

  // manage the form display with state
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setloading] = useState(false);

  // manage the inputs value
  const [form, setForm] = useState({
    name: "",
    familyName: "",
    password: "",
    confPass: "",
    matricule: "",
  });
  const changeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        familyName: user.familyName,
        password: "",
        confPass: "",
        matricule: role === "student" ? user.matricule : "",
      });
    }
  }, [user, role]);

  // update function
  const update = async (e) => {
    e.preventDefault();
    setloading(true);

      // Remove password from form if it's empty before sending the data
  if (!form.password) {
    const { password, ...formWithoutPassword } = form;
    setForm(formWithoutPassword); // Remove password if it's empty
  }

    try {
      await axios.put(`${serverUri}/auth/update/${user._id}?role=${role}`, form);
      window.location.reload();
    } catch (error) {
      console.error("error during updating the account", error);
      alert("faild to update your account , please try again !");
    }finally{
      setloading(false)
    }
  };

  return (
    <div
      className="update-profile card rounded-4 px-3"
      style={{
        overflow: "hidden",
      }}
    >
      <div className="top-card py-3 d-flex align-items-center justify-content-between">
        <div className="left-top-card">
          <h4>Update Your Account</h4>
          <p className="text-black-50">
            Manage and update your profile details
          </p>
          <h6 className="mt-3" style={{ textTransform: "capitalize" }}>
            Welcome, {user.familyName} {user.name} !
          </h6>
          <p className="my-0">Email : {user.email}</p>
        </div>
        <div className="right me-4">
          <img
            src={arrow}
            alt=""
            width={"40"}
            role="button"
            onClick={() => setIsVisible(!isVisible)}
            style={{
              rotate: `${isVisible ? "180deg" : ""}`,
              transition: ".4s",
            }}
          />
        </div>
      </div>
      <form
        className={`mt-4 ${
          isVisible ? "visible-form" : "hidden-form"
        } position-relative`}
        onSubmit={update}
      >
        {loading ? (
          <Loader h={"200px"}/>
        ) : (
          <>
            <div className="d-flex flex-wrap gap-4">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="familyName">Family Name</label>
                <input
                  type="text"
                  id="familyName"
                  name="familyName"
                  value={form.familyName}
                  onChange={changeForm}
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-wrap gap-4 mt-3">
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={changeForm}
                />
              </div>
              <div className="field">
                <label htmlFor="conf-pass">Confirm your password</label>
                <input
                  type="password"
                  id="conf-pass"
                  name="confPass"
                  value={form.confPass}
                  onChange={changeForm}
                />
              </div>
            </div>
            <div className="d-flex align-items-end justify-content-between flex-wrap mt-3">
              {role === "student" ? (
                <div
                  className="field"
                  style={{
                    maxWidth: "450px",
                  }}
                >
                  <label htmlFor="matricule">Matricule</label>
                  <input
                    type="text"
                    id="matricule"
                    name="matricule"
                    value={form.matricule}
                    minLength={"12"}
                    maxLength={"12"}
                    onChange={changeForm}
                    required={role === "student"}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="d-flex flex-grow-1 justify-content-end ">
                <button className="btn open-style">Update</button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
