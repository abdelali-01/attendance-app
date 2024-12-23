import React, { useEffect, useState } from "react";
import "./class.css";
import StudentItem from "../../components/studentItem/StudentItem";
import axios from "axios";
import new_icon from "../../components/icons/new.svg";
import search_icon from "../../components/icons/search.svg";

export default function Class({ classData }) {
  const [students, setStudents] = useState([]);
  const [posibilityStatus, setPosibilityStatus] = useState(
    classData.posibility
  );

  // create states to manege the search
  const [search, setSearch] = useState("");

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
      <div className="list-of-class d-flex flex-column align-items-end px-5">
        <div className="search my-3">
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
        {filteredStudents.length > 0 ? (
          <>
            <button
              onClick={changePosibility}
              className={`btn rounded-3 ${
                posibilityStatus ? "btn-danger" : "open-style"
              }`}
            >
              {posibilityStatus ? "Close class" : "Open Class"}
            </button>
            <table className="w-100 mt-2">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th className="text-center">N-absences</th>
                  <th className="text-center">A-mark</th>
                  <th></th>
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
          <button className="btn open-style rounded-3 d-flex align-items-center gap-2">
            <span>Add new student</span>
            <img src={new_icon} alt="" width={"18"} />
          </button>
          <button onClick={deleteClass} className="btn btn-danger rounded-3">
            Delete class
          </button>
        </div>
      </div>
    </div>
  );
}
