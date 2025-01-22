import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const serverUri = process.env.REACT_APP_BASE_URI;

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  
  const [loading, setLoading] = useState(true); // To handle loading state while checking token
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserData = async () => {
    try {
      // Send a request to the server to fetch user details based on the JWT cookie
      const res = await axios.get(`${serverUri}/auth/user`, {
        withCredentials: true,
      });

      // Assuming the server sends back user data in the response
      setUser(res.data.userId);
      setRole(res.data.role);      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to fetch the user data on initial load
    fetchUserData();

    if(user && location.pathname === "/login"){

      navigate('/home')
    }
  }, [navigate, serverUri , user , location.pathname]);

  // Login function to set token and user details
  const login = () => {
    fetchUserData();
  };

  // Logout function to remove token and user details
  const logout = async () => {
    try {
      await axios.post(`${serverUri}/auth/logout` , {} , {withCredentials : true});
    } catch (error) {
      console.error(error);
      alert("faild to log out , please try again !");
    }
    setUser(null);
    setRole(null);
    navigate("/login");
  };

  // If the app is still loading, don't render anything yet
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
