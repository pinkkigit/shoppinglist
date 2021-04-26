import React, { useState } from "react";
import { Button, Form, Header, Input } from "semantic-ui-react";
import userService from "../services/Users";
import Alert from "./Alert";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      await userService.create({ username, password });
    } catch (error) {
      console.log("error", error);
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      <Header as="h2">Sign up</Header>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <label>Username: </label>
          <Input
            id="login-inputs"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password: </label>
          <Input
            id="login-inputs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm password: </label>
          <Input
            id="login-inputs"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Field>
        {message && <Alert message={message} />}
        <Button id="primary-button" type="submit" value="Submit">
          Sign up
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
