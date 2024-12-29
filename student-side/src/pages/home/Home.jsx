import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import moment from "moment";
import StudentAttendance from "../../components/StudentAttendance";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [studentClass, setStudentClass] = useState(null);
  const student = JSON.parse(localStorage.getItem("Student"));

  useEffect(() => {
    const fetchClass = async () => {
      const res = await axios.get(
        `http://localhost:4620/class/getclass/${student.class}`
      );
      setStudentClass(res.data);
    };

    setInterval(fetchClass, 1000);
    fetchClass();
  }, [student?.class]);

  const checkPresent = async () => {
    const now = new Date().getTime(); // Current timestamp in milliseconds
    const lastChecked = localStorage.getItem("lastCheckAttendance");

    // Check if 90 minutes (1h30min) have passed
    if (lastChecked && now - lastChecked < 90 * 60 * 1000) {
      alert("You can only check attendance once every 1 hour and 30 minutes.");
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:4620/student/checkattendance/${student._id}`
      );
      localStorage.setItem("lastCheckAttendance", now); // Store the current timestamp
    } catch (error) {
      console.log(error);
      alert("Faild to check your attendance , please try again !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page px-md-5 px-3 my-5 flex-grow-1">
      <div className="home-title mt-4">
        <h2 className="fw-bold">Home</h2>
        <p className="text-black-50">
          Welcome back ,{" "}
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {" "}
            {student.familyName} {student.name}
          </span>
        </p>
      </div>
      <div className="class-info">
        {studentClass ? (
          <div className="class w-100 my-5">
            <div className="class-name w-100">
              <h5 className="fw-bold ">
                {studentClass.system} - {studentClass.class}
              </h5>
              <h5>{studentClass.speciality} </h5>
            </div>
            <div className="open-time mt-5">
              <p className="fw-semibold text-black-50">
                Class {studentClass.posibility ? "opened" : "closed"}{" "}
                <span className="text-primary">
                  {moment(studentClass.updatedAt).fromNow()}
                </span>
              </p>
            </div>
            <div className="student-interaction w-100 d-flex flex-column align-items-end">
              <div className="btns d-flex align-items-center gap-3">
                <button
                  onClick={checkPresent}
                  className={`btn btn-${
                    studentClass.posibility ? "success" : "secondary"
                  }`}
                  disabled={!studentClass.posibility}
                >
                  {loading ? "loading" : "I'm present"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="fw-semibold px-md-5 px-sm-3 my-5">
            Loading class data...
          </p>
        )}
      </div>
      <div className="student-table row w-100 gap-3 m-auto">
        <div className="student-info col-lg-6 mt-3">
          <p className="fw-semibold">Your Attendance </p>
          <StudentAttendance student={student} />
        </div>
        <div className="student-info col mt-3">
          <p className="fw-semibold">Absences </p>
          <span className="fs-2 py-2 border d-flex align-items-center justify-content-center rounded-4">{student.absences}</span>
        </div>
        <div className="col mt-3">
          <p className="fw-semibold">A-mark</p>
          <span className="fw-semibold py-2 fs-2 border d-flex align-items-center justify-content-center rounded-4">
            {student.attendanceMark < 3 ? (
              <apan className="text-danger">{student.attendanceMark}</apan>
            ) : (
              <apan className="text-success">{student.attendanceMark}</apan>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
