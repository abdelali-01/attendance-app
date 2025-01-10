import React, { useEffect, useState } from "react";
import "./class.css";
import StudentItem from "../../components/studentItem/StudentItem";
import axios from "axios";
import new_icon from "../../components/icons/new.svg";
import search_icon from "../../components/icons/search.svg";
import moment from "moment";
import { Link } from "react-router-dom";
import ClassName from "../../components/ClassName";

export default function Class({ classData }) {
  const serverUri = process.env.BASE_URI ;

  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [posibilityStatus, setPosibilityStatus] = useState(
    classData.posibility
  );
  const [currentTime, setCurrentTime] = useState("");

  // create states to manege the search
  const [search, setSearch] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formattedTime = moment().format("ddd , DD,YYYY , hh:mm A"); // Format the date
      setCurrentTime(formattedTime);
    };

    updateTime();
    setInterval(updateTime, 1000); // Update every second
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const studentList = await axios.get(
        `${serverUri}/student/studentsList/${classData.class}`
      );
      const sortedStudents = studentList.data.sort((a, b) =>
        a.familyName.localeCompare(b.familyName)
      );
      setStudents(sortedStudents);
    };
    fetchData();
  }, [classData.class , serverUri]);

  // filter student for the search
  const filteredStudents = students.filter(
    (student) =>
      student.familyName.toLowerCase().includes(search.toLowerCase()) ||
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.matricule.includes(search)
  );

  // the function of change the posibility of check the presence
  async function changePosibility() {
    setLoading(true);
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
          await axios.put(`${serverUri}/admin/absence/${student._id}`);
        });

        // Reset statuses for all students in the class with pending status
        absentStudents.forEach((student) => {
          sessionStorage.setItem(`status-${student._id}`, "absent");
        });
      }
      await axios.put(
        `${serverUri}/class/changePosibility/${classData.class}`,
        {
          date: currentDate,
          absenceCount: absentCount,
          attendanceCount: attendanceCount,
        }
      );
      setPosibilityStatus(!posibilityStatus);
    } catch (error) {
      alert("failed to open the class please try again !");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Delete the class with confirmation
  const deleteClass = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await axios.delete(`${serverUri}/class/${classData.class}`);
      } catch (error) {
        console.error("Error deleting the class:", error);
        alert("Failed to delete the class. Please try again.");
      }
    }
  };

  // reset all absences 
  const reset = async () => {
    try {
      await axios.put(`${serverUri}/student/reset/${classData.class}`);
    } catch (error) {
      alert("faild to reset , please try again !");
    }
  }

  return (
    <div
      className="class-page flex-grow-1 px-4 mb-5"
      style={{
        maxWidth: "100%",
      }}
    >
      <div className="search my-3 text-center m-auto w-50">
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
      <ClassName classData={classData} />
      <div className="list-of-class d-flex flex-column align-items-end px-md-5 w-100">
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
            <div className="table-container w-100">
              <table className="w-100 mt-2">
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
        <div className="class-actions  d-flex justify-content-between w-100 flex-wrap">
          <div className="clt-left my-3">
            <button onClick={reset} className="btn btn-secondary">Reset All absences</button>
          </div>
          <div className="cta-right d-flex flex-wrap gap-2 my-3">
          <Link
            to={`/${classData.class}/create-student`}
            className="flex-grow-1"
          >
            <button className="btn open-style rounded-3 d-flex align-items-center justify-content-center gap-2 w-100">
              <span>Add new student</span>
              <img src={new_icon} alt="" />
            </button>
          </Link>
          <button
            onClick={deleteClass}
            className="btn btn-danger rounded-3 flex-grow-1"
          >
            Delete class
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
