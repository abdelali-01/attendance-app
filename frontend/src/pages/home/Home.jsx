import React, { useEffect, useState } from "react";
import Charts from "../../components/Charts";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  { week: "w1", value: 5 },
  { week: "w2", value: 10 },
  { week: "w3", value: 15 },
  { week: "w4", value: 10 },
  { week: "w5", value: 7 },
  { week: "w6", value: 12 },
  { week: "w7", value: 19 },
];

export default function Home({ classes }) {
  const [selectedClass, setSelecedClass] = useState(
    classes.length > 0 ? classes[0].class : ""
  );
  const [absences, setAbsences] = useState([]);
  const [attendances, setAttendances] = useState([]);

  const [loading, setLoading] = useState(false);

  // Find the selected class based on selectedClass state
  useEffect(() => {
    setLoading(true);
    if (classes.length > 0 && selectedClass === "") {
      // Set the absences of the first class by default
      setSelecedClass(classes[0].class);
    } else if (selectedClass) {
      // Find the class with the selectedClass identifier (e.g., class name or ID)
      const foundClass = classes.find((cls) => cls.class === selectedClass); // Adjust property to match your data

      if (foundClass) {
        setAbsences(foundClass.absences); // Set absences for the selected class
        setAttendances(foundClass.attendances);
      }
    }
    setLoading(false);
  }, [selectedClass, classes]); // Effect depends on selectedClass and classes

  // Format data for charts
  const formatData = (data) => {
    const formattedData = data.map((item) => ({
      day: item.date,
      value: item.count === undefined ? 0 : item.count,
    }));

    // Create an array of 5 default bars
    const defaultBars = Array.from({ length: 8 }, (index) => ({
      day: ``,
      value: 0,
    }));

    if (formattedData.length === 0) {
      return defaultBars;
    } else if (formattedData.length < 8) {
      return [
        ...formattedData,
        ...defaultBars.slice(0, 8 - formattedData.length),
      ];
    } else {
      return formattedData.slice(-8);
    }
  };

  const formattedAbsences = formatData(absences);
  const formattedAttendances = formatData(attendances);

  return (
    <div className="home-page px-md-5 px-3 my-5 flex-grow-1">
      <div className="home-title mt-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-black-50">Welcome back , teacher</p>
      </div>
      {loading ? (
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
                  {classes.map((c, i) => {
                    return (
                      <option
                        style={{ textTransform: "capitalize" }}
                        key={c._id}
                        value={c.class}
                      >
                        {c.class}
                      </option>
                    );
                  })}
                </select>
              </div>
            </form>
          </div>
          <div className="row w-100 m-auto justify-content-center my-4 gap-5">
            <div className="col">
              <Charts data={formattedAbsences} absence />
            </div>
            <div className="col">
              <Charts data={formattedAttendances} />
            </div>
            <div className="col">
              <div
                style={{
                  width: "100%",
                  height: "170px",
                  padding: "20px",
                  background: "#f9f9ff",
                  borderRadius: "10px",
                  minWidth: "200px",
                  maxWidth: "350px",
                  margin: "auto",
                }}
              >
                <span className="text-black-50 fw-semibold">Participation</span>
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  19%
                </p>
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={formattedAttendances}>
                    <XAxis  hide/>
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
      )}
    </div>
  );
}

