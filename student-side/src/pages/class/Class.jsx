import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment"

export default function Class() {
  const [studentClass, setStudentClass] = useState(null);
  const student = JSON.parse(localStorage.getItem("Student"));

  console.log(studentClass);

  useEffect(() => {
    const fetchClass = async () => {
      const res = await axios.get(
        `http://localhost:4620/class/getclass/${student.class}`
      );
      setStudentClass(res.data);
    };

    fetchClass();
  }, [student?.class]);
  return (
    <div className="flex-grow-1 px-md-5 px-3 my-5">
      {studentClass ? (
        <div className="class w-100 my-5">
          <div className="class-name w-100">
            <h5 className="fw-bold ">
              {studentClass.system} - {studentClass.class}
            </h5>
            <h5>{studentClass.speciality} </h5>
          </div>
          <div className="open-time mt-5">
            <p className="fw-semibold text-black-50">Class opened <span className="text-primary">{moment(studentClass.updatedAt).fromNow()}</span></p>
          </div>
          <div className="student-interaction w-100 d-flex flex-column align-items-end">
            <div className="btns d-flex align-items-center gap-3">
               <button className={`btn btn-${studentClass.posibility ? "success" : "secondary"}`} disabled={!studentClass.posibility}>I'm present</button>
               <button className={`btn btn-${studentClass.posibility ? "danger" : "secondary"}`} disabled={!studentClass.posibility}>I'm absent</button>
            </div>
            <div className="drop-justification">
                
            </div>
          </div>
        </div>
      ) : (
        <p className="fw-semibold px-md-5 px-sm-3 my-5">Loading class data...</p>
      )}
      
    </div>
  );
}
