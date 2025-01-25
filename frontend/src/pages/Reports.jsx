import React from "react";
import Publish from "../components/Publish";
import { useAuth } from "../contexts/auth";
import { useReports } from "../contexts/getReports";
import ReportsItem from "../components/ReportsItem";

export default function Reports({ classes }) {
  const { role } = useAuth();
  const { reports } = useReports();

  return (
    <div className="reports-page">
      <div className="container py-5">
        {role === "teacher" && <Publish classes={classes} />}
        <div className="reports-items mt-5">
          <h4>Recent reports</h4>
          {reports ? (
            reports.map((report) => {
              return <ReportsItem key={report._id} report={report} />;
            })
          ) : (
            <p className="text-black-50">No available reports</p>
          )}
        </div>
      </div>
    </div>
  );
}
