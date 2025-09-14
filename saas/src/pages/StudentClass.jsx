import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import moment from "moment";
import axios from "axios";
import StudentAttendance from "../components/cards/StudentAttendance";
import { useDispatch, useSelector } from "react-redux";
import { removeLoading, setLoading } from "../store/Loading";
import { findClass } from "../store/class/classHandler";
import { checkStudentPresence } from "../store/students/studentsHandler";

export default function StudentClass() {
const serverUrl = import.meta.env.VITE_BASE_URI;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classId } = useParams();
  const { classes: studentClasses , foundedClass} = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.user);
  const {loading} = useSelector(state => state.loading);

  const [currentClass, setCurrentClass] = useState(null);
  const [student, setStudent] = useState(null);

  // Fetch student data
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading());
      try {
        if (user && classId) {
          const res = await axios.get(`${serverUrl}/user/${user._id}?classId=${classId}`);
          setStudent(res.data.student);
          setCurrentClass(res.data.currentClass)
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        navigate("/");
      } finally {
        dispatch(removeLoading());
      }
    };

    fetchData();
  }, [user, classId, dispatch, navigate]);

  // Update class-related state after student data is fetched
  useEffect(() => {
    if (classId , studentClasses) {
      dispatch(findClass(studentClasses, classId))
    }
  }, [classId , studentClasses , dispatch]);


  if(loading) return <Loader/>

  return (
    <div className="class-page">
      {currentClass && foundedClass && (
        <>
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
                    Class {foundedClass.posibility ? "opened" : "closed"}{" "}
                    <span className="text-primary">
                      {moment(foundedClass.updatedAt).fromNow()}
                    </span>
                  </p>
                </div>
                <div className="student-interaction w-100 d-flex flex-column align-items-end">
                  <div className="btns d-flex align-items-center gap-3">
                    <button
                      onClick={()=> dispatch(checkStudentPresence(classId , student._id))}
                      className={`btn btn-${
                        foundedClass.posibility ? "success" : "secondary"
                      }`}
                      disabled={!foundedClass.posibility}
                    >
                      I'm present
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
                  selectedClass={currentClass}
                  fromStudent
                />
              </div>
              <div className="student-info col mt-3">
                <p className="fw-semibold">Absences </p>
                <span className="fs-2 py-2 border d-flex align-items-center justify-content-center rounded-4">
                  {currentClass.absences}
                </span>
              </div>
              <div className="col mt-3">
                <p className="fw-semibold">A-mark</p>
                <span className="fw-semibold py-2 fs-2 border d-flex align-items-center justify-content-center rounded-4">
                  {!currentClass.attendanceMark ? (
                    <>No mark</>
                  ) : currentClass.attendanceMark < 2 ? (
                    <span className="text-danger">
                      {currentClass.attendanceMark}
                    </span>
                  ) : (
                    <span className="text-success">
                      {currentClass.attendanceMark}
                    </span>
                  )}{" "}
                  {currentClass.attendanceMark &&
                    "/" + currentClass.d_AttendanceMark}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
