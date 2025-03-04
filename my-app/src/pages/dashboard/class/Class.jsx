import React, { useEffect, useState } from "react";
import "./class.css";
import StudentItem from "../../../components/StudentItem";
import axios from "axios";
import search_icon from "../../../components/icons/search.svg";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClassName from "../../../components/ClassName";
import { useDispatch, useSelector } from "react-redux";
import {
  findClass,
  getClasses,
} from "../../../store/class/classHandler";
import Loader from "../../../components/Loader";
import {
  getStudents,
  resetStudentsAbsence,
} from "../../../store/students/studentsHandler";
import { removeLoading, setLoading } from "../../../store/Loading";

export default function Class() {
  const serverUri = import.meta.env.VITE_BASE_URI;
  const navigate = useNavigate();
  const { classId } = useParams();

  const { classes, foundedClass } = useSelector((state) => state.classes);
  const { loading } = useSelector((state) => state.loading);
  const { students} = useSelector(
    (state) => state.students
  );
  const dispatch = useDispatch();

  // updated data
  const [posibilityStatus, setPosibilityStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  // for dynamic time setting
  useEffect(() => {
    const updateTime = () => {
      const formattedTime = moment().format("ddd , DD,YYYY , hh:mm A"); // Format the date
      setCurrentTime(formattedTime);
    };

    updateTime();
    setInterval(updateTime, 1000); // Update every second
  }, []);

  useEffect(() => {
    dispatch(getStudents(classId));
    dispatch(findClass(classes, classId));

    if (foundedClass) {
      setPosibilityStatus(foundedClass.posibility);
    }
  }, [foundedClass, classId, classes, dispatch]);

  // create states to manege the search
  const [search, setSearch] = useState("");
  // filter student for the search
  const filteredStudents =
    students &&
    students.filter(
      (student) =>
        student.familyName.toLowerCase().includes(search.toLowerCase()) ||
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.matricule.includes(search)
    );

  // the function of change the posibility of check the presence
  async function changePosibility() {
    dispatch(setLoading());
    try {
      let absentCount = 0;
      let attendanceCount = 0;
      let currentDate = null;

      if (posibilityStatus) {
        absentCount = students.filter((student) => {
          const status = sessionStorage.getItem(`status-${student._id}`);
          return status === "absent" || status === "pending";
        }).length;

        attendanceCount = students.filter((student) => {
          const status = sessionStorage.getItem(`status-${student._id}`);
          return status === "present";
        }).length;

        // get the current date
        currentDate = new Date().toISOString().split("T")[0];

        // here we get the students with pending status and put them absent when we close the class
        const absentStudents = students.filter((student) => {
          const absentStudentStatus = sessionStorage.getItem(
            `status-${student._id}`
          );
          return absentStudentStatus === "pending";
        });

        absentStudents.forEach(async (student) => {
          await axios.put(
            `${serverUri}/user/absence/${student._id}`,
            {
              classId: foundedClass._id,
            },
            { withCredentials: true }
          );

          // Reset statuses for all students in the class with pending status
          sessionStorage.setItem(`status-${student._id}`, "absent");
        });
      }

      await axios.put(
        `${serverUri}/class/${classId}`,
        {
          date: currentDate,
          absenceCount: absentCount,
          attendanceCount: attendanceCount,
        },
        { withCredentials: true }
      );

      dispatch(getClasses());
    } catch (error) {
      alert("failed to open the class please try again !");
      console.log(error);
    } finally {
      dispatch(removeLoading());
    }
  }

  return (
    <div
      className="class-page flex-grow-1 px-4 mb-5"
      style={{
        maxWidth: "100%",
      }}
    >
      {loading || !foundedClass || !students ? (
        <Loader />
      ) : (
        <>
          <div className="list-of-class d-flex flex-column align-items-end px-md-5 w-100">
            <div className="nav-class d-flex align-items-center justify-content-between w-100">
              <div className="icons">
                <Link to={`/dashboard/classes/${classId}/settings`}>
                  <i className="fa-solid fa-gear fs-4"></i>
                </Link>
              </div>
              <div className="search my-3 text-center w-50">
                <input
                  type="text"
                  placeholder="Search student"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <img src={search_icon} alt="" />
              </div>
            </div>
            <ClassName classData={foundedClass} />
            {filteredStudents.length > 0 ? (
              <>
                <div className="table-top d-flex flex-wrap gap-3 align-items-center justify-content-between w-100 my-3">
                  <span className="text-black-50">{currentTime}</span>
                  <button
                    disabled={loading}
                    onClick={changePosibility}
                    className={`btn rounded-3  ${
                      posibilityStatus ? "btn-danger" : "open-style"
                    }`}
                  >
                    {loading
                      ? "Loading.."
                      : posibilityStatus
                      ? "Close class"
                      : "Open Class"}
                  </button>
                </div>
                <div className="table-container">
                  <table className="mt-2">
                    <thead>
                      <tr>
                        <td>N°</td>
                        <td>Matricule</td>
                        <td>Student</td>
                        <td>Status</td>
                        <td className="text-center">N-absences</td>
                        <td className="text-center">A-mark</td>
                        <td></td>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredStudents.map((student, index) => {
                        return (
                          <StudentItem
                            i={index + 1}
                            key={student._id}
                            student={student}
                            posibilityStatus={posibilityStatus}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <p className="fw-semibold text-center">Class Empty</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
