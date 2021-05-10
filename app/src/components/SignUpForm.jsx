import React, { useContext, useEffect, useState } from "react";
import { Header } from "semantic-ui-react";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-semantic-ui-react";
import * as yup from "yup";
import userService from "../services/Users";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from "react-router";
import AuthStorageContext from "../contexts/AuthStorageContext";

const SignUpForm = () => {
  const [users, setUsers] = useState(null);
  const currentUser = useContext(AuthStorageContext);
  const history = useHistory();

  useEffect(async () => {
    if (currentUser.user) {
      history.push("/");
    }
    setUsers(await userService.getAll());
  }, []);

  const SignUpSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Username too short")
      .max(30, "Username too long (max 30 characters)")
      .required("Username required")
      .test("is-taken", "Username already taken", (value) =>
        isUsernameTaken(value)
      ),
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

  const isUsernameTaken = (username) => {
    return !users.find((user) => user.username === username);
  };

  const handleFormSubmit = async (values) => {
    try {
      await userService.create(values);
      const user = await useSignIn(values);
      currentUser.setCurrentUser(user);
      history.push("/");
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
          <SubmitButton id="primary-button" type="submit" value="Submit">
            Sign up
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
};

export default SignUpForm;
