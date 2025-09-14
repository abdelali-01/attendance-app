import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/class/classHandler";

export default function ClassItem({ classe, showMenu }) {
  const serverUri = import.meta.env.VITE_BASE_URI;

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const unenroll = async () => {
    const confirm = window.confirm(
      "Are you sure you want to unenroll from this class?"
    );

    if (confirm) {
      try {
        await axios.put(`${serverUri}/user/unenroll/${user._id}`, { classId: classe._id }, { withCredentials: true });
        dispatch(getClasses());
      } catch (error) {
        console.error("error during unenroll the class", error);
        alert("Faild to unenroll This class , Please Try again !");
      }
    }
  };

  // Accent icon (book)
  const BookIcon = (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" style={{ color: "#6366f1" }}>
      <rect width="24" height="24" rx="12" fill="#EEF2FF" />
      <path d="M8 7h8v10H8z" stroke="#6366f1" strokeWidth="1.5" fill="#fff" />
      <path d="M8 7v10M16 7v10" stroke="#6366f1" strokeWidth="1.5" />
    </svg>
  );

  return (
    <div
      className="class-item w-100 h-100 position-relative"
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px #6366f122",
        padding: "1.5rem 1.2rem 1.2rem 1.2rem",
        minHeight: 160,
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "pointer",
        border: "none",
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = "0 8px 32px #6366f144"; e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = "0 4px 24px #6366f122"; e.currentTarget.style.transform = "none"; }}
    >
      {/* 3-dots menu only if showMenu is true */}
      {showMenu && (
        <div
          className="dropdown position-absolute"
          style={{ right: 10, top: 8 }}
        >
          <i
            className="fa-solid fa-ellipsis-vertical fs-5 p-2"
            role="button"
            data-bs-toggle="dropdown"
          ></i>
          <ul className="dropdown-menu">
            <li onClick={unenroll}>Unenroll</li>
          </ul>
        </div>
      )}
      <div className="d-flex align-items-center mb-2" style={{ gap: 10 }}>
        <div>{BookIcon}</div>
        <h5 className="mb-0 fw-bold" style={{ textTransform: "capitalize", fontSize: 20, color: "#3730a3" }}>{classe.module}</h5>
      </div>
      <div className="mb-1" style={{ color: "#6366f1", fontWeight: 500, fontSize: 16 }}>{classe.class}</div>
      <div className="text-secondary" style={{ fontSize: 15 }}>{classe.speciality || classe.system}</div>
    </div>
  );
}
