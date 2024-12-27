import React, { useEffect, useState } from "react";
import Charts from "../../components/Charts";
import "./home.css";

import trend_up from "../../components/icons/trend-up.svg";
import trend_down from "../../components/icons/trend-down.svg";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  XAxis,
} from "recharts";

export default function Home() {
  const student = JSON.parse(localStorage.getItem('Student'))

  
  return (
    <div className="home-page px-md-5 px-3 my-5 flex-grow-1">
      <div className="home-title mt-4">
        <h2 className="fw-bold">Home</h2>
        <p className="text-black-50">Welcome back , <span style={{
          textTransform : "capitalize"
        }}> {student.familyName} {student.name}</span></p>
      </div>
      {/* {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className="charts-part w-100 d-flex flex-column align-items-end">
          <div className="row">
            <form>
              <div className="field col-2">
                <label htmlFor="class">Select Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelecedClass(e.target.value)}
                >
                  {classes.length > 0 ? classes.map((c, i) => {
                    return (
                      <option
                        style={{ textTransform: "capitalize" }}
                        key={c._id}
                        value={c.class}
                      >
                        {c.class}
                      </option>
                    );
                  }) : <option>No class available</option>}
                </select>
              </div>
            </form>
          </div>
          <div className="row w-100 m-auto justify-content-center my-4 gap-5">
            <div className="col">
              <Charts
                data={formattedAbsences}
                absence
                percentage={averageAbsence}
                trend={absencesTrend}
              />
            </div>
            <div className="col">
              <Charts
                data={formattedAttendances}
                percentage={averageAttendance}
                trend={attendancesTrend}
              />
            </div>
            <div className="col">
              <div className="card rounded-5">
                <div className="card-info d-flex justify-content-between">
                  <div className="left-part">
                    <span className="text-black-50 fw-semibold">
                      Participation
                    </span>
                    <div className="fw-bold fs-3">{averageAttendance}%</div>
                  </div>
                  <span>
                    {attendancesTrend === "up" && <img src={trend_up} alt="" />}
                    {attendancesTrend === "down" && <img src={trend_down} alt="" />}
                    {attendancesTrend === "neutral" && "--"}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={"60%"}>
                  <LineChart data={formattedAttendances}>
                    <XAxis hide />
                    <YAxis hide />
                    <Tooltip cursor={false} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      strokeWidth={6}
                      stroke="url(#gradient)"
                      dot={false}
                      isAnimationActive
                      animationDuration={500}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="red" />
                        <stop offset="50%" stopColor="orange" />
                        <stop offset="100%" stopColor="green" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
