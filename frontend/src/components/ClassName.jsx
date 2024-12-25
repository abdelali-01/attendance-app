import React from 'react'

export default function ClassName({classData}) {
  return (
    <div className="class-information w-100 px-md-5 px-sm-3 my-5">
    <div className="class-name w-100">
      <h5 className="fw-bold ">
        {classData.system} - {classData.class}
      </h5>
        <h5>{classData.speciality} </h5>
    </div>
  </div>
  )
}
