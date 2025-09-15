import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClass,
  findClass,
  updateClass,
  updateClassCode,
} from "../../store/class/classHandler";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/ui/Loader";
import { useToast } from "../../components/Toast/ToastContainer";

function Settings() {
  const { user } = useSelector((state) => state.user);
  const { classId } = useParams();
  const { classes, foundedClass } = useSelector((state) => state.classes);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showError, showSuccess } = useToast();

  const [classe, setClasse] = useState({
    class: "",
    speciality: "",
    system: "",
    module: "",
    deleugate: "",
    d_AttendanceMark: null,
    minusWithAbsence: null,
  });
  const handleChange = (e) => {
    setClasse({ ...classe, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(findClass(classes, classId));
    if (foundedClass) {
      setClasse({
        class: foundedClass.class,
        speciality: foundedClass.speciality,
        system: foundedClass.system,
        module: foundedClass.module,
        deleugate: foundedClass.deleugate,
        d_AttendanceMark: foundedClass.d_AttendanceMark,
        minusWithAbsence: foundedClass.minusWithAbsence,
      });
      setIsCheked(foundedClass.reminder.active);
      setSelectedDays(foundedClass.reminder.reminderDays);
      setTime(foundedClass.reminder.reminderTime);
    }
  }, [classId, classes, foundedClass, dispatch]);

  const [isChecked, setIsCheked] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [time, setTime] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday",
    "Sunday",
  ];

  const handleCheckboxChange = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      updateClass(
        classe,
        {
          active: isChecked,
          reminderDays: selectedDays,
          reminderTime: time,
        },
        classId
      )
    );

    if (res.success) {
      showSuccess(res.message);
    } else {
      showError(res.message);
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

  return (
    <div
      className="class-settings conatiner py-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      {loading || !foundedClass ? (
        <Loader />
      ) : (
        <>
          {/* Header */}
          <div className="container" style={{ maxWidth: 1100 }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="d-none d-md-flex"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 24,
                  boxShadow: "0 8px 32px rgba(102,126,234,.3)",
                }}
              >
                ⚙️
              </div>
              <div>
                <h2 className="fw-bold mb-1" style={{ color: "#374151" }}>
                  Class Settings
                </h2>
                <p className="text-muted mb-0" style={{ fontSize: 15 }}>
                  Update class details, invite code, and controls.
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
              <form onSubmit={submitHandler}>
                {/* Class Details */}
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
                        <option selected hidden>
                          Select study system
                        </option>
                        <option value="licence">Licence</option>
                        <option value="master">Master</option>
                        <option value="Proffesionnel licence">
                          Proffesionnel Licence
                        </option>
                        <option value="engineer">engineer</option>
                        <option value="classic">classic</option>
                      </select>
                      <small className="text-muted">Required</small>
                    </div>
                    <div className="col-lg-4">
                      <label
                        htmlFor="speciality"
                        className="form-label fw-medium"
                      >
                        Speciality
                      </label>
                      <input
                        value={classe.speciality}
                        onChange={handleChange}
                        type="text"
                        name="speciality"
                        id="speciality"
                        placeholder="Enter the speciality of class"
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
                        placeholder="your module"
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
                        Class name
                      </label>
                      <input
                        value={classe.class}
                        onChange={handleChange}
                        type="text"
                        name="class"
                        id="class"
                        placeholder="choose class name"
                        required
                        className="form-control"
                        style={fieldStyle}
                        onFocus={onFocusStyle}
                        onBlur={onBlurStyle}
                      />
                      <small className="text-muted">Required</small>
                    </div>
                    <div className="col-lg-6">
                      <label
                        htmlFor="deleguate"
                        className="form-label fw-medium"
                      >
                        Class deleguate
                      </label>
                      <input
                        type="text"
                        name="deleguate"
                        id="deleguate"
                        placeholder="deleguate name"
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
                      <label
                        htmlFor="d_AttendanceMark"
                        className="form-label fw-medium"
                      >
                        A-mark
                      </label>
                      <input
                        type="number"
                        step={"0.25"}
                        name="d_AttendanceMark"
                        id="d_AttendanceMark"
                        value={classe.d_AttendanceMark}
                        placeholder="example : 5"
                        required
                        onChange={handleChange}
                        className="form-control"
                        style={fieldStyle}
                        onFocus={onFocusStyle}
                        onBlur={onBlurStyle}
                      />
                      <small className="text-muted">
                        Required. Value given for full attendance.
                      </small>
                    </div>
                    <div className="col-lg-6">
                      <label
                        htmlFor="minusWithAbsence"
                        className="form-label fw-medium"
                      >
                        Minus with absence
                      </label>
                      <input
                        type="number"
                        step={"0.25"}
                        name="minusWithAbsence"
                        id="minusWithAbsence"
                        value={classe.minusWithAbsence}
                        placeholder="example : 0.5"
                        required
                        onChange={handleChange}
                        className="form-control"
                        style={fieldStyle}
                        onFocus={onFocusStyle}
                        onBlur={onBlurStyle}
                      />
                      <small className="text-muted">
                        Required. Subtracted from A-mark when absent.
                      </small>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Invite code */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: "#374151" }}>
                    Invite code
                  </h5>
                  <div
                    className="d-flex align-items-center justify-content-between gap-3 flex-wrap"
                    style={{
                      background: "#f8fafc",
                      border: "2px solid #e2e8f0",
                      borderRadius: 12,
                      padding: "0.8rem 1rem",
                    }}
                  >
                    <span
                      className="fw-semibold"
                      style={{
                        color: "#374151",
                        fontSize: 14,
                        wordBreak: "break-all",
                      }}
                    >
                      Class code:{" "}
                      <span
                        className="ms-1"
                        style={{
                          background: "#eef2ff",
                          color: "#3730a3",
                          borderRadius: 8,
                          padding: "2px 8px",
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo",
                          border: "1px solid #c7d2fe",
                        }}
                      >
                        {foundedClass.shareCode}
                      </span>
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm px-3 rounded-3 fw-semibold"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        border: "none",
                      }}
                      onClick={async () => {
                        const res = await dispatch(updateClassCode(classId));
                        res.success
                          ? showSuccess(res.message)
                          : showError(res.message);
                      }}
                    >
                      <i className="fa-solid fa-rotate me-2"></i>
                      Reset
                    </button>
                  </div>
                </div>

                <hr />

                {/* Class Controls */}
                <div className="class-controls position-relative">
                  <h5 className="fw-semibold mb-3" style={{ color: "#374151" }}>
                    Class Controls
                    <i
                      className="fa-solid fa-lock ms-2"
                      title="Requires paid plan"
                      style={{
                        color: "#6ee7b7",
                        filter: "drop-shadow(0 0 2px rgba(0,0,0,.1))",
                        fontSize: 13,
                      }}
                    ></i>
                  </h5>
                  <div className="class-control-reminder my-4">
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div>
                        <h6 className="mb-1">Class Reminder</h6>
                        <p className="text-black-50 mb-0" style={{ fontSize: 14 }}>
                          Reminds you to open your class and mark attendance
                        </p>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className={`form-check-input ${
                            user.plan !== "premium" && "upgrade-trigger"
                          }`}
                          type="checkbox"
                          role="switch"
                          checked={isChecked}
                          data-plan="premium"
                          onChange={() =>
                            user.plan === "premium" && setIsCheked(!isChecked)
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="reminder-content my-4 d-flex align-items-start justify-content-between gap-3 flex-wrap"
                      style={{ opacity: isChecked ? "1" : "0.6" }}
                    >
                      <div
                        className="days-selected flex-grow-1"
                        ref={dropdownRef}
                      >
                        <label className="mb-2">Select Reminder Days</label>
                        <button
                          disabled={!isChecked}
                          className="form-control text-start"
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          style={fieldStyle}
                          onFocus={onFocusStyle}
                          onBlur={onBlurStyle}
                        >
                          {selectedDays.length > 0
                            ? selectedDays.join(", ")
                            : "Select Days"}
                        </button>

                        {dropdownOpen && (
                          <div
                            className="bg-white border p-2 mt-1 rounded shadow"
                            style={{ width: "100%" }}
                          >
                            {days.map((day) => (
                              <div key={day} className="form-check">
                                <input
                                  type="checkbox"
                                  id={day}
                                  className="form-check-input"
                                  checked={selectedDays.includes(day)}
                                  onChange={() => handleCheckboxChange(day)}
                                />
                                <label className="form-check-label" htmlFor={day}>
                                  {day}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="time-selected flex-grow-1">
                        <label htmlFor="time" className="mb-2">
                          Select Reminder Time
                        </label>
                        <input
                          disabled={!isChecked}
                          className="w-100 form-control"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          // onFocus={(e) => (e.target.value = "")}
                          placeholder="Select Time"
                          type="time"
                          name="reminderTime"
                          id="time"
                          style={fieldStyle}
                          onFocus={onFocusStyle}
                          onBlur={onBlurStyle}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                {/* CTA */}
                <div className="cta d-flex align-items-center justify-content-end gap-3 my-3 flex-wrap">
                  <button
                    onClick={() => dispatch(deleteClass(classId, navigate))}
                    className="btn btn-danger rounded-3"
                  >
                    Delete class
                  </button>
                  <button className="btn open-style rounded-3 px-5">Save</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Settings;
