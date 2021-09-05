import axios from "axios";
import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";
import "./AllStudents.css";
import AssignMentorModal from "../Modals/AssignMentorModal";

const AllStudents = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState("");
  let url = "/all-students";
  const override = css`
    margin: 25px auto;
  `;

  //Get all the students
  const getStudentsData = async () => {
    setLoading(true);
    await axios.get(url).then((response) => setStudentsData(response.data));
    setLoading(false);
  };

  //Intial load
  useEffect(() => {
    getStudentsData();
  }, []);

  //Modal functionality
  const handleClose = () => setShowModal(false);
  const handleShow = (id) => {
    setShowModal(true);
    setStudentId(id);
  };

  //Mentor assignment
  const assignMentor = async (mentorId) => {
    setShowModal(false);
    await axios
      .put("/assign-mentor", { studentId, mentorId })
      .then((response) => alert(response.data));
    getStudentsData();
  };

  return (
    <div className="all-students">
      <h1 className="students-heading">All Students</h1>
      <div className="student-table">
        <div className="student-table-header">
          <div className="student-col-heading" style={{ width: "10%" }}>
            ID
          </div>
          <div className="student-col-heading" style={{ width: "20%" }}>
            Name
          </div>
          <div className="student-col-heading" style={{ width: "20%" }}>
            Email
          </div>
          <div className="student-col-heading" style={{ width: "20%" }}>
            Contact
          </div>
          <div className="student-col-heading" style={{ width: "15%" }}>
            Mentor
          </div>
          <div className="student-col-heading" style={{ width: "15%" }}></div>
        </div>
        {loading ? (
          <div className="loader">
            <FadeLoader color={"#7C807F"} loading={loading} css={override} />
          </div>
        ) : studentsData.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            No records found
          </p>
        ) : (
          studentsData.map((student, index) => {
            return (
              <div className="student-table-data" key={index}>
                <div className="student-col-data" style={{ width: "10%" }}>
                  {student.id}
                </div>
                <div className="student-col-data" style={{ width: "20%" }}>
                  {student.name}
                </div>
                <div className="student-col-data" style={{ width: "20%" }}>
                  {student.email}
                </div>
                <div className="student-col-data" style={{ width: "20%" }}>
                  {student.contact}
                </div>
                <div className="student-col-data" style={{ width: "15%" }}>
                  {student.mentor}
                </div>
                <div className="student-col-data" style={{ width: "15%" }}>
                  <button
                    className="btn btn-sm assign-button"
                    onClick={() => {
                      handleShow(student.id);
                    }}
                  >
                    + Mentor
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {showModal && (
        <AssignMentorModal
          showModal={showModal}
          handleClose={handleClose}
          assignMentor={assignMentor}
        />
      )}
    </div>
  );
};

export default AllStudents;
