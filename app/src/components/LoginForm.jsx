import React, { useContext, useEffect, useState } from "react";
import { Header, Label } from "semantic-ui-react";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-semantic-ui-react";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { useHistory } from "react-router";

const LoginForm = () => {
  const currentUser = useContext(AuthStorageContext);
  const history = useHistory();

  useEffect(() => {
    if (currentUser.user) {
      history.push("/");
    }
  }, []);

  const LoginSchema = yup.object().shape({
    username: yup.string().required("Username required"),
    password: yup.string().required("Password required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleFormSubmit = async (values, { setStatus, resetForm }) => {
    try {
      const user = await useSignIn(values);
      currentUser.setCurrentUser(user);
      history.push("/");
    } catch (error) {
      resetForm({
        values: {
          username: values.username,
          password: "",
        },
      });
      setStatus({ error: "Wrong username or password" });
    }
  };
  return (
    <>
      <Header as="h2">Log in</Header>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={LoginSchema}
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
            />
            {status && status.error && (
              <Label basic color="red" id="signup-username-taken" size="large">
                {status.error}
              </Label>
            )}
            <SubmitButton id="primary-button" type="submit" value="Submit">
              Log in
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
