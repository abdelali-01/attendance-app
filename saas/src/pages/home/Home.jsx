import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { safeMap, safeFilter } from "../../utils/safeArray";
import "./home.css";
import Loader from "../../components/ui/Loader";
import NoClassAvailable from "../../components/NoClassAvailable";

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
import StudentAttendance from "../../components/cards/StudentAttendance";
import { findClass } from "../../store/class/classHandler";
import { getStudents } from "../../store/students/studentsHandler";
import Charts from "../../components/charts/Charts";

export default function Home() {
  const { classes, foundedClass } = useSelector((state) => state.classes);
  console.log("classes from dash ", classes);
  const { students } = useSelector((state) => state.students);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [selectedClass, setSelecedClass] = useState();
  const [absences, setAbsences] = useState([]);
  const [attendances, setAttendances] = useState([]);

  // Find the selected class based on selectedClass state
  useEffect(() => {
    if (classes && classes.length > 0 && !selectedClass) {
      // Set the absences of the first class by default
      setSelecedClass(classes[0]._id);
    } else if (classes) {
      // Find the class with the selectedClass identifier (e.g., class name or ID)
      dispatch(findClass(classes, selectedClass));
      dispatch(getStudents(selectedClass));
    }

    if (foundedClass) {
      setAbsences(foundedClass.absences); // Set absences for the selected class
      setAttendances(foundedClass.attendances);
    }
  }, [classes, selectedClass, foundedClass, dispatch]); // Effect depends on selectedClass and classes

  // calculate the average percentage
  const calculateAveragePercentage = (dataAbsence, dataAttendance) => {
    if (!dataAbsence || dataAbsence.length === 0) return 0;

    // Filter out entries without a valid `count` and default missing `count` to 0
    const validAbsenceData = safeMap(dataAbsence, (item) => ({
      ...item,
      count: item.count || 0,
    }));

    const validAttendanceData = safeMap(dataAttendance, (item) => ({
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
    const formattedData = safeMap(data, (item) => ({
      day: item.date,
      value: item.count === undefined ? 0 : item.count,
    }));

    // Create an array of 5 default bars
    const defaultBars = Array.from({ length: 8 }, () => ({
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
    const validData = safeFilter(data, (item) => item.value !== undefined);
    if (validData.length === 0) return 0;

    const total = validData.reduce((sum, item) => sum + item.value, 0);
    return total / validData.length;
  };

  // determin the trend for the statistic
  const determineAverageTrend = (data) => {
    const validData = safeFilter(
      data,
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
    <div className="home-page">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="d-flex justify-content-between align-items-center gap-4 flex-wrap">
          <div className="welcome-section">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="welcome-text">Welcome back, teacher! 👋</p>
          </div>
          <div className="flex-grow-1 flex-md-grow-0" style={{minWidth : "300px"}}>
            {classes && classes.length > 0 && (
              <div className="class-selector">
                <label htmlFor="class-select" className="selector-label">
                  Select Class
                </label>
                <select
                  id="class-select"
                  className="class-select"
                  value={selectedClass}
                  onChange={(e) => setSelecedClass(e.target.value)}
                >
                  {safeMap(classes, (c) => {
                    return (
                      <option
                        style={{ textTransform: "capitalize" }}
                        key={c._id}
                        value={c._id}
                      >
                        {c.class}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : classes && classes.length > 0 ? (
        <div className="dashboard-content py-5">
          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stats-main">
              <div className="stats-row">
                  <Charts
                    data={formattedAbsences}
                    absence
                    percentage={averageAbsence}
                    trend={absencesTrend}
                  />
                  <Charts
                    data={formattedAttendances}
                    percentage={averageAttendance}
                    trend={attendancesTrend}
                  />
              </div>
              
              {/* Participation Trend Card */}
              <div className="participation-card-wrapper">
                <div className="participation-card">
                  <div className="card-header">
                    <div className="card-title-section">
                      <span className="card-label">Participation Trend</span>
                      <div className="card-value">{averageAttendance}%</div>
                    </div>
                    <div className="trend-indicator">
                      {attendancesTrend === "up" && (
                        <div className="trend-up">
                          <img src={trend_up} alt="Trending up" />
                        </div>
                      )}
                      {attendancesTrend === "down" && (
                        <div className="trend-down">
                          <img src={trend_down} alt="Trending down" />
                        </div>
                      )}
                      {attendancesTrend === "neutral" && (
                        <div className="trend-neutral">--</div>
                      )}
                    </div>
                  </div>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={formattedAttendances}>
                        <XAxis hide />
                        <YAxis hide />
                        <Tooltip 
                          cursor={false}
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          strokeWidth={3}
                          stroke="url(#participationGradient)"
                          dot={false}
                          isAnimationActive
                          animationDuration={800}
                        />
                        <defs>
                          <linearGradient
                            id="participationGradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop offset="0%" stopColor="#667eea" />
                            <stop offset="50%" stopColor="#764ba2" />
                            <stop offset="100%" stopColor="#f093fb" />
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Students Attendance Sidebar */}
            <div className="students-sidebar">
              <div className="students-card">
                <div className="students-header">
                  <h3 className="students-title">Students' Attendance</h3>
                  <div className="students-count">
                    {students ? students.length : 0} students
                  </div>
                </div>
                <div className="students-list">
                  {students && students.length > 0 ? (
                    safeMap(students, (student) => {
                      return (
                        <StudentAttendance
                          key={student._id}
                          student={student}
                          selectedClass={selectedClass}
                        />
                      );
                    })
                  ) : (
                    <div className="no-students">
                      <div className="no-students-icon">👥</div>
                      <p className="no-students-text">No students available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoClassAvailable/>
      )}
    </div>
  );
}
