import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Bar component to handle minimum height
const CustomBar = (props) => {
  const { value, y, height, ...rest } = props;

  // Set a minimum height for the bar
  const barHeight = value > 0 ? height : 10; // Minimum height of 3 for bars with value 0

  return (
    <rect
      {...rest}
      height={barHeight}
      y={y + (height - barHeight)} // Adjust y position based on height
      rx={6}
    />
  );
};

export default function Charts({ data, absence }) {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "170px",
          padding: "20px",
          background: "#f9f9ff",
          borderRadius: "10px",
          minWidth : "200px",
          maxWidth : "350px" ,
          margin : "auto"
        }}
      >
        <div className="chartInfo mb-4 ms-3">
          <span className="text-black-50 fw-semibold">
            {absence ? "Absent" : "Attendance"}
          </span>
          <div
            style={{
              textAlign: "left",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            30%
          </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
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
