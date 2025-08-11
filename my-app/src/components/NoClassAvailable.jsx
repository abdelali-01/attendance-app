import React from "react";
import { Link } from "react-router-dom";

export default function NoClassAvailable() {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-icon">📚</div>
        <h3 className="empty-state-title">No Classes Available</h3>
        <p className="empty-state-description">
          Get started by creating your first class to track attendance
        </p>
        <Link to={"/dashboard/add-class"}>
          <button className="create-class-btn">Create Your First Class</button>
        </Link>
      </div>
    </div>
  );
}
