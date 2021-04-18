import React, { useState } from "react";
import { Button, Form, Header, Input, Label } from "semantic-ui-react";
import userService from "../services/Users";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("login");

    setUsername("");
    setPassword("");
  };
  return (
    <>
      <Header as="h2">Log in</Header>
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
        <Button id="primary-button" type="submit" value="Submit">
          Log in
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
