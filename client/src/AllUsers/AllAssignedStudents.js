import axios from "axios";
import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";
import "./AllAssignedStudents.css";

const AllAssignedStudents = (props) => {
  const [assignedStudentsData, setAssignedStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  let id = Number(props.match.params.id);

  const override = css`
    margin: 25px auto;
  `;

  //Get assigned students data
  useEffect(() => {
    const getAssignedStudentsData = async () => {
      setLoading(true);
      await axios
        .post("/assigned-students", { id })
        .then((response) => setAssignedStudentsData(response.data));
      setLoading(false);
    };
    getAssignedStudentsData();
  }, []);

  return (
    <div className="assigned-students">
      <h1 className="assigned-students-heading">All Assigned Students</h1>
      <div className="assigned-students-table">
        <div className="assigned-students-table-header">
          <div
            className="assigned-students-col-heading"
            style={{ width: "10%" }}
          >
            ID
          </div>
          <div
            className="assigned-students-col-heading"
            style={{ width: "30%" }}
          >
            Name
          </div>
          <div
            className="assigned-students-col-heading"
            style={{ width: "30%" }}
          >
            Email
          </div>
          <div
            className="assigned-students-col-heading"
            style={{ width: "30%" }}
          >
            Contact
          </div>
        </div>
        {loading ? (
          <div className="loader">
            <FadeLoader color={"#7C807F"} loading={loading} css={override} />
          </div>
        ) : assignedStudentsData.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            No records found
          </p>
        ) : (
          assignedStudentsData.map((student, index) => {
            return (
              <div className="assigned-students-table-data" key={index}>
                <div
                  className="assigned-students-col-data"
                  style={{ width: "10%" }}
                >
                  {student.id}
                </div>
                <div
                  className="assigned-students-col-data"
                  style={{ width: "30%" }}
                >
                  {student.name}
                </div>
                <div
                  className="assigned-students-col-data"
                  style={{ width: "30%" }}
                >
                  {student.email}
                </div>
                <div
                  className="assigned-students-col-data"
                  style={{ width: "30%" }}
                >
                  {student.contact}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllAssignedStudents;
