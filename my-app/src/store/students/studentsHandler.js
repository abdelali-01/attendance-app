import axios from "axios";
import { request, setStudents } from "./studentsSlice";
import { removeLoading, setLoading } from "../Loading";
import { getClasses } from "../class/classHandler";

const server = import.meta.env.VITE_BASE_URI;

export const getStudents = (classId) => async (dispatch) => {
  dispatch(request());

  try {
    const response = await axios.get(`${server}/user/studentsList/${classId}`);
    dispatch(setStudents(response.data));
  } catch (error) {
    console.log("Error during get the student list", error);
  }
};

export const resetStudentsAbsence = (classId) => async (dispatch) => {
  dispatch(setLoading());

  try {
    await axios.put(`${server}/user/reset/${classId}`);
    dispatch(getStudents(classId));
  } catch (error) {
    console.log("error during resset the absences ", error);
    alert("faild to reset , please try again !");
  } finally {
    dispatch(removeLoading());
  }
};

export const checkStudentPresence =
  (classId, studentId) => async (dispatch) => {
    dispatch(setLoading());
    const now = new Date().getTime(); // Current timestamp in milliseconds
    const lastChecked = localStorage.getItem("lastCheckAttendance");

    // Check if 90 minutes (1h30min) have passed
    if (lastChecked && now - lastChecked < 90 * 60 * 1000) {
      alert("You can only check attendance once every 1 hour and 30 minutes.");
      dispatch(removeLoading());
      return;
    }

    try {
      await axios.put(`${server}/user/checkattendance/${studentId}`, {
        classId,
      });
      alert("Thanks for check your attendance .");
      localStorage.setItem("lastCheckAttendance", now); // Store the current timestamp
    } catch (error) {
      console.error("error during set the present", error);
      if (error.status === 400)
        return alert("Faild to check you presence , please try agin !");
      alert(error.response.data);
      dispatch(getClasses());
    } finally {
      dispatch(removeLoading());
    }
  };
