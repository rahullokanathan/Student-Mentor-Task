import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { MenuItem, FormControl, Select } from "@material-ui/core";

const AssignMentorModal = ({ showModal, handleClose, assignMentor }) => {
  const [allMentors, setAllMentors] = useState([]);
  const [mentorSelected, setMentorSelected] = useState("");

  useEffect(() => {
    const getAllMentors = async () => {
      await axios
        .get("/all-mentors")
        .then((response) => setAllMentors(response.data));
    };
    getAllMentors();
  }, []);

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Mentor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="col-6">
            <strong>Select Mentor</strong>
          </label>
          <FormControl>
            <Select
              variant="outlined"
              name="duration"
              value={mentorSelected}
              onChange={(e) => {
                setMentorSelected(e.target.value);
              }}
            >
              {allMentors.map((mentor, index) => {
                return (
                  <MenuItem key={index} value={mentor.id}>
                    {mentor.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              assignMentor(mentorSelected);
            }}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignMentorModal;
