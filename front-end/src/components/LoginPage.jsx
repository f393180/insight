/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import authenticateUser from "../services/authService";
// https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const findFormErrors = () => {
    const { username, password } = form;
    const newErrors = {};
    if (!username || username === "") newErrors.username = "cannot be blank!";
    if (!password || password === "") newErrors.password = "cannot be blank!";

    return newErrors;
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      const { username, password } = form;
      const response = authenticateUser(username, password);
      console.log(response);
      setLoading(false);
      /*
      setTimeout(() => {
        // do your thing!
        console.log("waiting...");
        alert("Thank you for your feedback!");
        setLoading(false);
      }, 5000);
      // No errors! Put any logic here for the form submission!
      */
    }
  };

  return (
    <LoadingOverlay active={loading} spinner text="Loading content...">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2>Sign In</h2>
              <Form>
                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setField("username", e.target.value)}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setField("password", e.target.value)}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100 text-center" onClick={handleSubmit}>
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoadingOverlay>
  );
}
