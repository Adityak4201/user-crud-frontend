import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import "./ListUsers.css";

const ListUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setSuccess("");
    setFetchError("");
    const ac = new AbortController();
    axios
      .get("https://usercrud-backend.herokuapp.com/user/getUsers")
      .then((res) => {
        setUsers(res.data.users);
        if (users) setFetchError("");
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 402)
          setFetchError(error.response.data.error);
        else setFetchError("Something went wrong...😢");
      });
    return () => ac.abort();
  }, [users]);

  const handleDeleteClick = (e) => {
    const name = e.target.name;
    const index = name.charAt(name.length - 1);
    const email = users[index].email;
    console.log(email);
    setError("");
    setSuccess("");
    axios
      .delete("https://usercrud-backend.herokuapp.com/user/delete", {
        params: {
          email,
        },
      })
      .then((res) => {
        setSuccess(res.data.msg);
        setError("");
        console.log(users.splice(index, 1));
      })
      .catch((error) => {
        console.log(error.response);
        setSuccess("");
        if (error.response.status === 400) setError("Email is missing");
        setError(error.response.data.error);
      });
  };

  const handleEditClick = (e) => {
    const name = e.target.name;
    const index = name.charAt(name.length - 1);
    props.history.push({
      pathname: "/edit",
      state: { user: users[index] },
    });
  };

  return (
    <Container>
      <h1 className="heading">Show All Users</h1>
      {fetchError === "" ? (
        <>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Table responsive="lg" striped bordered hover>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Area</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.country}</td>
                  <td>{u.state}</td>
                  <td>{u.city}</td>
                  <td>{u.area}</td>
                  <td>
                    <input
                      type="button"
                      className="edituser-button"
                      name={`Edit-${i}`}
                      value="Edit"
                      onClick={handleEditClick}
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      className="edituser-button"
                      name={`Delete-${i}`}
                      value="Delete"
                      onClick={handleDeleteClick}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Alert variant="danger">{fetchError}</Alert>
      )}
    </Container>
  );
};

export default ListUsers;
