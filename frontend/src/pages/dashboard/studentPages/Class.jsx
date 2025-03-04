import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import moment from "moment";
import axios from "axios";
import StudentAttendance from "../../../components/StudentAttendance";
import { useSelector } from "react-redux";

export function Class() {
  const serverUri = process.env.REACT_APP_BASE_URI;

  const navigate = useNavigate();
  const { classId } = useParams();
  const studentClasses = [];
  const { user } = useSelector((state) => state.user);

  // set loading state to manage the loading when the component mount
  const [loading, setLoading] = useState(true);

  const [currentClass, setCurrentClass] = useState(null);
  const [student, setStudent] = useState(null);
  const [studentClass, setStudentClass] = useState(null);

  // Fetch student data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && classId) {
          const res = await axios.get(
            `${serverUri}/student/${user}?classId=${classId}`
          );
          setStudent(res.data.student);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [user, classId, serverUri]);

  // Update class-related state after student data is fetched
  useEffect(() => {
    if (classId && studentClasses && student) {
      const foundClass = studentClasses.find((c) => c._id === classId);
      if (foundClass) {
        setCurrentClass(foundClass);
        const matchedClass = student.classes.find(
          (c) => c.classId === foundClass._id
        );
        if (matchedClass) {
          setStudentClass(matchedClass);
        }
        setLoading(false);
      }
    }
  }, [student, classId]);

  const checkPresence = async () => {
    const now = new Date().getTime(); // Current timestamp in milliseconds
    const lastChecked = localStorage.getItem("lastCheckAttendance");

    // Check if 90 minutes (1h30min) have passed
    if (lastChecked && now - lastChecked < 90 * 60 * 1000) {
      alert("You can only check attendance once every 1 hour and 30 minutes.");
      return;
    }

    try {
      await axios.put(`${serverUri}/student/checkattendance/${student._id}`, {
        classId: currentClass._id,
      });
      alert("Thanks for check your attendance .");
      localStorage.setItem("lastCheckAttendance", now); // Store the current timestamp
    } catch (error) {
      console.error("error during set the present", error);
      alert("Faild to check you presence , please try agin !");
    }
  };

  return (
    <div className="class-page">
      {loading ? (
        <Loader />
      ) : (
        <div className="container px-md-5 px-3 my-5">
          <div className="home-title mt-4">
            <h4 className="fw-bold">
              {currentClass.module} - {currentClass.class}
            </h4>
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
            <div className="class w-100 my-5">
              <div className="class-name w-100">
                <h5 className="fw-bold ">{currentClass.system}</h5>
                <h5>{currentClass.speciality} </h5>
              </div>
              <div className="open-time mt-5">
                <p className="fw-semibold text-black-50">
                  Class {currentClass.posibility ? "opened" : "closed"}{" "}
                  <span className="text-primary">
                    {moment(currentClass.updatedAt).fromNow()}
                  </span>
                </p>
              </div>
              <div className="student-interaction w-100 d-flex flex-column align-items-end">
                <div className="btns d-flex align-items-center gap-3">
                  <button
                    onClick={checkPresence}
                    className={`btn btn-${
                      currentClass.posibility ? "success" : "secondary"
                    }`}
                    disabled={!currentClass.posibility}
                  >
                    {loading ? <Loader h={"10"} /> : "I'm present"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="student-table row w-100 gap-3 m-auto">
            <div className="student-info col-lg-6 mt-3">
              <p className="fw-semibold">Your Attendance </p>
              <StudentAttendance
                student={student}
                selectedClass={studentClass}
                fromStudent
              />
            </div>
            <div className="student-info col mt-3">
              <p className="fw-semibold">Absences </p>
              <span className="fs-2 py-2 border d-flex align-items-center justify-content-center rounded-4">
                {studentClass.absences}
              </span>
            </div>
            <div className="col mt-3">
              <p className="fw-semibold">A-mark</p>
              <span className="fw-semibold py-2 fs-2 border d-flex align-items-center justify-content-center rounded-4">
                {!studentClass.attendanceMark ? (
                  <>No mark</>
                ) : studentClass.attendanceMark < 2 ? (
                  <span className="text-danger">
                    {studentClass.attendanceMark}
                  </span>
                ) : (
                  <span className="text-success">
                    {studentClass.attendanceMark}
                  </span>
                )}{" "}
                {studentClass.attendanceMark &&
                  "/" + studentClass.d_AttendanceMark}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
