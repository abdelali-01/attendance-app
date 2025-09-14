import axios from "axios";
import { request, setReports, addReport, removeReport, setError } from "./reportSlice";

const serverUrl = import.meta.env.VITE_BASE_URI;

// Get all reports for the current user (teacher or student)
export const getReports = () => async (dispatch) => {
  dispatch(request());
  
  try {
    const response = await axios.get(`${serverUrl}/report`, {
      withCredentials: true,
    });
    
    dispatch(setReports(response.data));
    return { success: true };
  } catch (error) {
    console.log("Error during getting reports:", error);
    dispatch(setError(error.response?.data?.message || "Failed to load reports. Please try again."));
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to load reports. Please try again." 
    };
  }
};

// Create a new report
export const createReport = (reportData) => async (dispatch) => {
  dispatch(request());
  
  try {
    await axios.post(`${serverUrl}/report`, reportData, {
      withCredentials: true,
    });
    
    // If we get a success response, we can optionally add the report to the state
    // Note: The backend returns "report shared successfully" string, not the report object
    // So we'll just refresh the reports list
    dispatch(getReports());
    
    return { 
      success: true, 
      message: "Report shared successfully!" 
    };
  } catch (error) {
    console.log("Error during creating report:", error);
    dispatch(setError(error.response?.data?.message || "Failed to create report. Please try again."));
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to create report. Please try again." 
    };
  }
};

// Delete a report
export const deleteReport = (reportId) => async (dispatch) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this report? This action cannot be undone."
  );

  if (!confirmDelete) {
    return { success: false, message: "Deletion cancelled." };
  }

  dispatch(request());
  
  try {
    const response = await axios.delete(`${serverUrl}/report/${reportId}`, {
      withCredentials: true,
    });
    
    // Remove the report from the state
    dispatch(removeReport(reportId));
    
    return { 
      success: true, 
      message: response.data.message || "Report deleted successfully!" 
    };
  } catch (error) {
    console.log("Error during deleting report:", error);
    dispatch(setError(error.response?.data?.message || "Failed to delete report. Please try again."));
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to delete report. Please try again." 
    };
  }
};
