import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClass } from "../../store/class/classHandler";
import { useToast } from "../../components/Toast/ToastContainer";

export default function AddClass() {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [classe, setClasse] = useState({
    class: "",
    speciality: "",
    system: "",
    module : "" ,
    deleugate : "" ,
    d_AttendanceMark : null ,
    minusWithAbsence : null ,
  });
  const handleChange = (e) => {
    setClasse({ ...classe, [e.target.name]: e.target.value });
  };

  // post the class in database
  const fetchData = async (e) => {
    e.preventDefault();
    const result = await dispatch(addClass(classe, navigate));
    
    if (result) {
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message);
      }
    }
  };
  
  return (
    <div className="add-class px-3 flex-grow-1 d-flex flex-column align-items-center mt-5">
      <h3 className="my-5">Add new Class</h3>
      <form onSubmit={fetchData}>
        <div className="row w-100 m-auto my-3 gap-1">
        <div className="field  col">
            <label htmlFor="system">system </label>
            <select
              value={classe.system}
              onChange={handleChange}
              name="system"
              id="system"
              required
            >
              <option selected hidden>
                Select study system
              </option>
              <option value="licence">Licence</option>
              <option value="master">Master</option>
              <option value="Proffesionnel licence">
                Proffesionnel Licence
              </option>
              <option value="engineer">engineer</option>
              <option value="classic">classic</option>
            </select>
          </div>
          <div className="field col">
            <label htmlFor="speciality">Speciality *</label>
            <input
              value={classe.speciality}
              onChange={handleChange}
              type="text"
              name="speciality"
              id="speciality"
              placeholder="Enter the speciality of class"
              required
            />
          </div>
          <div className="field col">
            <label htmlFor="module">Module *</label>
            <input type="text" name="module" id="module" required placeholder="your module" value={classe.module} onChange={handleChange}/>
          </div>
        </div>
        <div className="row w-100 m-auto gap-1">
          <div className="field col">
            <label htmlFor="class">Class name</label>
            <input
              value={classe.class}
              onChange={handleChange}
              type="text"
              name="class"
              id="class"
              placeholder="choose class name"
              required
            />
          </div>
          <div className="field col">
            <label htmlFor="deleguate">Class deleguate</label>
            <input type="text" name="deleguate" id="deleguate" placeholder="deleguate name"/>
          </div>
        </div>
        <div className="row w-100 m-auto mt-3 gap-1">
          <div className="field col">
            <label htmlFor="d_AttendanceMark">A-mark </label>
            <input type="number" step={"0.25"} name="d_AttendanceMark" id="d_AttendanceMark" value={classe.d_AttendanceMark} placeholder="example : 5" required onChange={handleChange}/>
          </div>
          <div className="field col">
            <label htmlFor="minusWithAbsence">Minus with absence</label>
            <input type="number" step={"0.25"} name="minusWithAbsence" id="minusWithAbsence" value={classe.minusWithAbsence} placeholder="example : 0.5" required onChange={handleChange}/>
          </div>
        </div>
        <div className="cta w-100 text-center mt-5">
          <button className="btn open-style rounded-3 px-5">Submit</button>
        </div>
      </form>
    </div>
  );
}
