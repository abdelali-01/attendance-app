import React, { useEffect, useState } from "react";
import "./class.css";
import StudentItem from "../../components/cards/StudentItem";
import axios from "axios";
import search_icon from "../../components/icons/search.svg";
// import moment from "moment";
import { Link, useParams } from "react-router-dom";
import ClassName from "../../components/ui/ClassName";
import { useDispatch, useSelector } from "react-redux";
import {
  findClass,
  getClasses,
} from "../../store/class/classHandler";
import Loader from "../../components/ui/Loader";
import {
  getStudents,
} from "../../store/students/studentsHandler";
import { removeLoading, setLoading } from "../../store/Loading";
import { safeMap, safeFilter } from "../../utils/safeArray";

export default function Class() {
  const serverUri = import.meta.env.VITE_BASE_URI;
  const { classId } = useParams();

  const { classes, foundedClass } = useSelector((state) => state.classes);
  const { loading } = useSelector((state) => state.loading);
  const { students} = useSelector(
    (state) => state.students
  );
  const dispatch = useDispatch();

  const [checkedStudents, setCheckedStudents] = useState([]);

  // updated data
  const [posibilityStatus, setPosibilityStatus] = useState(null);

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
    safeFilter(
      students,
      (student) =>
        student.familyName.toLowerCase().includes(search.toLowerCase()) ||
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.matricule.includes(search)
    );
  const filteredIds = filteredStudents ? filteredStudents.map(s => s._id) : [];
  const allChecked = filteredIds.length > 0 && filteredIds.every(id => checkedStudents.includes(id));

  // the function of change the posibility of check the presence
  async function changePosibility() {
    dispatch(setLoading());
    try {
      let absentCount = 0;
      let attendanceCount = 0;
      let currentDate = null;

      if (posibilityStatus) {
        absentCount = safeFilter(students, (student) => {
          const status = sessionStorage.getItem(`status-${student._id}`);
          return status === "absent" || status === "pending";
        }).length;

        attendanceCount = safeFilter(students, (student) => {
          const status = sessionStorage.getItem(`status-${student._id}`);
          return status === "present";
        }).length;

        // get the current date
        currentDate = new Date().toISOString().split("T")[0];

        // here we get the students with pending status and put them absent when we close the class
        const absentStudents = safeFilter(students, (student) => {
          const absentStudentStatus = sessionStorage.getItem(
            `status-${student._id}`
          );
          return absentStudentStatus === "pending";
        });

        await Promise.all(
          absentStudents.map(async (student) => {
            await axios.put(
              `${serverUri}/user/absence/${student._id}`,
              {
                classId: foundedClass._id,
              },
              { withCredentials: true }
            );

            // Reset statuses for all students in the class with pending status
            sessionStorage.setItem(`status-${student._id}`, "absent");
          })
        );
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
      className="class-page flex-grow-1 px-2 mb-5"
      style={{
        maxWidth: "100%",
      }}
    >
      {loading || !foundedClass || !students ? (
        <Loader />
      ) : (
        <>
          <div className="list-of-class d-flex flex-column align-items-end px-md-5 w-100">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between w-100 mb-2">
              <div className="d-md-flex d-none align-items-center gap-3 "></div>
              <div className="my-3 text-center" style={{ maxWidth: 400, width: "100%" }}>
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Search student"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control"
                    style={{
                      borderRadius: 12,
                      border: "2px solid #e2e8f0",
                      padding: "0.7rem 2.2rem 0.7rem 0.9rem",
                      background: "#fff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102,126,234,.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <img src={search_icon} alt="" className="position-absolute" style={{ right: 10, top: 10, width: 20, opacity: .6 }}/>
                </div>
              </div>
            </div>

              <ClassName classData={foundedClass} classId={classId}/>
              

            {/* dont change anything below this */}
            {filteredStudents.length > 0 ? (
              <>
                <div className="table-top d-flex flex-wrap gap-3 align-items-center justify-content-between w-100 my-3">
                  <div>
                    {/* here should be  */}
                  </div>
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
                        <td className="text-center">
                          <input
                            type="checkbox"
                            title="Select all students"
                            checked={allChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCheckedStudents((prev) => Array.from(new Set([...(prev || []), ...filteredIds])));
                              } else {
                                setCheckedStudents((prev) => (prev || []).filter((id) => !filteredIds.includes(id)));
                              }
                            }}
                            style={{ width: "16px", height: "16px", cursor: "pointer" }}
                          />
                        </td>
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
                      {safeMap(filteredStudents, (student, index) => {
                        return (
                          <StudentItem
                            i={index + 1}
                            key={student._id}
                            student={student}
                            posibilityStatus={posibilityStatus}
                            setCheckedStudents={setCheckedStudents}
                            checkedStudents={checkedStudents}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-center w-100 mt-5" style={{ minHeight: 220 }}>
                  <div
                    className="text-center"
                  >
                    <div className="mb-3 d-flex justify-content-center">
                      <svg
                        width="96"
                        height="96"
                        viewBox="0 0 96 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ opacity: 0.9 }}
                      >
                        <defs>
                          <linearGradient id="grad" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#667eea" />
                            <stop offset="1" stopColor="#764ba2" />
                          </linearGradient>
                        </defs>

                        {/* Board */}
                        <rect x="14" y="18" width="68" height="32" rx="6" stroke="url(#grad)" strokeWidth="2" fill="none"/>
                        <rect x="20" y="24" width="40" height="6" rx="3" fill="#e5e7eb"/>
                        <rect x="20" y="34" width="48" height="6" rx="3" fill="#eef2ff"/>

                        {/* Teacher (center) */}
                        <circle cx="48" cy="62" r="8" stroke="url(#grad)" strokeWidth="2" fill="none"/>
                        <path d="M34 84c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="url(#grad)" strokeWidth="2" fill="none" strokeLinecap="round"/>

                        {/* Students (left/right) */}
                        <circle cx="26" cy="66" r="6" stroke="#cbd5e1" strokeWidth="2" fill="none"/>
                        <path d="M16 84c0-6 4.9-11 11-11" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeLinecap="round"/>

                        <circle cx="70" cy="66" r="6" stroke="#cbd5e1" strokeWidth="2" fill="none"/>
                        <path d="M70 73c6.1 0 11 5 11 11" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeLinecap="round"/>

                        {/* Soft background accent */}
                        <ellipse cx="48" cy="88" rx="26" ry="4" fill="#f1f5f9"/>
                      </svg>
                    </div>
                    <div className="mb-1" style={{ color: "#6b7280", fontSize: 12, letterSpacing: 0.6, textTransform: "uppercase" }}>
                      No students
                    </div>
                    <div className="fw-semibold mb-1" style={{ color: "#111827", fontSize: 16 }}>
                      This class is empty
                    </div>
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      When students join this class, they will appear here.
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
