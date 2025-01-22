import React from "react";

export default function Loader() {
  return (
    <div
      className="position-relative"
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="position-absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <div
          className="spinner-border position-absolute"
          role="status"
          style={{
            color: "var(--primary)",
          }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
