import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Sidebar/Navbar";
import NewUser from "./NewUser/NewUser";
import AllMentors from "./AllUsers/AllMentors";
import AllStudents from "./AllUsers/AllStudents";
import AllAssignedStudents from "./AllUsers/AllAssignedStudents";
import Homepage from "./Homepage/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app">
        <Switch>
          <Route path="/" exact={true} component={Homepage} />
          <Route
            path="/new-mentor"
            exact={true}
            component={() => <NewUser title="Mentor" />}
          />
          <Route
            path="/new-student"
            exact={true}
            component={() => <NewUser title="Student" />}
          />
          <Route
            path="/mentors"
            exact={true}
            component={() => <AllMentors />}
          />
          <Route
            path="/students"
            exact={true}
            component={() => <AllStudents />}
          />
          <Route
            path="/assigned-students/:id"
            exact={true}
            component={AllAssignedStudents}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
