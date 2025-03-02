import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ClassItem({ classe }) {
  const serverUri = process.env.REACT_APP_BASE_URI;

  const { user } = useSelector(state => state.user);

  const unenroll = async () => {
    const confirm = window.confirm(
      "Are you sure you want to unenroll from this class?"
    );

    
    if (confirm) {
      try {
        await axios.put(`${serverUri}/student/unenroll/${user}`, {classId : classe._id});
        window.location.reload();
      } catch (error) {
        console.error("error during unenroll the class", error);
        alert("Faild to unenroll This class , Please Try again !");
      }
    }
  };

  return (
    <div className="class-item border rounded-2 py-3 px-4 w-100 my-2 position-relative">
      <div
        className="dropdown position-absolute"
        style={{
          right: "5px",
          top: "0",
        }}
      >
        <i
          className="fa-solid fa-ellipsis-vertical fs-4 p-3"
          role="button"
          data-bs-toggle="dropdown"
        ></i>
        <ul className="dropdown-menu">
          <li onClick={unenroll}>Unenroll</li>
        </ul>
      </div>
      <h5 style={{ textTransform: "capitalize" }}>{classe.module}</h5>
      <p>{classe.class}</p>
      <p className="mb-0 mt-4">{classe.speciality || classe.system}</p>
    </div>
  );
}
