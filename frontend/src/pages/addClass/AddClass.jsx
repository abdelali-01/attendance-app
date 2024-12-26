import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddClass() {
  const navigate = useNavigate();
  const [classe, setClasse] = useState({
    class: "",
    speciality: "",
    system: "",
    module : "" ,
    deleugate : ""
  });
  const handleChange = (e) => {
    setClasse({ ...classe, [e.target.name]: e.target.value });
  };

  // post the class in database
  const fetchData = async (e) => {
    e.preventDefault();

    try {
      try {
        const res = await axios.post(
          "http://localhost:4620/class/newclass",
          classe
        );
        navigate(`/${res.data.class}`);
      } catch (error) {
        alert(error.response.data);
      }
    } catch (error) {
      console.log(error);
      alert("failed to create the class , please try again !");
    }
  };
  return (
    <div className="add-class px-3 flex-grow-1 d-flex flex-column align-items-center mt-5">
      <h3 className="my-5">Add new Class</h3>
      <form onSubmit={fetchData}>
        <div className="row w-100 m-auto my-3 gap-3">
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
            <label htmlFor="speciality">Speciality</label>
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
        </div>
        <div className="row w-100 m-auto gap-3">
          <div className="field col">
            <label htmlFor="module">Module</label>
            <input type="text" name="module" id="module"/>
          </div>
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
        <div className="cta w-100 text-center mt-5">
          <button className="btn open-style rounded-3 px-5">Submit</button>
        </div>
      </form>
    </div>
  );
}
