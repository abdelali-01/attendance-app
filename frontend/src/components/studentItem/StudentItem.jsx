import React, { useEffect, useState } from "react";
import delete_icon from "../icons/trash.svg";
import update_icon from "../icons/pen.svg";
import absent_icon from "../icons/absent.svg";
import axios from "axios";

export default function StudentItem({ student, posibilityStatus }) {
  const [attendance, setAttendance] = useState(student.attendance); // Track attendance
  const [status, setStatus] = useState(() => {
    // Load initial status from session storage or default to "pending"
    const savedStatus = sessionStorage.getItem(`status-${student._id}`);
    return savedStatus || "pending";
  });
  const [absences, setAbsences] = useState(student.absences); // Track absences
  const [mark, setMark] = useState(student.attendanceMark);

  // Persist the status in session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem(`status-${student._id}`, status);
  }, [status, student._id]);

  // Check for attendance updates
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the student's data to check the updated attendance
        const res = await axios.get(
          `http://localhost:4620/student/${student._id}`
        );
        const updatedAttendance = res.data.attendance;
        const updatedAbsences = res.data.absences;
        const updatedMark = res.data.attendanceMark;

        // If the attendance has increased, update the status
        if (updatedAttendance > attendance) {
          setStatus("present");
        }

        // Update the local state with the latest attendance
        setAttendance(updatedAttendance);
        setAbsences(updatedAbsences);
        setMark(updatedMark);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    // Fetch data every 5 seconds to simulate real-time updates
    setInterval(fetchData, 1000);

    // Fetch data immediately when the component mounts
    fetchData();
  }, [attendance, student._id]);

  // set the absent to the student from teacher
  const setAbsent = async () => {
    const lastMarkedAbsent = localStorage.getItem(`lastAbsent-${student._id}`);
    const now = new Date();

    // Check if the last marked time exists and is within 24 hours
    if (
      lastMarkedAbsent &&
      now - new Date(lastMarkedAbsent) < 24 * 60 * 60 * 1000
    ) {
      alert("You can only mark the student as absent once in 24 hours.");
      return;
    }

    await axios.put(`http://localhost:4620/admin/absence/${student._id}`);
    setStatus("absent");

    // Update absences count after marking absent
    setAbsences((prev) => prev + 1);

    // Store the current time as the last marked time
    localStorage.setItem(`lastAbsent-${student._id}`, now.toISOString());
  };

  // delete student 
  const deleteStudent= async () => {
    const confirm = window.confirm("Are you sure to delete "+ student.familyName);

    if(confirm) {
      await axios.delete(`http://localhost:4620/admin/deleteStudentAccount/${student._id}`);
      window.location.reload();
    }
  }
  return (
    <>
      <tr className="student-items">
        <td className="fw-semibold">{student.matricule}</td>
        <td className="d-flex flex-column">
          <span className="fw-semibold" style={{
            textTransform : "capitalize"
          }}>
            {student.familyName + " " + student.name}
          </span>
          <span className="text-black-50">{student.email}</span>
        </td>
        {status === "pending" ? (
          <td className="status pendingStatus">
            <li>Pending</li>
          </td>
        ) : status === "present" ? (
          <td className="status presentStatus">
            <li>Present</li>
          </td>
        ) : status === "absent" ? (
          <td className="status absentStatus">
            <li>Absent</li>
          </td>
        ) : (
          <></>
        )}
        <td className="text-center">{absences}</td>
        <td className="text-center">{mark}</td>
        <td>
          <img
            role="button"
            className="me-2"
            src={absent_icon}
            alt=""
            onClick={() => {
              posibilityStatus
                ? setAbsent()
                : alert(
                    "You can't mark the student as absent when the class is closed."
                  );
            }}
          />
          <img role="button" src={update_icon} alt="" />
          <img onClick={deleteStudent} role="button" src={delete_icon} alt="" />
        </td>
      </tr>
      <hr />
    </>
  );
}
