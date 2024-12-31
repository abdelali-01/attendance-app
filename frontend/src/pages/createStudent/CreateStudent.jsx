import React, { useEffect, useState } from "react";
import ClassName from "../../components/ClassName";
import { useParams } from "react-router-dom";
import "./createstudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../../components/studentItem/StudentItem";

export default function CreateStudent({ classes, updateStudent }) {
  const [loading, setLoading] = useState(false);
  // to find the class
  const { class: className, studentMatricule } = useParams();
  const [currentClass, setCurrentClass] = useState(null);

  // create navigation hook to manage the location
  const navigate = useNavigate();
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
    absences : 0,
    attendanceMark : 0 ,
    class: className,
  });
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const matchedClass = classes.find((c) => c.class === className);
    setCurrentClass(matchedClass || null);

    if (updateStudent && !isDataFetched) {
      const fetchStudent = async () => {
        try {
          const res = await axios.get(
            `https://attendance-app-backend-dhre.onrender.com/student/${studentMatricule}`
          );
          const studentData = res.data;
          delete studentData.password; // Remove the password from the response
          setStudent(studentData);
          setIsDataFetched(true);
        } catch (error) {
          console.error("Error fetching student data:", error);
          alert("Failed to fetch student data. Please try again.");
        }
      };
      fetchStudent();
    }
  }, [studentMatricule , updateStudent , isDataFetched, className , classes]);


  const setHandler = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    setPassAlert(false);
  };

  // form verification
  // create state for password confirmation
  const [passAlert, setPassAlert] = useState(false);
  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading("true");

    if (student.password === student.confPassword) {
      try {
        if(updateStudent){
          await axios.put(`https://attendance-app-backend-dhre.onrender.com/admin/updateStudentAccount/${student._id}` , student);
        }else{
          await axios.post(
            `https://attendance-app-backend-dhre.onrender.com/admin/createStudentAccount`,
            student
          );
        }
        navigate(`/` + className);
      } catch (error) {
        if (error.status === 401) {
          alert(error.response.data);
        }
        alert("failed to create the account , please try again !");
      } finally {
        setLoading(false);
      }
    } else {
      setPassAlert(true)
      setStudent({ ...student, password: "", confPassword: "" });
      setLoading(false);
    }
  };


  return (
    <div className="create-student px-4 mx-auto">
      <div className="text-center">
        {currentClass ? <ClassName classData={currentClass} /> : <></>}
        <p className="fw-semibold fs-5">
          {updateStudent ? <></> : "Create student account for " + className}
        </p>
      </div>
      <div className="d-flex justify-contennt-center my-4">
          <form onSubmit={submitHandle} className="needs-validation">
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
            {updateStudent ? 
              <div className="row m-auto my-3 gap-3">
                <div className="field col">
                  <label htmlFor="absences">Absences</label>
                  <input type="number" name="absences" id="absences" value={student.absences} onChange={setHandler}/>
                </div>
                <div className="field col">
                  <label htmlFor="attendance">Attendance mark</label>
                  <input type="text" name="attendanceMark" id="attendance" value={student.attendanceMark} onChange={setHandler}/>
                </div>
              </div>  : <></>}
            <div className="row m-auto my-3 gap-3 ">
              <div className="field col">
                <label htmlFor="password">
                  {updateStudent ? "Change password" : "Password"}
                </label>
                <input
                  value={student.password}
                  onChange={setHandler}
                  type="password"
                  id="password"
                  name="password"
                  required={!updateStudent}
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
                  required={!updateStudent}
                />
                {passAlert ? <div class="form-text text-danger">It's not the same. Please select the correct one.</div> : <></>}
              </div>
            </div>
            {updateStudent 
            ? 
            <div className="btn-update m-auto gap-3 d-flex justify-content-between flex-wrap">
              <div className="cancel">
                <button onClick={()=>{
                navigate('/'+className)
                }} className="btn btn-secondary rounded-3">Cancel</button>
              </div>
              <div >
                <button onClick={()=>{
                  deleteStudent(student.familyName , student._id)
                  navigate('/'+className)
                }} className="btn btn-danger rounded-3">Delete</button>
                <button className="btn open-style rounded-3 px-5 ms-2">update</button>
              </div>
            </div>
            :<div className="btn-create">
            <button
              className="btn open-style w-50 rounded-3 py-2"
              disabled={loading}
            >
              {loading ? "Loading .. " : "Create account"}
            </button>
          </div>
          }
          </form>
      </div>
    </div>
  );
}
