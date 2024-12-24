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
    const timer = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup interval
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const studentList = await axios.get(
        `http://127.0.0.1:4620/student/studentsList/${classData.class}`
      );
      const sortedStudents = studentList.data.sort((a, b) =>
        a.familyName.localeCompare(b.familyName)
      );
      setStudents(sortedStudents);
    };
    fetchData();
  }, [classData.class]);

  // Dynamically filter students during rendering
  const filteredStudents = students.filter(
    (student) =>
      student.familyName.toLowerCase().includes(search.toLowerCase()) ||
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.matricule.includes(search)
  );

  // the function of change the posibility of check the presence
  async function changePosibility() {
    await axios.put(
      `http://localhost:4620/class/changePosibility/${classData.class}`
    );
    setPosibilityStatus(!posibilityStatus);

    // Reset statuses for all students in the class
    students.forEach((student) => {
      sessionStorage.setItem(`status-${student._id}`, "pending");
    });
  }

  // Delete the class with confirmation
  const deleteClass = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4620/class/${classData.class}`);
      } catch (error) {
        console.error("Error deleting the class:", error);
        alert("Failed to delete the class. Please try again.");
      }
    }
  };

  return (
    <div className="class-page flex-grow-1 px-4 mb-5">
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
      <ClassName classData={classData}/>
      <div className="list-of-class d-flex flex-column align-items-end px-5">
        {filteredStudents.length > 0 ? (
          <>
            <div className="table-top d-flex align-items-center justify-content-between w-100 my-3">
              <span className="text-black-50">{currentTime}</span>
              <button
                onClick={changePosibility}
                className={`btn rounded-3 ${
                  posibilityStatus ? "btn-danger" : "open-style"
                }`}
              >
                {posibilityStatus ? "Close class" : "Open Class"}
              </button>
            </div>
            <table className="w-100 mt-2">
              <thead>
                <tr>
                  <td>Matricule</td>
                  <td>Student</td>
                  <td>Status</td>
                  <td className="text-center">N-absences</td>
                  <td className="text-center">A-mark</td>
                  <td></td>
                </tr>
              </thead>
              <hr />

              <tbody>
                {filteredStudents.map((student) => {
                  return (
                    <StudentItem
                      key={student._id}
                      student={student}
                      posibilityStatus={posibilityStatus}
                    />
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p className="fw-semibold text-center">Class Empty</p>
          </>
        )}
        <div className="class-actions d-flex gap-2 my-3">
          <Link to={`/${classData.class}/create-student`}>
          <button className="btn open-style rounded-3 d-flex align-items-center gap-2">
            <span>Add new student</span>
            <img src={new_icon} alt="" width={"18"} />
          </button>
          </Link>
          <button onClick={deleteClass} className="btn btn-danger rounded-3">
            Delete class
          </button>
        </div>
      </div>
    </div>
  );
}
