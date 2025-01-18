import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Verification() {
  const { token } = useParams();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_BASE_URI}/auth/verify/${token}`
        );
        setSuccess(true);
      } catch (error) {
        console.error("error during email verification", error);
        alert("Invalid or expired token");
      }
    };
    if (token) {
      fetch();
    }
  }, [token]);

  return (
    <div
      className="verification container-md d-flex align-items-center justify-content-center "
      style={{
        height: "100vh",
      }}
    >
      <div
        className="p-4 rounded-3 flex-grow-1"
        style={{
          maxWidth: "400px",
          backgroundColor: "#F9FAFB",
          boxShadow: "1px 1px 20px #9a99f9",
        }}
      >
        {success ? (
          <>
          <h6 className="text-center">Your email has been successfully verified.</h6>
          <p className="mt-4">You can complete your login now .</p>
          </>
        ) : (
          <>
            {" "}
            <h6 className="text-center">Check your Email</h6>
            <p className="mt-4">
              A verification link has been sent to your email.
            </p>
            <p>Please verify your email to complete your login.</p>
          </>
        )}
        <Link to={"/"}>
          <button className="btn open-style w-100 mt-3">
            back to Login Page
          </button>
        </Link>
      </div>
    </div>
  );
}
