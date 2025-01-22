import React, { useEffect, useState } from "react";
import Charts from "../../components/Charts";
import "./home.css";
import axios from "axios";
import Loader from "../../components/Loader";

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
import StudentAttendance from "../../components/StudentAttendance";

export default function Home({ classes }) {
  const serverUri = process.env.REACT_APP_BASE_URI;

  const [students, setStudents] = useState([]);

  const [selectedClass, setSelecedClass] = useState(
    classes.length > 0 ? classes[0]._id : ""
  );

  const [absences, setAbsences] = useState([]);
  const [attendances, setAttendances] = useState([]);
  // console.log(absences , attendances);
  

  const [loading, setLoading] = useState(false);

  // Find the selected class based on selectedClass state
  useEffect(() => {
    setLoading(true);
    if (classes.length > 0 && selectedClass === "") {
      // Set the absences of the first class by default
      setSelecedClass(classes[0]._id);
    } else if (selectedClass) {
      // Find the class with the selectedClass identifier (e.g., class name or ID)
      const foundClass = classes.find((cls) => cls._id === selectedClass); // Adjust property to match your data
      
      // fetch the student of the selected class
      const fetchStudents = async () => {
        const res = await axios.get(
          `${serverUri}/student/studentsList/${selectedClass}`
        );
        setStudents(res.data);
      };
      fetchStudents();

      if (foundClass) {        
        setAbsences(foundClass.absences); // Set absences for the selected class
        setAttendances(foundClass.attendances);
        fetchStudents();
      }
    }
    setLoading(false);
  }, [selectedClass, classes, serverUri]); // Effect depends on selectedClass and classes

  // calculate the average percentage
  const calculateAveragePercentage = (dataAbsence, dataAttendance) => {
    if (!dataAbsence || dataAbsence.length === 0) return 0;

    // Filter out entries without a valid `count` and default missing `count` to 0
    const validAbsenceData = dataAbsence.map((item) => ({
      ...item,
      count: item.count || 0,
    }));

    const validAttendanceData = dataAttendance.map((item) => ({
      ...item,
      count: item.count || 0,
    }));

    // Get the last item in the array
    const lastAbdsenceCount =
      validAbsenceData[validAbsenceData.length - 1].count;
    const lastAttendanceCount =
      validAttendanceData[validAbsenceData.length - 1].count;

    // Function to calculate the percentage for a given count
    return (
      (lastAbdsenceCount / (lastAbdsenceCount + lastAttendanceCount)) *
      100
    ).toFixed(0); // This will give you the percentage directly
  };

  const averageAbsence = calculateAveragePercentage(absences, attendances);
  const averageAttendance = (100 - averageAbsence).toFixed(0);

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

  // calculate the average trend
  const AverageTrend = (data) => {
    const validData = data.filter((item) => item.value !== undefined);
    if (validData.length === 0) return 0;

    const total = validData.reduce((sum, item) => sum + item.value, 0);
    return total / validData.length;
  };

  // determin the trend for the statistic
  const determineAverageTrend = (data) => {
    const validData = data.filter(
      (item) => item.value !== 0 || item.day !== ""
    );

    if (validData.length < 2) {
      return null; // Not enough data to determine a trend
    }

    // Split the data into two halves
    const midpoint = Math.floor(validData.length / 2);
    const firstHalf = validData.slice(0, midpoint);
    const secondHalf = validData.slice(midpoint);

    // Calculate averages for both halves
    const firstAverage = AverageTrend(firstHalf);
    const secondAverage = AverageTrend(secondHalf);

    if (secondAverage > firstAverage) {
      return "up";
    } else if (secondAverage < firstAverage) {
      return "down";
    } else {
      return "neutral"; // No significant change
    }
  };

  const absencesTrend = determineAverageTrend(formattedAbsences);
  const attendancesTrend = determineAverageTrend(formattedAttendances);

  return (
    <div className="home-page px-md-5 px-3 my-5 flex-grow-1">
      <div className="home-title mt-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-black-50">Welcome back , teacher</p>
      </div>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <div className="charts-part w-100 d-flex flex-column align-items-end">
            <div className="row mb-4">
              <form>
                <div className="field col-2">
                  <label htmlFor="class">Select Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelecedClass(e.target.value)}
                  >
                    {classes.length > 0 ? (
                      classes.map((c, i) => {
                        return (
                          <option
                            style={{ textTransform: "capitalize" }}
                            key={c._id}
                            value={c.class}
                          >
                            {c.class}
                          </option>
                        );
                      })
                    ) : (
                      <option>No class available</option>
                    )}
                  </select>
                </div>
              </form>
            </div>
            <div className="statistics d-flex w-100 gap-4 py-3">
              <div className="charts-statistics flex-grow-1">
                <div className="row m-auto">
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
                </div>
                <div className="row m-auto">
                  <div className="col">
                    <div className="card rounded-5">
                      <div className="card-info d-flex justify-content-between">
                        <div className="left-part">
                          <span className="text-black-50 fw-semibold">
                            Participation
                          </span>
                          <div className="fw-bold fs-3">
                            {averageAttendance}%
                          </div>
                        </div>
                        <span>
                          {attendancesTrend === "up" && (
                            <img src={trend_up} alt="" />
                          )}
                          {attendancesTrend === "down" && (
                            <img src={trend_down} alt="" />
                          )}
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
                            <linearGradient
                              id="gradient"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="0"
                            >
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
              <div
                className="students-attendance  card rounded-5 flex-grow-1"
                style={{
                  width : "300px",
                  overflowY: "auto",
                  maxHeight: "100%",
                  marginBottom :"30px" ,
                  padding : "20px"
                }}
              >
                <p className="fw-semibold text-black-50">
                  Students' Attendance
                </p>
                <div className="">
                  {students === null ? (
                    <p className="text-center my-4">No available students. </p>
                  ) : students.length > 0 ? (
                    students.map((student) => {
                      const studentClass = student.classes.find(
                        (c) => c.classId === selectedClass
                      );
                      return (
                        <StudentAttendance
                          key={student._id}
                          student={student}
                          currentClass={studentClass}
                        />
                      );
                    })
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
