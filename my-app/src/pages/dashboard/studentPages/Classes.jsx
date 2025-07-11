import React, { useEffect, useState } from "react";
import ClassItem from "../../../components/ClassItem";
import Popup from "../../../components/Popup";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { safeMap } from "../../../utils/safeArray";

export default function Classes() {
  const {classes : studentClasses} = useSelector((state)=> state.classes);
  const loading = false ; 
  
  // manage the join class popup display with state
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="classes-page flex-grow-1 mt-3">
      <div className="container py-5">
        {loading ? (
          <>Loading ... </>
        ) : studentClasses.length < 1 ? (
          <div className="mt-5">
            <p className="fs-3 text-black-50 text-center">
              No class Available !
            </p>
          </div>
        ) : (
          safeMap(studentClasses, (classe) => {
            return (
              <Link to={`/dashboard/classes/${classe._id}`} key={classe._id}>
                <ClassItem  classe={classe} />
              </Link>
            )
          })
        )}

        <div className="join-class">
          <button
            className="btn open-style position-fixed m-3"
            style={{
              right: "0",
              bottom: "0",
            }}
            onClick={() => setIsVisible(true)}
          >
            Join class
          </button>
          <Popup
            display={isVisible}
            closePopup={() => {
              setIsVisible(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
