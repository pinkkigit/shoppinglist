import React, { useContext, useEffect, useState } from "react";
import { Button, Header } from "semantic-ui-react";
import { Formik } from "formik";
import {
  Form,
  FormikDebug,
  Input,
  SubmitButton,
} from "formik-semantic-ui-react";
import * as yup from "yup";
import userService from "../services/Users";
import useSignIn from "../hooks/useSignIn";
import Alert from "./Alert";
import { useHistory } from "react-router";
import AuthStorageContext from "../contexts/AuthStorageContext";

const SignUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username too short")
    .max(30, "Username too long (max 30 characters)")
    .required("Username required"),
  password: yup
    .string()
    .min(3, "Password too short")
    .required("Password required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const currentUser = useContext(AuthStorageContext);
  const history = useHistory();

  useEffect(() => {
    if (currentUser.user) {
      history.push("/");
    }
  }, []);

  const handleFormSubmit = async () => {
    //event.preventDefault();

    // if (password !== confirmPassword) {
    //   setMessage("Passwords don't match");
    //   return;
    // }

    try {
      await userService.create({ username, password });
      const user = await useSignIn({ username, password });
      currentUser.setCurrentUser(user);
      history.push("/");
      console.log("sign up successful", user);
    } catch (error) {
      console.log(error);
      setMessage("Username taken");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };
  return (
    <>
      <Header as="h2">Sign up</Header>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={SignUpSchema}
      >
        <Form>
          <Input
            label="Username:"
            id="login-inputs"
            type="text"
            name="username"
            value={username}
            errorPrompt
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password:"
            id="login-inputs"
            type="password"
            name="password"
            value={password}
            errorPrompt
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm password:"
            id="login-inputs"
            type="password"
            name="passwordConfirmation"
            value={confirmPassword}
            errorPrompt
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SubmitButton id="primary-button" type="submit" value="Submit">
            Sign up
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
};

export default SignUpForm;
