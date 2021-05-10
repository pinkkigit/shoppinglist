import React, { useContext, useEffect, useState } from "react";
import { Header, Label } from "semantic-ui-react";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-semantic-ui-react";
import * as yup from "yup";
import userService from "../services/Users";
import useSignIn from "../hooks/useSignIn";
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

const isUsernameTaken = async (username) => {
  const users = await userService.getAll();
  return users.find((user) => user.username === username);
};

const SignUpForm = () => {
  const currentUser = useContext(AuthStorageContext);
  const history = useHistory();

  useEffect(() => {
    if (currentUser.user) {
      history.push("/");
    }
  }, []);

  const handleFormSubmit = async (values, { setStatus }) => {
    try {
      const isTaken = await isUsernameTaken(values.username);
      if (isTaken) {
        setStatus({ error: "Username already taken" });

        setTimeout(() => {
          setStatus({});
        }, 5000);
      } else {
        await userService.create(values);
        const user = await useSignIn(values);
        currentUser.setCurrentUser(user);
        history.push("/");
        console.log("sign up successful", user);
      }
    } catch (error) {
      console.log(error);
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
        {({ status }) => (
          <Form>
            <Input
              label="Username:"
              id="login-inputs"
              type="text"
              name="username"
              errorPrompt
            />
            <Input
              label="Password:"
              id="login-inputs"
              type="password"
              name="password"
              errorPrompt
              autoComplete="off"
            />
            <Input
              label="Confirm password:"
              id="login-inputs"
              type="password"
              name="passwordConfirmation"
              errorPrompt
              autoComplete="off"
            />
            {status && status.error && (
              <Label basic color="red" id="signup-username-taken" size="large">
                {status.error}
              </Label>
            )}
            <SubmitButton id="primary-button" type="submit" value="Submit">
              Sign up
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
