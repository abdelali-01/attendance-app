import React from "react";

export default function Publish({ classes }) {
  console.log(classes);

  return (
    <div className="publish card rounded-4 p-3">
      <h4>Publish Your Report & Remarks</h4>
      <p className="text-black-50 mb-0">
        Publish your report and provide remarks to guide students' progress.
      </p>
      <p
        className="text-black-50"
        style={{
          textDecoration: "underline",
        }}
      >
        The report is still available for review for the next 24 hours.
      </p>

      <form className="mt-4">
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
              className="rounded-4"
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
                classes.map((c) => {
                  return (
                    <div key={c._id} className="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id={c._id}
                      />
                      <label class="form-check-label" for={c._id}>
                        {c.class}
                      </label>
                    </div>
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
