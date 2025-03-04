import axios from "axios";
import { request, setStudents } from "./studentsSlice";

export const getStudents = (classId) => async (dispatch) => {
  dispatch(request());

  try {
    const response = await axios.get(`/user/studentsList/${classId}`);
    dispatch(setStudents(response.data));
  } catch (error) {
    console.log("Error during get the student list", error);
  }
};
