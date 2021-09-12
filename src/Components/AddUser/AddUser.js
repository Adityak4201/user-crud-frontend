import React, { useState } from "react";
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

function AddUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    area: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    // console.log(val);
    setUser({ ...user, [name]: val });
  };

  const handlePhone = (val) => {
    setUser({ ...user, phone: val });
  };

  const handleSubmit = () => {
    setError("");
    setSuccess("");
    axios
      .post("https://usercrud-backend.herokuapp.com/user/register", {
        ...user,
      })
      .then((res) => {
        setSuccess("User Successfully Registered");
      })
      .catch((error) => {
        if (error.response.status === 400)
          setError("Some of the fields are missing/incorrect");
        else if (error.response.status === 402) setError("User already exists");
        else setError("Server isn't responding... Please try again later");
      });
  };

  return (
    <div>
      <Container className="adduser-container">
        <h1 className="heading">Add A User</h1>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Row>
            <Col xs={12} md={6}>
              <Form.Label className="m-2">Name</Form.Label>
              <Form.Control name="name" type="text" onChange={handleInput} />
            </Col>
            <Col xs={12} md={6}>
              <Form.Label className="m-2">Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleInput} />
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
              <Form.Control type="text" name="city" onChange={handleInput} />
            </Col>
            <Col xs={12} md={6}>
              <Form.Label className="m-2">Area</Form.Label>
              <Form.Control type="text" name="area" onChange={handleInput} />
            </Col>
          </Row>
        </Form.Group>
        <input
          type="button"
          className="submit-button"
          onClick={handleSubmit}
          value="Submit"
        />
      </Container>
    </div>
  );
}

export default AddUser;
