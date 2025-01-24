import React from "react";
import { useAuth } from "../contexts/auth";
import moment from "moment";

export default function ReportsItem({ report }) {
  const { userData, role } = useAuth();

  return (
    <div className="report-item card rounded-4 p-3 my-3 position-relative">
      <div
        className="time text-black-50 position-absolute m-2"
        style={{
          right: "0",
          top: "0",
          fontSize: "13px",
        }}
      >
        {moment(report.createdAt).fromNow()}
      </div>
      <div className="card-head">
        {role === "teacher" ? (
          <>
            <h6 className="mb-0" style={{ textTransform: "capitalize" }}>
              {userData.familyName} {userData.name}
            </h6>
            <p className="text-black-50">{userData.email}</p>
          </>
        ) : (
          <>
            <h6 className="mb-0" style={{ textTransform: "capitalize" }}>
              {report.familyName} {report.name}
            </h6>
            <p className="text-black-50">{report.email}</p>
          </>
        )}
      </div>
      <div className="card-content">
        <p style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
          {report.report}
        </p>
      </div>
    </div>
  );
}
