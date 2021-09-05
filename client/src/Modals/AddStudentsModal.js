import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { MenuItem, FormControl, Select } from "@material-ui/core";

const AssignMentorModal = ({ showModal, handleClose, addStudents }) => {
  const [allStudents, setAllStudents] = useState([]);
  const [studentsSelected, setStudentsSelected] = useState([]);

  useEffect(() => {
    const getAllStudents = async () => {
      await axios
        .get("/all-students")
        .then((response) => setAllStudents(response.data));
    };
    getAllStudents();
  }, []);

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="col-6">
            <strong>Select Students</strong>
          </label>
          <FormControl>
            <Select
              variant="outlined"
              multiple
              name="duration"
              value={studentsSelected}
              onChange={(e) => {
                setStudentsSelected(e.target.value);
              }}
            >
              {allStudents.map((student, index) => {
                return (
                  student.mentor === "" && (
                    <MenuItem key={index} value={student.id}>
                      {student.name}
                    </MenuItem>
                  )
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
              addStudents(studentsSelected);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignMentorModal;
