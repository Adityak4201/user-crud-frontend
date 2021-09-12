import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import AddUser from "./Components/AddUser";
import EditUser from "./Components/EditUser";
import ListUsers from "./Components/ListUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">
            Add User
          </NavLink>
          <NavLink activeClassName="active" to="/edit">
            Update User
          </NavLink>
          <NavLink activeClassName="active" to="/list">
            List Users
          </NavLink>
        </div>
        <Switch>
          <Route path="/" exact component={AddUser} />
          <Route path="/edit" exact component={EditUser} />
          <Route path="/list" exact component={ListUsers} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
