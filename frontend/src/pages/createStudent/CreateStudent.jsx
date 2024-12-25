import React, { useEffect, useState } from "react";
import ClassName from "../../components/ClassName";
import { useParams } from "react-router-dom";
import "./createstudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateStudent({ classes }) {
  const [loading , setLoading] = useState(false);
  // to find the class
  const { class: className } = useParams();
  const [currentClass, setCurrentClass] = useState(null);

  // create navigation hook to manage the location
  const navigate = useNavigate();

  useEffect(() => {
    const matchedClass = classes.find((c) => c.class === className);
    setCurrentClass(matchedClass || null);
  });

  // create state to manage the student inputs
  const [student, setStudent] = useState({
    familyName: "",
    name: "",
    matricule: "",
    email: "",
    password: "",
    confPassword: "",
    phone: "",
    birth: "",
    class: className,
  });

  const setHandler = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    setPassAlert("");
  };

  // form verification
  // create state for password confirmation
  const [passAlert, setPassAlert] = useState("");
  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading("true")

    if (student.password === student.confPassword) {
      try {
        await axios.post(
          `http://localhost:4620/admin/createStudentAccount`,
          student
        );
        navigate(`/` + className);
      } catch (error) {
        if(error.status === 401){
          alert(error.response.data)
        }        
        alert("failed to create the account , please try again !");
      }finally {
        setLoading(false)
      }
    } else {
      setPassAlert("please Enter same password");
      setStudent({ ...student, password: "", confPassword: "" });
      setLoading(false)
    }
  };

  return (
    <div className="create-student px-4 mx-auto">
      <div className="text-center">
        {currentClass ? <ClassName classData={currentClass} /> : <></>}
        <p className="fw-semibold fs-5">
          Create student account for {className}
        </p>
      </div>
      <div className="d-flex justify-contennt-center">
        <form onSubmit={submitHandle} >
          <div className="row m-auto my-3 gap-3">
            <div className="field col">
              <label htmlFor="familyName">Family Name</label>
              <input
                value={student.familyName}
                onChange={setHandler}
                type="text"
                id="familyname"
                name="familyName"
                placeholder="Student Family name"
                required
              />
            </div>
            <div className="field col">
              <label htmlFor="name"> Name</label>
              <input
                value={student.name}
                onChange={setHandler}
                type="text"
                id="name"
                name="name"
                placeholder="Student Name"
                required
              />
            </div>
            <div className="field col">
              <label htmlFor="birth">date of birth </label>
              <input
                value={student.birth}
                onChange={setHandler}
                max={"2007-12-31"}
                type="date"
                id="birth"
                name="birth"
              />
            </div>
          </div>
          <div className="row m-auto my-3 gap-3">
            <div className="field col">
              <label htmlFor="matricule">Matricule </label>
              <input
                value={student.matricule}
                onChange={setHandler}
                type="text"
                id="matricule"
                name="matricule"
                maxLength={"12"}
                minLength={"12"}
                placeholder="232300000000"
                required
              />
            </div>
            <div className="field col">
              <label htmlFor="email">Email </label>
              <input
                value={student.email}
                onChange={setHandler}
                type="email"
                id="email"
                name="email"
                placeholder="student@gmail.com"
              />
            </div>
            <div className="field col">
              <label htmlFor="phone">phone number </label>
              <input
                value={student.phone}
                onChange={setHandler}
                type="text"
                id="phone"
                name="phone"
                placeholder="213 000 000 000"
              />
            </div>
          </div>
          <div className="row m-auto my-3 gap-3 ">
            <div className="field col">
              <label htmlFor="password">
                Password - <span className="text-danger">{passAlert}</span>
              </label>
              <input
                value={student.password}
                onChange={setHandler}
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <div className="field col">
              <label htmlFor="conf-password">Confirm password</label>
              <input
                value={student.confPassword}
                onChange={setHandler}
                type="password"
                id="conf-password"
                name="confPassword"
                required
              />
            </div>
          </div>
          <div className="btn-create">
            <button className="btn open-style w-50 rounded-3 py-2" disabled={loading}>
              {loading ?  "Loading .. " : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
