import { removeLoading, setLoading } from "../Loading";
import { request, setClasses, setFoundedClass } from "./classSlice";
import axios from "axios";

const serverUrl = import.meta.env.VITE_BASE_URI;


export const getClasses = () => async (dispatch) => {
  dispatch(request());

  try {
    const response = await axios.get(`${serverUrl}/class`, { withCredentials: true });
    dispatch(setClasses(response.data));
    return { success: true };
  } catch (error) {
    console.log("Error during get classes ", error);
    return { success: false, message: "Failed to load classes. Please try again." };
  }
};

export const findClass = (classes, classId) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const findClass = classes.find((c) => c._id === classId);
    dispatch(setFoundedClass(findClass));
    return { success: true };
  } catch (error) {
    console.log("error during find the class ", error);
    return { success: false, message: "Failed to find class." };
  } finally {
    dispatch(removeLoading());
  }
};

export const deleteClass = (classId, navigate) => async (dispatch) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this class? This action cannot be undone."
  );

  if (confirmDelete) {
    dispatch(setLoading());
    try {
      await axios.delete(`${serverUrl}/class/${classId}`);
      navigate("/dashboard");
      dispatch(getClasses());
      return { success: true, message: "Class deleted successfully!" };
    } catch (error) {
      console.error("Error deleting the class:", error);
      return { success: false, message: "Failed to delete the class. Please try again." };
    } finally {
      dispatch(removeLoading());
    }
  }
  return { success: false, message: "Deletion cancelled." };
};

export const addClass = (classe, navigate) => async (dispatch) => {
  dispatch(request());

  try {
    const res = await axios.post(`${serverUrl}/class`, classe, { withCredentials: true });
    dispatch(getClasses());
    navigate(`/dashboard/classes/${res.data._id}`);
    return { success: true, message: "Class created successfully!" };
  } catch (error) {
    console.log("error during add new class", error);
    if (error.response?.data?.reason === "plan") {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: "Failed to create class. Please try again." };
  }
};

export const updateClassCode = (classId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.patch(`${serverUrl}/class/${classId}` , {} ,{withCredentials: true});
    const shareCode = res.data.shareCode;
    dispatch(getClasses());
    return { success: true, message: "Class code updated successfully!", shareCode };
  } catch (error) {
    console.error("error during update code ", error);
    return { success: false, message: "Failed to update the code. Please try again!" };
  } finally {
    dispatch(removeLoading());
  }
};

export const updateClass = (details, controls, classId) => async (dispatch) => {
  dispatch(setLoading());

  try {
    await axios.put(
      `${serverUrl}/class`,
      {
        details,
        controls,
        classId,
      },
      { withCredentials: true }
    );
    return { success: true, message: "Class updated successfully!" };
  } catch (error) {
    console.log('error during updating the class ', error);
    return { success: false, message: "Failed to update class. Please try again." };
  } finally {
    dispatch(removeLoading());
  }
}
