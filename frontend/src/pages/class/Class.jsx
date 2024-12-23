import React, { useEffect, useState } from "react";
import "./class.css";
import StudentItem from "../../components/studentItem/StudentItem";
import axios from "axios";
import new_icon from "../../components/icons/new.svg";

export default function Class({ classData }) {
  const [students, setStudents] = useState([]);
  const [posibilityStatus, setPosibilityStatus] = useState(
    classData.posibility
  );

  useEffect(() => {
    const fetchData = async () => {
      const studentList = await axios.get(
        `http://127.0.0.1:4620/student/studentsList/${classData.class}`
      );
      setStudents(studentList.data);
    };
    fetchData();
  }, [classData]);


  // the function of change the posibility of check the presence  
  const changePosibility = async () => {
    await axios.put(
      `http://localhost:4620/class/changePosibility/${classData.class}`
    );
    setPosibilityStatus(!posibilityStatus);

    // Reset statuses for all students in the class
    students.forEach((student) => {
      sessionStorage.setItem(`status-${student._id}`, "pending");
    });
  };

  //delete the class if needed 
  const deleteClass = async()=>{
    await axios.delete(`http://localhost:4620/class/${classData.class}`);
  }

  return (
    <div className="class-page flex-grow-1">
      <div className="list-of-class d-flex flex-column align-items-end p-5">
        {students.length > 0 ? (
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
                {students.map((student) => {
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
        <div className="class-actions d-flex gap-2">
          <button className="btn open-style rounded-3 d-flex align-items-center gap-2">
            <span>Add new student</span>
            <img src={new_icon} alt="" width={"18"} />
          </button>
          <button onClick={deleteClass} className="btn btn-danger rounded-3">Delete class</button>
        </div>
      </div>
    </div>
  );
}
