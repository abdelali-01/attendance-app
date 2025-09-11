import axios from "axios";
import { request, login as userLog, logout as userLogout } from "./authSlice";

const serverUrl = import.meta.env.VITE_BASE_URI;

export const signup = (user, navigate) => async (dispatch) => {
  dispatch(request());
  try {
    await axios.post(serverUrl + "/auth/signup", user, {
      withCredentials: true,
    });
    navigate("/verification");
    return {
      success: true,
      message:
        "Account created successfully! Please check your email for verification.",
    };
  } catch (error) {
    console.log("error during requesting the signup ", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to create account. Please try again.",
    };
  }
};

// request to check the user if exist or not in the session
export const checkUser = () => async (dispatch) => {
  dispatch(request());
  try {
    const response = await axios.get(serverUrl + "/auth/user", {
      withCredentials: true,
    });

    if (response.data.isVerified) dispatch(userLog(response.data));
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

    if (!response.data.user.isVerified) {
      navigate("/verification");
      return {
        success: false,
        message: "Please verify your email before logging in.",
      };
    }

    if (response && response.data.user.isVerified) {
      dispatch(userLog(response.data.user));
      navigate("/dashboard");
      return { success: true, message: "Login successful!" };
    }
  } catch (error) {
    console.log("error during requesting the login ", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login failed. Please check your credentials.",
    };
  }
};

export const logout = (navigate) => async (dispatch) => {
  dispatch(request());

  try {
    await axios.post(`${serverUrl}/auth/logout`, {}, { withCredentials: true });
    dispatch(userLogout());
    navigate("/");
    return { success: true, message: "Logged out successfully!" };
  } catch (error) {
    console.log("Error during Logout", error);
    return { success: false, message: "Logout failed. Please try again." };
  }
};

// Email verification handler
export const verifyEmail = async (token) => {
  try {
    await axios.get(`${serverUrl}/auth/verify/${token}`);
    return { success: true };
  } catch (error) {
    console.error("error during email verification", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Invalid or expired token. Please request a new verification email.",
    };
  }
};
