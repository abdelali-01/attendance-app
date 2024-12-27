import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import trend_up from "./icons/trend-up.svg";
import trend_down from "./icons/trend-down.svg";

// Custom Bar component to handle minimum height
const CustomBar = (props) => {
  const { value, y, height, ...rest } = props;

  // Set a minimum height for the bar
  const barHeight = value > 0 ? height : 2; // Minimum height of 3 for bars with value 0

  return (
    <rect
      {...rest}
      height={barHeight}
      y={y + (height - barHeight)} // Adjust y position based on height
      rx={6}
    />
  );
};

export default function Charts({ data, absence, percentage, trend }) {
  return (
    <div>
      <div className="card rounded-5">
        <div className="chartInfo mb-2 ms-3 d-flex justify-content-between">
          <div className="left-part mb-0">
            <span className="text-black-50 fw-semibold">
              {absence ? "Absent" : "Attendance"}
            </span>
            <div className="fw-bold fs-3 ">{percentage}%</div>
          </div>
          <span>
            {trend === "up" && <img src={trend_up} alt="" />}
            {trend === "down" && <img src={trend_down} alt="" />}
            {trend === "neutral" && '--'}
          </span>
        </div>
        <ResponsiveContainer width="100%" height="60%">
          <BarChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF5659" />
                <stop offset="95%" stopColor="#FFC5C6" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="secColorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#57FFA8" />
                <stop offset="95%" stopColor="#CCFEE4" />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" hide />
            <YAxis hide />
            <Tooltip />
            <Bar
              dataKey="value"
              barSize={12}
              shape={CustomBar}
              fill={`url(${absence ? `#colorValue` : `#secColorValue`})`}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
