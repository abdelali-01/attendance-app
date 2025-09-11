import React from 'react'

export default function ClassName({classData}) {
  return (
    <div className="class-information w-100 my-5">
    <div className="class-name w-100">
      <h5 className="fw-bold ">
        <span style={{textTransform : "capitalize"}}>{classData.module}</span> - {classData.class.toUpperCase()}
      </h5>
        <h5>{classData.speciality || classData.system} </h5>
    </div>
  </div>
  )
}
