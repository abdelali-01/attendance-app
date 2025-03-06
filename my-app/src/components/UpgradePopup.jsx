import React, { useState, useRef, useEffect } from "react";

const UpgradePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState("standard");
  const popupRef = useRef(null);

  // Function to handle clicks on any "upgrade-trigger" button
  const handleTriggerClick = (event) => {
    if (event.target.classList.contains("upgrade-trigger")) {
      setPopupContent(event.target.getAttribute("data-plan") || "standard");
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.classList.contains("upgrade-trigger")
      ) {
        setIsOpen(false);
        document.body.style.overflow = "";
      }
    };

    // Listen for clicks globally
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleTriggerClick);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleTriggerClick);
    };
  }, []);

  return (
    <>
      {/* Popup (Centered) */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            zIndex: "10000",
            backdropFilter: "blur(5px)",
            width: "100%",
            height: "100vh",
            top: "0",
            left: "0",
          }}
        >
          <div
            ref={popupRef}
            className="upgrade-popup text-center p-3 rounded-3"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10000,
              background: "var(--gray)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              maxWidth: "300px",
            }}
          >
            <h6 className="fw-semibold">
              Upgrade your plan to use this feature
            </h6>
            <p className="text-black-50">
              This plan requires {popupContent} plan.
            </p>
            <div className="mt-3">
              <button className="btn open-style w-100">Upgrade now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpgradePopup;
