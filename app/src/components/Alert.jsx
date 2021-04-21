import React from "react";
import { Message } from "semantic-ui-react";

const Alert = ({ message }) => {
  return <Message color="red" header={message} />;
};

export default Alert;
