import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./viewStudent.css"

export default function ViewStudent() {
  const { class: className, matricule } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4620/student/${matricule}`
        );
        setStudent(res.data);
      } catch (error) {
        alert("Faild , please try again !");
        navigate("/" + className);
        console.log(error);
      }
    };
    fetchData();
  });
  return (
    <div className="view-student mt-5 d-flex justify-content-center flex-grow-1">
        {student === null ? (
          <>
          <p>Loading</p>
          </>
        ) : (
          <div className="container-view d-flex justify-content-center flex-grow-1 p-3" style={{
            height : "fit-content"
          }}>
            <div
              className="keys mt-5"
              style={{
                flexGrow : ".3"
              }}
            >
              <p >Matricule</p>
              <p >Full name</p>
              <p >Email</p>
              <p >phone number</p>
              <p >Birth date</p>
              <p >Absences</p>
              <p >Attendance mark</p>
            </div>
            <div className="values mt-5">
              <p className="fw-semibold">{matricule}</p>
              <p className="fw-semibold" style={{ textTransform: "capitalize" }}>
                {student.familyName} {student.name}
              </p>
              <p>{student.email}</p>
              <p>{student.phone ? student.phone : "not selected"}</p>
              <p>{student.birth ? student.birth.split('T')[0] : "not selected"}</p>
              <p>{student.absences}</p>
              <p className="fw-semibold text-primary">{student.attendanceMark}/5</p>
            </div>
          </div>
        )}
    </div>
  );
}
