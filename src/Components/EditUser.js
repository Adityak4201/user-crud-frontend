import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./AddUser.css";
import PhoneInput from "react-phone-number-input";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import axios from "axios";
import "react-phone-number-input/style.css";

function EditUser(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    area: "",
  });
  const state = props.location.state;
  useEffect(() => {
    if (state !== null) setUser(state.user);
    //eslint-disable-next-line
  }, []);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setUser({ ...user, [name]: val });
    // console.log(user);
  };

  const handlePhone = (val) => {
    setUser({ ...user, phone: val });
  };

  const handleSubmit = () => {
    setError("");
    setSuccess("");
    axios
      .put(
        "https://4000-aqua-chicken-iicfq4gb.ws-us15.gitpod.io/user/updateUser",
        {
          ...user,
        }
      )
      .then((res) => {
        setSuccess("User Successfully Updated");
      })
      .catch((error) => {
        if (error.response.status === 400)
          setError("Some of the fields are missing/incorrect");
        else setError("Server isn't responding... Please try again later");
      });
  };
  return (
    <div>
      <Container className="adduser-container">
        <h1 className="heading">Edit A User</h1>
        {props.location.state !== null ? (
          <>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Row>
                <Col xs={12} md={6}>
                  <Form.Label className="m-2">Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={user.name}
                    onChange={handleInput}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="m-2">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="m-2">Phone</Form.Label>
                  <PhoneInput
                    className="box-height"
                    name="phone"
                    id="phone"
                    placeholder="Enter phone number"
                    value={user.phone}
                    onChange={handlePhone}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Label className="m-2">Country</Form.Label>
                  <CountryDropdown
                    value={user.country}
                    defaultOptionLabel="Select Country"
                    className="inline-dropdown country-mb"
                    onChange={(val) => setUser({ ...user, country: val })}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="m-2">State</Form.Label>
                  <RegionDropdown
                    country={user.country}
                    value={user.state}
                    className="inline-dropdown"
                    onChange={(val) => setUser({ ...user, state: val })}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Label className="m-2">City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={user.city}
                    onChange={handleInput}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="m-2">Area</Form.Label>
                  <Form.Control
                    type="text"
                    name="area"
                    value={user.area}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
            </Form.Group>
            <input
              type="button"
              className="submit-button"
              onClick={handleSubmit}
              value="Update"
            />
          </>
        ) : (
          <Alert variant="info">Select a User to edit first</Alert>
        )}
      </Container>
    </div>
  );
}

export default EditUser;
