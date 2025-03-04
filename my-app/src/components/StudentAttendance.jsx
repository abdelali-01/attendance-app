import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function StudentAttendance({
  student,
  selectedClass,
  fromStudent,
}) {
  const [percentage, setPercentage] = useState(100);
  const [currentClass, setCurrentClass] = useState(null);

  useEffect(()=>{
    if (selectedClass && !fromStudent) {
      const studentClass = student.classes.find(
        (c) => c.classId && c.classId.toString() === selectedClass.toString()
      );
      setCurrentClass(studentClass);
    }

    if (selectedClass && fromStudent) {
      setCurrentClass({
        attendances: selectedClass.attendances,
        absences: selectedClass.absences,
      });
    }
  },[selectedClass , fromStudent , student])

  
  useEffect(() => {
    if (currentClass) {
      const attendances = currentClass.attendances;
      const absences = currentClass.absences;
      if (absences === 0) {
        return setPercentage(100);
      }

      // calculate the attendance percentage
      const percentage = (attendances / (attendances + absences)) * 100;

      setPercentage(percentage.toFixed(0));
    }
  }, [percentage,currentClass]);

  return (
    <div className="d-flex align-items-center gap-3 p-2">
      <div className="progress-circle">
        <div
          className="circle"
          style={{
            background: `conic-gradient(${
              percentage < 50 ? " #FF5659" : "#57FFA8"
            } 0%, ${
              percentage < 50 ? "#FF5659" : "#57FFA8"
            } ${percentage}%, #e0e0e0 ${percentage}%)`,
          }}
        >
          <div className="mask full">
            <div className="fill"></div>
          </div>
          <div className="mask half">
            <div className="fill"></div>
          </div>
          <div
            className={`inside-circle ${
              percentage < 50 ? "text-danger" : "text-success"
            }`}
          >
            {percentage}%
          </div>
        </div>
      </div>
      <div className="student-information" style={{ maxWidth: "300px" }}>
        <span className="fw-semibold" style={{ textTransform: "capitalize" }}>
          {student.familyName} {student.name}
        </span>
        <p className="mb-0">{student.matricule}</p>
      </div>
    </div>
  );
}
