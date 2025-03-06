import { removeLoading, setLoading } from "../Loading";
import { request, setClasses, setFoundedClass } from "./classSlice";
import axios from "axios";

export const getClasses = () => async (dispatch) => {
  dispatch(request());

  try {
    const response = await axios.get(`/class`, { withCredentials: true });
    dispatch(setClasses(response.data));
  } catch (error) {
    console.log("Error during get classes ", error);
  }
};

export const findClass = (classes, classId) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const findClass = classes.find((c) => c._id === classId);
    dispatch(setFoundedClass(findClass));
  } catch (error) {
    console.log("error during find the class ", error);
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
      await axios.delete(`/class/${classId}`);
      navigate("/dashboard");

      dispatch(getClasses());
    } catch (error) {
      console.error("Error deleting the class:", error);
      alert("Failed to delete the class. Please try again.");
    } finally {
      dispatch(removeLoading());
    }
  }
};

export const addClass = (classe, navigate) => async (dispatch) => {
  dispatch(request());

  try {
    const res = await axios.post("/class", classe, { withCredentials: true });
    dispatch(getClasses());

    navigate(`/dashboard/classes/${res.data._id}`);
  } catch (error) {
    console.log("erro during add new class", error);
    if (error.response.data.reason === "plan")
      alert(error.response.data.message);
  }
};

export const updateClassCode = (classId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.patch(`/class/${classId}`);

    const shareCode = res.data.shareCode;
    dispatch(getClasses());
    return shareCode;
  } catch (error) {
    console.error("error during update code ", error);
    alert("Faild to update the code , please try again !");
  } finally {
    dispatch(removeLoading());
  }
};

export const updateClass = (details , controls, classId) => async (dispatch) => {
  dispatch(setLoading());

  try {
    await axios.put('/class' , {
      details , controls , classId
    } , {withCredentials : true});
  } catch (error) {
    console.log('error during updating the class ' , error);
  } finally {
    dispatch(removeLoading());
  }
}
