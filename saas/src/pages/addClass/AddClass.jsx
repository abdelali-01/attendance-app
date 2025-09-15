import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClass } from "../../store/class/classHandler";
import { useToast } from "../../components/Toast/ToastContainer";

export default function AddClass() {
  // const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [classe, setClasse] = useState({
    class: "",
    speciality: "",
    system: "",
    module: "",
    deleguate: "",
    d_AttendanceMark: "",
    minusWithAbsence: "",
  });

  const handleChange = (e) => {
    setClasse({ ...classe, [e.target.name]: e.target.value });
  };

  // focus styles helper
  const onFocusStyle = (e) => {
    e.target.style.borderColor = "#667eea";
    e.target.style.background = "#fff";
    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.12)";
  };
  const onBlurStyle = (e) => {
    e.target.style.borderColor = "#e2e8f0";
    e.target.style.background = "#f8fafc";
    e.target.style.boxShadow = "none";
  };

  // post the class in database
  const fetchData = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await dispatch(addClass(classe, navigate));
    setIsSubmitting(false);

    if (result) {
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message);
      }
    }
  };

  const fieldStyle = {
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    padding: "0.7rem 0.9rem",
    fontSize: "15px",
    background: "#f8fafc",
    transition: "all .2s ease",
  };

  return (
    <div
      className="add-class flex-grow-1 p-md-4 py-3"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <div className="container" style={{ maxWidth: 1100 }}>
        {/* Header */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="d-none d-md-flex"
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              boxShadow: "0 8px 32px rgba(102,126,234,.3)",
            }}
          >
            🏫
          </div>
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "#374151" }}>
              Create a Class
            </h2>
            <p className="text-muted mb-0" style={{ fontSize: 15 }}>
              Define class details and controls. You can update these later.
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          className="card"
          style={{
            border: "1px solid rgba(0,0,0,.05)",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,.1)",
            padding: "1.5rem",
          }}
        >
          <form onSubmit={fetchData}>
            {/* Details */}
            <div className="mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: "#374151" }}>
                Class Details
              </h5>
              <div className="row g-3">
                <div className="col-lg-4">
                  <label htmlFor="system" className="form-label fw-medium">
                    Study System
                  </label>
                  <select
                    value={classe.system}
                    onChange={handleChange}
                    name="system"
                    id="system"
                    required
                    className="form-select"
                    style={fieldStyle}
                    onFocus={onFocusStyle}
                    onBlur={onBlurStyle}
                  >
                    <option value="" hidden>Select study system</option>
                    <option value="licence">Licence</option>
                    <option value="master">Master</option>
                    <option value="Proffesionnel licence">Proffesionnel Licence</option>
                    <option value="engineer">Engineer</option>
                    <option value="classic">Classic</option>
                  </select>
                  <small className="text-muted">Required</small>
                </div>

                <div className="col-lg-4">
                  <label htmlFor="speciality" className="form-label fw-medium">
                    Speciality
                  </label>
                  <input
                    value={classe.speciality}
                    onChange={handleChange}
                    type="text"
                    name="speciality"
                    id="speciality"
                    placeholder="e.g. Computer Science"
                    required
                    className="form-control"
                    style={fieldStyle}
                    onFocus={onFocusStyle}
                    onBlur={onBlurStyle}
                  />
                  <small className="text-muted">Required</small>
                </div>

                <div className="col-lg-4">
                  <label htmlFor="module" className="form-label fw-medium">
                    Module
                  </label>
                  <input
                    type="text"
                    name="module"
                    id="module"
                    required
                    placeholder="e.g. Web Engineering"
                    value={classe.module}
                    onChange={handleChange}
                    className="form-control"
                    style={fieldStyle}
                    onFocus={onFocusStyle}
                    onBlur={onBlurStyle}
                  />
                  <small className="text-muted">Required</small>
                </div>
              </div>
            </div>

            {/* Identification */}
            <div className="mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: "#374151" }}>
                Identification
              </h5>
              <div className="row g-3">
                <div className="col-lg-6">
                  <label htmlFor="class" className="form-label fw-medium">
                    Class Name
                  </label>
                  <input
                    value={classe.class}
                    onChange={handleChange}
                    type="text"
                    name="class"
                    id="class"
                    placeholder="e.g. CS-3A"
                    required
                    className="form-control"
                    style={fieldStyle}
                    onFocus={onFocusStyle}
                    onBlur={onBlurStyle}
                  />
                  <small className="text-muted">Required</small>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="deleguate" className="form-label fw-medium">
                    Class Delegate
                  </label>
                  <input
                    type="text"
                    name="deleguate"
                    id="deleguate"
                    placeholder="Delegate name (optional)"
                    value={classe.deleguate}
                    onChange={handleChange}
                    className="form-control"
                    style={fieldStyle}
                    onFocus={onFocusStyle}
                    onBlur={onBlurStyle}
                  />
                  <small className="text-muted">Optional</small>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mb-2">
              <h5 className="fw-semibold mb-3" style={{ color: "#374151" }}>
                Attendance Controls
              </h5>
              <div className="row g-3">
                <div className="col-lg-6">
                  <label htmlFor="d_AttendanceMark" className="form-label fw-medium">
                    Attendance Mark (A-mark)
                  </label>
                  <input
                    type="number"
                    step={"0.25"}
                    min={"0"}
                    name="d_AttendanceMark"
                    id="d_AttendanceMark"
                    value={classe.d_AttendanceMark}
                    placeholder="e.g. 5"
                    required
                    onChange={handleChange}
                    className="form-control"
                    style={fieldStyle}
                    onFocus={onFocusStyle}
                    onBlur={onBlurStyle}
                  />
                  <small className="text-muted">Required. Value given for full attendance.</small>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="minusWithAbsence" className="form-label fw-medium">
                    Deduction Per Absence
                  </label>
                  <input
                    type="number"
                    step={"0.25"}
                    min={"0"}
                    name="minusWithAbsence"
                    id="minusWithAbsence"
                    value={classe.minusWithAbsence}
                    placeholder="e.g. 0.5"
                    required
                    onChange={handleChange}
                    className="form-control"
                    style={fieldStyle}
                    onFocus={onFocusStyle}
                    onBlur={onBlurStyle}
                  />
                  <small className="text-muted">Required. Subtracted from A-mark when absent.</small>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn rounded-3 fw-semibold px-4 py-2"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting
                    ? "#e2e8f0"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: isSubmitting ? "#9ca3af" : "white",
                  border: "none",
                  transition: "all .3s ease",
                  minWidth: 140,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 4px 16px rgba(102, 126, 234, .3)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "none";
                  e.target.style.boxShadow = "none";
                }}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-plus me-2"></i>
                    Create Class
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}