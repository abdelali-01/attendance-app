import axios from "axios";
import { request, login as userLog, logout as userLogout } from "./authSlice";

const serverUrl = process.env.REACT_APP_BASE_URI;

// request to check the user if exist or not in the session
export const checkUser = (navigate) => async (dispatch) => {
  dispatch(request());
  try {
    const response = await axios.get(serverUrl + "/auth/user", {
      withCredentials: true,
    });

    dispatch(userLog(response.data));
    // navigate("/");
  } catch (error) {
    console.log("error during requesting the Checking ", error);
  }
};

export const login = (user, navigate) => async (dispatch) => {
  dispatch(request());
  try {
    const response = await axios.post(serverUrl + "/auth/login", user, {
      withCredentials: true,
    });

    if (response.statusText === "OK") {
      dispatch(userLog(response.data.user));
      navigate("/");
    }
  } catch (error) {
    console.log("error during requesting the login ", error);
  }
};

export const logout = (navigate) => async (dispatch) => {
  dispatch(request());

  try {
    await axios.post(`${serverUrl}/auth/logout`);
    dispatch(userLogout());
    navigate("/login");
  } catch (error) {
    console.log("Error during Lougout", error);
  }
};
