import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function StudentAttendance({student}) {
    const [percentage , setPercentage] = useState(100);

    useEffect(()=>{
        const attendances = student.attendance ;
        const absences = student.absences ;
        if(absences === 0){
          return setPercentage(100)
        }
        
        // calculate the attendance percentage
        const percentage = (attendances / (attendances + absences))*100
        
        setPercentage(percentage.toFixed(0))
    },[percentage , student.attendances , student.absences])

  return (
    <div className="d-flex align-items-center gap-3 rounded-4 border p-2 mb-3">
      <div class="progress-circle">
        <div
          class="circle"
          style={{
            background: `conic-gradient(${percentage < 50 ? ' #FF5659' : '#57FFA8' } 0%, ${percentage <50 ? '#FF5659' : '#57FFA8'} ${percentage}%, #e0e0e0 ${percentage}%)`,
          }}
        >
          <div class="mask full">
            <div class="fill"></div>
          </div>
          <div class="mask half">
            <div class="fill"></div>
          </div>
          <div class={`inside-circle ${percentage < 50 ? 'text-danger' : "text-success"}`}>{percentage}%</div>
        </div>
      </div>
      <div className="student-information" style={{ maxWidth : "300px"}}>
        <span className="fw-semibold" style={{textTransform : "capitalize" }}>{student.familyName} {student.name}</span>
        <p className="mb-0">{student.matricule}</p>
      </div>
    </div>
  );
}
