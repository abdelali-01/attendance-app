import axios from "axios";
import { request, setStudents } from "./studentsSlice";
import { removeLoading, setLoading } from "../Loading";

export const getStudents = (classId) => async (dispatch) => {
  dispatch(request());

  try {
    const response = await axios.get(`/user/studentsList/${classId}`);
    dispatch(setStudents(response.data));
  } catch (error) {
    console.log("Error during get the student list", error);
  }
};

export const resetStudentsAbsence = (classId) => async (dispatch) => {
  dispatch(setLoading());

  try {
    await axios.put(`/user/reset/${classId}`);
    dispatch(getStudents(classId));
  } catch (error) {
    console.log('error during resset the absences ' , error);
    alert("faild to reset , please try again !");
  } 
  finally {
    dispatch(removeLoading());
  }
}
