import React, { useState } from "react";
import axios from "axios";
import "./NewUser.css";

const NewUser = ({ title }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  let url = title === "Student" ? "/create-student" : "/create-mentor";

  //Create new user functionality
  const handleSubmit = async () => {
    if (name !== "" && email !== "" && contact !== "") {
      await axios
        .post(url, { name, email, contact })
        .then((response) => alert(response.data));
      setName("");
      setEmail("");
      setContact("");
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <div className="create-user">
      <h2 className="create-user-heading">Create New {title}</h2>
      <div className="create-user-form">
        <div className="form-group">
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            name="name"
            id="userName"
            value={name}
            className="form-control"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            className="form-control"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Mobile</label>
          <input
            type="number"
            name="contact"
            id="contact"
            value={contact}
            className="form-control"
            placeholder="Enter Mobile Number"
            autoComplete="off"
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="create-btn btn btn-primary"
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewUser;
