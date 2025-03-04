import React, { useState, useRef } from "react";

const UpgradePopup = () => {
  const [popupStyle, setPopupStyle] = useState({ display: "none" });
  const [popupContent, setPopupContent] = useState("standard");
  const popupRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (event) => {
    if (event.target.classList.contains("upgrade-trigger")) {
      const rect = event.target.getBoundingClientRect();

      setPopupContent(
        event.target.getAttribute("data-plan") || "standard"
      );

      setPopupStyle({
        display: "block",
        top: `${rect.top + window.scrollY + 20}px`,
        left: `${rect.right / 2}px`,
      });

      // Clear timeout if user quickly moves back to the trigger
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = (event) => {
    timeoutRef.current = setTimeout(() => {
      if (
        popupRef.current &&
        !popupRef.current.matches(":hover") // Check if mouse is inside popup
      ) {
        setPopupStyle({ display: "none" });
      }
    }, 300); // Delay to allow smooth transition
  };

  React.useEffect(() => {
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={popupRef}
      className="upgrade-popup text-center position-absolute p-3 rounded-3"
      style={{
        ...popupStyle,
        zIndex: 10000,
        background: "var(--gray)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        maxWidth : "230px"
      }}
      onMouseEnter={() => clearTimeout(timeoutRef.current)}
      onMouseLeave={() => setPopupStyle({ display: "none" })}
    >
      <h6 className="fw-semibold">Upgrade your plan to use this feature</h6>
      <p className="text-black-50">This plan require {popupContent} plan </p>
      <div className="mt-3">
        <button className="btn open-style w-100">Upgrade now</button>
      </div>
    </div>
  );
};

export default UpgradePopup;
