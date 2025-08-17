import React, { useEffect, useState } from "react";
// import delete_icon from "./icons/trash.svg";
import update_icon from "../icons/pen.svg";
import absent_icon from "../icons/absent.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Popup from "../modals/Popup";

export default function StudentItem({ student, posibilityStatus, i }) {
  const { classId } = useParams();
  const [currentClass, setCurrentClass] = useState(null);

  const [attendance, setAttendance] = useState(null); // Track attendance
  const [absences, setAbsences] = useState(null); // Track absences
  const [mark, setMark] = useState(null);

  useEffect(() => {
    // Find the corresponding class from student's classes
    const foundClass = student.classes.find((c) => c.classId === classId);

    // Update state with the new values
    if (foundClass) {
      setCurrentClass(foundClass);
      setAttendance(foundClass.attendances);
      setAbsences(foundClass.absences);
      setMark(foundClass.attendanceMark);
    }
  }, [student, classId]);

  // manage the popup display
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(() => {
    // Load initial status from session storage or default to "pending"
    const savedStatus = sessionStorage.getItem(`status-${student._id}`);
    return savedStatus || "pending";
  });

  // re-render the status
  useEffect(() => {
    const savedStatus = sessionStorage.getItem(`status-${student._id}`);
    setStatus(savedStatus || "pending");
  }, [posibilityStatus, student._id]);

  // Persist the status in session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem(`status-${student._id}`, status);
  }, [status, student._id]);

  // Check for attendance updates
  // WebSocket Connection
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4620");

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ type: "joinClass" , classId}));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "studentUpdate") {
        if (data.studentId === student._id) {
          // Update only if attendance increased
          if (data.updatedAttendance > attendance) {
            setStatus("present");
          }
          setAttendance(data.updatedAttendance);
          setAbsences(data.updatedAbsences);
          setMark(data.updatedMark);
        }
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, [classId, student._id, attendance]);

  // set the absent to the student from teacher
  const setAbsent = async () => {
    const lastMarkedAbsent = localStorage.getItem(`lastAbsent-${student._id}`);
    const now = new Date();

    // Check if the last marked time exists and is within 24 hours
    if (lastMarkedAbsent && now - new Date(lastMarkedAbsent) < 90 * 60 * 1000) {
      alert("You can only mark the student as absent once in 1h30min .");
      return;
    }

    try {
      await axios.put(
        `/user/absence/${student._id}`,
        {
          classId,
        },
        { withCredentials: true }
      );
      setStatus("absent");
      // Store the current time as the last marked time
      localStorage.setItem(`lastAbsent-${student._id}`, now.toISOString());
    } catch (error) {
      console.error("error during set the student absent ", error);
      alert("Faild , please try again !");
    }
  };

  return (
    <>
      <tr className="student-items">
        <td className="text-black-50">{i}</td>
        <td className="fw-semibold">{student.matricule}</td>
        <td
          className="d-flex flex-column"
          style={{
            maxWidth: "200px",
          }}
        >
          <span
            className="fw-semibold"
            style={{
              textTransform: "capitalize",
            }}
          >
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
        <td className="text-center">{mark === undefined ? "no mark" : mark}</td>
        <td className="text-center">
          <img
            role="button"
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

          <img
            role="button"
            src={update_icon}
            alt=""
            onClick={() => setIsVisible(true)}
          />
        </td>
      </tr>
      <div className="update-popup">
        <Popup
          display={isVisible}
          closePopup={() => setIsVisible(false)}
          updateStudent={{ absences, mark, student }}
          currentClass={currentClass}
        />
      </div>
    </>
  );
}
