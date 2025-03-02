import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Popup({ display, closePopup, updateStudent , currentClass , fetchData}) {
  const serverUri = process.env.REACT_APP_BASE_URI;
  const { user } = useSelector(state => state.user);  

  const [code, setCode] = useState("");
  const [alert, setAlert] = useState("");

  // manage the student informations with states
  const [absences, setAbsences] = useState(null);
  const [mark, setMark] = useState(null);

  useEffect(()=>{
    if(display && updateStudent){
      const calculateMark = currentClass.d_AttendanceMark - absences * currentClass.minusWithAbsence;
      setMark(calculateMark);   
    }
  },[absences , display , updateStudent , currentClass]);

  useEffect(() => {
    if (!display) {
      setCode("");
      setAlert("");
    }

    // set the student information values
    if (updateStudent) {
      setAbsences(updateStudent.absences);
      setMark(updateStudent.mark)
    }
  }, [display]);

  const submitJoin = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${serverUri}/student/enter/${user}`, {
        shareCode: code,
      });
      window.location.reload();
    } catch (error) {
      if (error.response.status === 404 || error.response.status === 401) {
        return setAlert(error.response.data);
      }
      console.error("error during joining the class", error);
      alert("Faild to join the class , Please try Again");
    }
  };

  const submitUpdate = async (e) => {
    console.log(updateStudent.student._id);
    e.preventDefault();

    try {
       await axios.put(`${serverUri}/admin/updateStudentMark/${updateStudent.student._id}` , {
        classId : currentClass.classId ,
        absences ,
      })
      
      fetchData();
      closePopup();
    } catch (error) {
      console.error("error during update the student mark" , error);
      alert("Faild , please Try again !");
    }
  }

  const updateStudentUi = () => {
    return (
      <>
        <h5>Update Student Mark</h5>
        <form className="my-4" onSubmit={submitUpdate}>
          <div className="field my-3">
            <label htmlFor="absences">Student Absences</label>
            <input
              type="number"
              name="absences"
              value={absences}
              onChange={(e) => {
                setAbsences(e.target.value);
              }}
              required
            />
            
          </div>
          <div className="a-mark my-4">
            <span >Student A-mark : </span>
            <span className={`fs-5`}>{mark}</span>
          </div>
          <div className="cta d-flex justify-content-end gap-1">
            <button type="button" className="btn" onClick={closePopup}>
              Cancel
            </button>
            <button className="btn open-style">Submit</button>
          </div>
        </form>
      </>
    );
  };

  return (
    <div
      className={`join-class position-fixed ${
        display ? "d-flex" : "d-none"
      } align-items-center justify-content-center `}
      style={{
        height: "100vh",
        width: "100%",
        top: "0",
        left: "0",
        backdropFilter: "blur(5px)",
        backgroundColor: "#75757563",
        zIndex: "10000",
      }}
    >
      <div
        className="content p-3 bg-white rounded-3 position-relative"
        style={{
          width: "350px",
        }}
      >
        <i
          onClick={closePopup}
          className="fa-solid fa-xmark fs-4 position-absolute"
          role="button"
          style={{
            right: "10px",
          }}
        ></i>
        {updateStudent ? (
          updateStudentUi()
        ) : (
          <>
            <h4>Join class</h4>
            <form className="my-3" onSubmit={submitJoin}>
              <div className="field my-3">
                <label htmlFor="code">Enter the class code</label>
                <input
                  type="text"
                  name="code"
                  minLength={"6"}
                  maxLength={"6"}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setAlert("");
                  }}
                  required
                />
                <div className="form-text text-danger">{alert}</div>
              </div>
              <div className="cta d-flex justify-content-end gap-1">
                <button type="button" className="btn" onClick={closePopup}>
                  Cancel
                </button>
                <button className="btn open-style">Join</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
