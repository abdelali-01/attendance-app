import React from "react";
import not from "../components/icons/not.svg";

export default function NoDisponibleFeature() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
      }}
    >
      <div className="d-flex flex-column align-items-center">
        <h3>Feature Not available !</h3>
        <img src={not} alt="" width={200} />
      </div>
    </div>
  );
}
