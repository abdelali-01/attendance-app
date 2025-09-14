import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { safeMap, safeFilter } from "../../utils/safeArray";

export default function Publish() {
  // const serverUri = process.env.REACT_APP_BASE_URI;

  const { classes } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.user);
  // manage the report with states
  const [report, setReport] = useState("");
  const [reportClasses, setReportClasses] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  // handle checkbox change
  const handleCheckboxChange = (classId) => {
    setIsChanged(true);
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

  // set the classes as checked and put it in the reportClasses state
  useEffect(() => {
    if (!isChanged) {
      const classesId = safeMap(classes, (c) => c._id);
      setReportClasses(classesId);
    }
  }, [classes, isChanged]);

  // submit the report
  const shareReport = async (e) => {
    e.preventDefault();

    if (reportClasses.length > 0) {
      // try {
      //   await axios.post(`${serverUri}/report/share/${user}`, {
      //     report,
      //     classes: reportClasses,
      //   });
      //   window.location.reload()
      // } catch (error) {
      //   console.error("error during share the report", error);
      //   alert("Faild to share your report , please try again !");
      // }
    } else {
      alert("You have to select one class minimum !");
    }
  };

  return (
    <div className="publish card rounded-4 p-3">
      <h4>Publish Your Report & Remarks</h4>
      <p className="text-black-50 mb-0">
        Publish your report and provide remarks to guide students' progress.
      </p>
      {/* <p
        className="text-black-50"
        style={{
          textDecoration: "underline",
        }}
      >
        The report is still available for review for the next 24 hours.
      </p> */}

      <form className="mt-4" onSubmit={shareReport}>
        <div className="info d-flex gap-4 flex-wrap ">
          <div
            className="field"
            style={{
              minWidth: "300px",
              maxWidth: "500px",
            }}
          >
            <label htmlFor="report">Report</label>
            <textarea
              className="rounded-2"
              maxLength={"1000"}
              name="report"
              id="report"
              placeholder="Dear student ... "
              style={{
                minHeight: "40px",
                maxHeight: "250px",
                height: "150px",
              }}
              required
              value={report}
              onChange={(e) => setReport(e.target.value)}
            ></textarea>
          </div>
          <div className="select-target-classes">
            <label>Select who can see this report</label>
            <div className="classes mt-3 ms-2 ">
              {!classes ? (
                <></>
              ) : classes.length < 1 ? (
                <p className="text-black-50">There is no class !</p>
              ) : (
                safeMap(classes, (c) => {
                  return (
                    <CheckClass
                      c={c}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-end mt-4">
          <button className="btn open-style px-5 py-2 rounded-3">Share</button>
        </div>
      </form>
    </div>
  );
}

function CheckClass({ c, handleCheckboxChange }) {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <div key={c._id} className="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id={c._id}
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          handleCheckboxChange(c._id);
        }}
      />
      <label
        class="form-check-label"
        for={c._id}
        style={{
          textTransform: "capitalize",
        }}
      >
        {c.class}
      </label>
    </div>
  );
}
