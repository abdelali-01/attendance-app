import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import axios from "axios";

const GetReports = createContext();

export const useReports = () => {
  return useContext(GetReports);
};

export default function GetReportsProvider({ children }) {
  const serverUri = process.env.REACT_APP_BASE_URI;

  const { role, user } = useAuth();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${serverUri}/report/${user}`);

        // Assuming the reports have a timestamp field (e.g., 'createdAt'), you can sort by that
        const sortedReports = res.data.sort((a, b) => {
          // Compare based on the timestamp or date field (adjust field name as necessary)
          return new Date(b.createdAt) - new Date(a.createdAt); // Sorting in descending order
        });

        setReports(sortedReports);
      } catch (error) {
        console.log("error during getting the reports", error);
        alert("faild to get your reports , please try agin !");
      }
    };

    if (user) {
      fetchReports();
    }
  }, [user, role, serverUri]);

  // get the report with the data 

  return (
    <GetReports.Provider value={{ reports }}>{children}</GetReports.Provider>
  );
}
