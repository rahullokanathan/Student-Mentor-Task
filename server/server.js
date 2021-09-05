import express, { request } from "express";
import path from "path";
const PORT = process.env.PORT || 5000;
const mentors = [];
const students = [];

const app = express();
app.use(express.json());
const __dirname = path.resolve();
console.log(__dirname);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "client/build")));

//Create mentor
app.post("/create-mentor", (req, res) => {
  mentors.push({
    id: mentors.length + 1,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
  });
  res.send("Mentor created successfully");
});

//Create student
app.post("/create-student", (req, res) => {
  students.push({
    id: students.length + 1,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    mentor: "",
  });
  res.send("Student created successfully");
});

//Get all mentors
app.get("/all-mentors", (req, res) => {
  if (mentors.length > 0) {
    res.json(mentors);
  } else {
    res.json([]);
  }
});

//Get all students
app.get("/all-students", (req, res) => {
  if (students.length > 0) {
    res.json(students);
  } else {
    res.json([]);
  }
});

//Assign mentor to student
app.put("/assign-mentor", (req, res) => {
  let mentor = mentors.find((item) => {
    return item.id === req.body.mentorId;
  });

  students.forEach((student) => {
    if (student.id === req.body.studentId) {
      student.mentor = mentor.name;
    }
  });

  res.send("Mentor assigned successfully");
});

//Add students for mentor
app.put("/add-students", (req, res) => {
  let mentor = mentors.find((item) => {
    return item.id === req.body.mentorId;
  });

  req.body.selectedStudents.map((selectedStudentId) => {
    students.forEach((student) => {
      if (selectedStudentId === student.id) {
        student.mentor = mentor.name;
      }
    });
  });
  res.send("Students addedd successfully");
});

//Get all students for perticular mentor
app.post("/assigned-students", (req, res) => {
  let mentor = mentors.find((item) => {
    return item.id === req.body.id;
  });

  const assignedStudents = students.filter(
    (student) => student.mentor === mentor.name
  );
  if (assignedStudents.length > 0) {
    res.json(assignedStudents);
  } else {
    res.send([]);
  }
});

//Server
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});
app.listen(PORT, () => {
  console.log("server is up and running");
});
