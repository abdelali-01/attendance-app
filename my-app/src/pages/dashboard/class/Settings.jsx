import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClass,
  findClass,
  updateClass,
  updateClassCode,
} from "../../../store/class/classHandler";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/ui/Loader";
import { useToast } from "../../../components/Toast/ToastContainer";

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
  const dropdownRef = useRef(null); // Reference to dropdown

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

  // Close dropdown when clicking outside
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

    if(res.success){
      showSuccess(res.message)
    }else{
      showError(res.message)
    }
  };

  return (
    <div className="class-settings conatiner py-5 px-4">
      {loading || !foundedClass ? (
        <Loader /> 
        // <></>
      ) : (
        <>
          <h3>Class Settings</h3>
          <hr />
          <div className="class-details mt-4">
            <h6 className="text-primary">Class Details</h6>
            <form onSubmit={submitHandler}>
              <div className="row w-100 m-auto my-3 gap-1">
                <div className="field  col">
                  <label htmlFor="system">system </label>
                  <select
                    value={classe.system}
                    onChange={handleChange}
                    name="system"
                    id="system"
                    required
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
                </div>
                <div className="field col">
                  <label htmlFor="speciality">Speciality *</label>
                  <input
                    value={classe.speciality}
                    onChange={handleChange}
                    type="text"
                    name="speciality"
                    id="speciality"
                    placeholder="Enter the speciality of class"
                    required
                  />
                </div>
                <div className="field col">
                  <label htmlFor="module">Module *</label>
                  <input
                    type="text"
                    name="module"
                    id="module"
                    required
                    placeholder="your module"
                    value={classe.module}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row w-100 m-auto gap-1">
                <div className="field col">
                  <label htmlFor="class">Class name</label>
                  <input
                    value={classe.class}
                    onChange={handleChange}
                    type="text"
                    name="class"
                    id="class"
                    placeholder="choose class name"
                    required
                  />
                </div>
                <div className="field col">
                  <label htmlFor="deleguate">Class deleguate</label>
                  <input
                    type="text"
                    name="deleguate"
                    id="deleguate"
                    placeholder="deleguate name"
                  />
                </div>
              </div>
              <div className="row w-100 m-auto mt-3 gap-1">
                <div className="field col">
                  <label htmlFor="d_AttendanceMark">A-mark </label>
                  <input
                    type="number"
                    step={"0.25"}
                    name="d_AttendanceMark"
                    id="d_AttendanceMark"
                    value={classe.d_AttendanceMark}
                    placeholder="example : 5"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="field col">
                  <label htmlFor="minusWithAbsence">Minus with absence</label>
                  <input
                    type="number"
                    step={"0.25"}
                    name="minusWithAbsence"
                    id="minusWithAbsence"
                    value={classe.minusWithAbsence}
                    placeholder="example : 0.5"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <hr />
              <div className="invite-code">
                <h6 className="text-primary">Invite code</h6>
                <div className="shareCode mt-3 d-flex align-items-center justify-content-between">
                  <span>Class code : {foundedClass.shareCode}</span>
                  <div
                    className="reset-code"
                    role="button"
                    onClick={async () =>{ 
                     const res = await dispatch(updateClassCode(classId))
                     res.success ? showSuccess(res.message) : showError(res.message);
                    }}
                  >
                    <span className="fw-semibold text-primary">Reset</span>
                  </div>
                </div>
              </div>

              <hr />
              <div className="class-controls position-relative">
                <h6 className="text-primary">
                  Class Controls
                  <i
                    className="fa-solid fa-crown position-absolute ms-2"
                    style={{ color: "#FFD700" }}
                  ></i>
                </h6>
                <div className="class-control-reminder my-4">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <h6>Class Reminder </h6>
                      <p className="text-black-50">
                        Reminds you to open your class and mark your students
                        presence
                      </p>
                    </div>
                    <div class="form-check form-switch">
                      <input
                        class={`form-check-input ${user.plan !== 'premium' && 'upgrade-trigger'}`}
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
                      {/* Dropdown Button */}
                      <button
                        disabled={!isChecked}
                        className="form-control text-start"
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        {selectedDays.length > 0
                          ? selectedDays.join(", ")
                          : "Select Days"}
                      </button>

                      {/* Dropdown Menu */}
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
                      <label htmlFor="time" className="mb-1">
                        Select Reminder Time
                      </label>
                      <input
                        disabled={!isChecked}
                        className="w-100 p-2 rounded-2 border form-control"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        onFocus={(e) => (e.target.value = "")}
                        placeholder="Select Time"
                        type="time"
                        name="reminderTime"
                        id="time"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              <div className="cta d-flex align-items-center justify-content-end gap-3  my-5 flex-wrap">
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
        </>
      )}
    </div>
  );
}

export default Settings;
