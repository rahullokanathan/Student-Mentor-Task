import axios from "axios";
import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";
import "./AllMentors.css";
import AddStudentsModal from "../Modals/AddStudentsModal";
import { Link } from "react-router-dom";

const AllMentors = () => {
  const [mentorsData, setMentorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mentorId, setMentorId] = useState("");
  let url = "/all-mentors";
  const override = css`
    margin: 25px auto;
  `;

  //Get all the mentors
  const getMentorsData = async () => {
    setLoading(true);
    axios.get(url).then((response) => setMentorData(response.data));
    setLoading(false);
  };

  //Initial load
  useEffect(() => {
    getMentorsData();
  }, []);

  //Modal functionality
  const handleClose = () => setShowModal(false);
  const handleShow = (id) => {
    setShowModal(true);
    setMentorId(id);
  };

  //Assigning students to mentor
  const addStudents = async (selectedStudents) => {
    setShowModal(false);
    await axios
      .put("/add-students", { mentorId, selectedStudents })
      .then((response) => alert(response.data));
  };

  return (
    <div className="all-mentors">
      <h1 className="mentors-heading">All Mentors</h1>
      <div className="mentor-table">
        <div className="mentor-table-header">
          <div className="mentor-col-heading" style={{ width: "9%" }}>
            ID
          </div>
          <div className="mentor-col-heading" style={{ width: "23%" }}>
            Name
          </div>
          <div className="mentor-col-heading" style={{ width: "23%" }}>
            Email
          </div>
          <div className="mentor-col-heading" style={{ width: "15%" }}>
            Contact
          </div>
          <div className="mentor-col-heading" style={{ width: "15%" }}></div>
          <div className="mentor-col-heading" style={{ width: "15%" }}></div>
        </div>
        {loading ? (
          <div className="loader">
            <FadeLoader color={"#7C807F"} loading={loading} css={override} />
          </div>
        ) : mentorsData.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            No records found
          </p>
        ) : (
          mentorsData.map((mentor, index) => {
            return (
              <div className="mentor-table-data" key={index}>
                <div className="mentor-col-data" style={{ width: "9%" }}>
                  {mentor.id}
                </div>
                <div className="mentor-col-data" style={{ width: "23%" }}>
                  {mentor.name}
                </div>
                <div className="mentor-col-data" style={{ width: "23%" }}>
                  {mentor.email}
                </div>
                <div className="mentor-col-data" style={{ width: "15%" }}>
                  {mentor.contact}
                </div>
                <div className="mentor-col-data" style={{ width: "15%" }}>
                  <button
                    className="btn btn-sm btn-primary add-button"
                    onClick={() => {
                      handleShow(mentor.id);
                    }}
                  >
                    + Students
                  </button>
                </div>
                <div className="mentor-col-data" style={{ width: "15%" }}>
                  <Link to={`/assigned-students/${mentor.id}`}>
                    <button className="btn btn-sm btn-primary view-button">
                      View Students
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
      {showModal && (
        <AddStudentsModal
          showModal={showModal}
          handleClose={handleClose}
          addStudents={addStudents}
        />
      )}
    </div>
  );
};

export default AllMentors;
