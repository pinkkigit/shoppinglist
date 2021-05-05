import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Header, Input, Label } from "semantic-ui-react";
import userService from "../services/Users";
import loginService from "../services/Login";
import useSignIn from "../hooks/useSignIn";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { useHistory } from "react-router";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = useContext(AuthStorageContext);
  const history = useHistory();

  useEffect(() => {
    if (currentUser.user) {
      history.push("/");
    }
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await useSignIn({ username, password });
      currentUser.setCurrentUser(user);
      setUsername("");
      setPassword("");
      history.push("/");
    } catch (error) {
      console.log("wrong credentials");
    }
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
