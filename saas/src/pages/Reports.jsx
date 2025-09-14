import React from "react";
import Publish from "../components/cards/Publish";
import ReportsItem from "../components/cards/ReportsItem";
import { useSelector } from "react-redux";
import { safeMap } from "../utils/safeArray";

export default function Reports() {
  const { role } = useSelector(state => state.user);
 const reports = []  // i will made a store for them

  return (
    <div className="reports-page">
      <div className="container py-5">
        {role === "teacher" && <Publish />}
        <div className="reports-items mt-5">
          <h4>Recent reports</h4>
          {reports ? (
            safeMap(reports, (report) => {
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
