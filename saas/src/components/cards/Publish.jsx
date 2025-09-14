import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { safeMap, safeFilter } from "../../utils/safeArray";
import { createReport } from "../../store/reports/reportHandler";

export default function Publish() {
  const { classes } = useSelector((state) => state.classes);
  const { loading } = useSelector((state) => state.reports);
  const dispatch = useDispatch();
  
  // manage the report with states
  const [report, setReport] = useState("");
  const [reportClasses, setReportClasses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // handle checkbox change
  const handleCheckboxChange = (classId) => {
    setReportClasses((prevState) => {
      if (prevState.includes(classId)) {
        // If classId is already selected, remove it
        return safeFilter(prevState, (id) => id !== classId);
      } else {
        // Else add classId to the list
        return [...prevState, classId];
      }
    });
  };

  // Initialize classes as checked when classes are loaded
  useEffect(() => {
    if (classes && classes.length > 0 && reportClasses.length === 0) {
      const classesId = safeMap(classes, (c) => c._id);
      setReportClasses(classesId);
    }
  }, [classes]);

  // submit the report
  const shareReport = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (reportClasses.length > 0) {
      const result = await dispatch(createReport({ report, classes: reportClasses }));
      
      if (result.success) {
        setReport("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } else {
      alert("You have to select one class minimum !");
    }
    
    setIsSubmitting(false);
  };

  const characterCount = report.length;
  const maxCharacters = 1000;

  return (
    <div 
      className="publish p-md-4"
    >
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div 
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "600"
          }}
        >
          ✍️
        </div>
        <div>
          <h4 className="mb-1 fw-bold" style={{ color: "#374151", fontSize: "24px" }}>
            Publish Your Report & Remarks
          </h4>
          <p className="text-muted mb-0" style={{ fontSize: "15px" }}>
            Share insights and guidance with your students
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div 
          className="alert alert-success d-flex align-items-center gap-2 mb-4"
          style={{
            borderRadius: "12px",
            border: "none",
            background: "#f0f9ff",
            color: "#0369a1",
            fontSize: "14px"
          }}
        >
          <i className="fa-solid fa-check-circle"></i>
          Report published successfully!
        </div>
      )}

      <form onSubmit={shareReport}>
        <div className="row g-4">
          {/* Report Text Area */}
          <div className="col-lg-8">
            <div className="report-field">
              <label 
                htmlFor="report" 
                className="form-label fw-semibold"
                style={{ color: "#374151", fontSize: "16px", marginBottom: "8px" }}
              >
                Report Content
              </label>
              <div className="position-relative">
                <textarea
                  className="form-control"
                  maxLength={maxCharacters}
                  name="report"
                  id="report"
                  placeholder="Dear students, I wanted to share some important updates and feedback..."
                  style={{
                    minHeight: "120px",
                    maxHeight: "300px",
                    height: "150px",
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    padding: "1rem",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    resize: "vertical",
                    transition: "all 0.2s ease",
                    background: "#f8fafc"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.background = "#fff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.background = "#f8fafc";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                />
                <div 
                  className="position-absolute"
                  style={{
                    bottom: "8px",
                    right: "12px",
                    fontSize: "12px",
                    color: characterCount > maxCharacters * 0.9 ? "#ef4444" : "#6b7280",
                    fontWeight: "500"
                  }}
                >
                  {characterCount}/{maxCharacters}
                </div>
              </div>
            </div>
          </div>

          {/* Class Selection */}
          <div className="col-lg-4">
            <div className="class-selection">
              <label 
                className="form-label fw-semibold"
                style={{ color: "#374151", fontSize: "16px", marginBottom: "12px" }}
              >
                Select Target Classes
              </label>
              <div 
                className="classes-container"
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "0.75rem",
                  border: "2px solid #e2e8f0",
                  maxHeight: "200px",
                  overflowY: "auto",
                  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.06)"
                }}
              >
                {!classes ? (
                  <div className="text-center py-3">
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : classes.length < 1 ? (
                  <div className="text-center py-3">
                    <i className="fa-solid fa-folder-open text-muted mb-2" style={{ fontSize: "24px" }}></i>
                    <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                      No classes available
                    </p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-1">
                    {safeMap(classes, (c) => (
                      <CheckClass
                        key={c._id}
                        c={c}
                        handleCheckboxChange={handleCheckboxChange}
                        isChecked={reportClasses.includes(c._id)}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Selection Summary */}
              <div 
                className="mt-3 p-3 rounded-3 d-flex align-items-center"
                style={{
                  background: reportClasses.length > 0 ? "#f0f9ff" : "#fef2f2",
                  border: `1px solid ${reportClasses.length > 0 ? "#bae6fd" : "#fecaca"}`,
                  fontSize: "14px",
                  color: reportClasses.length > 0 ? "#0369a1" : "#dc2626",
                  fontWeight: "500"
                }}
              >
                <i 
                  className={`fa-solid ${reportClasses.length > 0 ? "fa-check-circle" : "fa-exclamation-triangle"} me-2`}
                  style={{ fontSize: "16px" }}
                ></i>
                <span>
                  {reportClasses.length > 0 
                    ? `${reportClasses.length} class${reportClasses.length !== 1 ? 'es' : ''} selected`
                    : "Please select at least one class"
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-end mt-4">
          <button 
            type="submit"
            className="btn px-4 py-2 rounded-3 fw-semibold"
            disabled={isSubmitting || loading || reportClasses.length === 0}
            style={{
              background: isSubmitting || loading || reportClasses.length === 0 
                ? "#e2e8f0" 
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: isSubmitting || loading || reportClasses.length === 0 
                ? "#9ca3af" 
                : "white",
              border: "none",
              fontSize: "15px",
              minWidth: "120px",
              transition: "all 0.3s ease",
              cursor: isSubmitting || loading || reportClasses.length === 0 ? "not-allowed" : "pointer"
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && !loading && reportClasses.length > 0) {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = "none";
            }}
          >
            {isSubmitting || loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Publishing...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane me-2"></i>
                Share Report
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function CheckClass({ c, handleCheckboxChange, isChecked }) {
  return (
    <div 
      className="class-item"
      style={{
        background: isChecked ? "#f0f9ff" : "#f8fafc",
        border: `2px solid ${isChecked ? "#3b82f6" : "#e2e8f0"}`,
        borderRadius: "10px",
        padding: "0.75rem",
        transition: "all 0.2s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden"
      }}
      onClick={() => handleCheckboxChange(c._id)}
      onMouseEnter={(e) => {
        if (!isChecked) {
          e.currentTarget.style.background = "#f1f5f9";
          e.currentTarget.style.borderColor = "#cbd5e1";
        } else {
          e.currentTarget.style.background = "#dbeafe";
          e.currentTarget.style.borderColor = "#2563eb";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isChecked ? "#f0f9ff" : "#f8fafc";
        e.currentTarget.style.borderColor = isChecked ? "#3b82f6" : "#e2e8f0";
      }}
    >
      {/* Custom Checkbox */}
      <div className="d-flex align-items-center">
        <div 
          className="custom-checkbox me-3"
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            border: `2px solid ${isChecked ? "#3b82f6" : "#d1d5db"}`,
            background: isChecked ? "#3b82f6" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            flexShrink: 0
          }}
        >
          {isChecked && (
            <i 
              className="fa-solid fa-check"
              style={{
                color: "white",
                fontSize: "12px",
                fontWeight: "bold"
              }}
            ></i>
          )}
        </div>
        
        <div className="flex-grow-1">
          <div 
            className="fw-semibold"
            style={{
              fontSize: "14px",
              color: "#374151",
              textTransform: "capitalize",
              marginBottom: "2px"
            }}
          >
            {c.class}
          </div>
          {c.module && (
            <div 
              className="text-muted"
              style={{
                fontSize: "12px",
                fontWeight: "500"
              }}
            >
              {c.module}
            </div>
          )}
        </div>
        
        {/* Selection indicator */}
        {isChecked && (
          <div 
            className="selection-indicator"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#3b82f6",
              flexShrink: 0
            }}
          ></div>
        )}
      </div>
      
      {/* Hidden checkbox for form submission */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {}} // Handled by div onClick
        style={{ display: "none" }}
      />
    </div>
  );
}
