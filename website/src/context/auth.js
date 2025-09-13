"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const app_url = process.env.NEXT_PUBLIC_APP_URL;

  const signup = async (formData, router, setError) => {
    setLoading(true);
    try {
      await axios.post(`${api_url}/auth/signup`, formData, {
        withCredentials: true,
      });
      if (router) router.push("/verification");
      return {
        success: true,
        message:
          "Account created successfully! Please check your email for verification.",
      };
    } catch (error) {
      console.log("error during requesting the signup ", error);
      setError(
        error?.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // request to check the user if exist or not in the session
  const checkUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api_url}/auth/user`, {
        withCredentials: true,
      });

      if (response?.data?.isVerified) setUser(response.data);
    } catch (error) {
      console.log("error during requesting the Checking ", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, router, setError) => {
    setLoading(true);
    try {
      const response = await axios.post(`${api_url}/auth/login`, credentials, {
        withCredentials: true,
      });

      if (!response?.data?.user?.isVerified) {
        if (router) router.push("/verification");
        return {
          success: false,
          message: "Please verify your email before logging in.",
        };
      }

      if (response?.data?.user?.isVerified) {
        setUser(response.data.user);
        if (router) router.push(app_url);
        return { success: true, message: "Login successful!" };
      }

      return {
        success: false,
        message: "Login failed. Please try again.",
      };
    } catch (error) {
      console.log("error during requesting the login ", error);
      setError(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async (router) => {
    setLoading(true);
    try {
      await axios.post(`${api_url}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      if (router) router.push("/");
      return { success: true, message: "Logged out successfully!" };
    } catch (error) {
      console.log("Error during Logout", error);
      return { success: false, message: "Logout failed. Please try again." };
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token) => {
    setLoading(true);
    try {
      await axios.get(`${api_url}/auth/verify/${token}`);
      return { success: true };
    } catch (error) {
      console.error("error during email verification", error);
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Invalid or expired token. Please request a new verification email.",
      };
    } finally {
      setLoading(false);
    }
  };

  const forgotPass = async (email) => {
    setLoading(true);
    try {
      await axios.post(`${api_url}/auth/reset-pass`, { email });
      return { success: true };
    } catch (error) {
      console.error("error during request forgot password", error);
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "We can`t accept your request now , please try later !",
      };
    } finally {
      setLoading(false);
    }
  };

  const submitNewPass = async (password, token) => {
    setLoading(true);

    try {
      await axios.post(`${api_url}/auth/reset-pass/${token}`, { password });
      return { success: true };
    } catch (error) {
      console.error("error during update the forgoted password", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Expired or Invalid link !",
      };
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      setUser,
      signup,
      checkUser,
      login,
      logout,
      verifyEmail,
      forgotPass,
      submitNewPass,
    }),
    [user, loading]
  );

  useEffect(()=>{
    checkUser();
  },[])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
