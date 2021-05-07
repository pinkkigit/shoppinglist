import React from "react";
import { Message } from "semantic-ui-react";

const Alert = ({ message, color = "red" }) => {
  return <Message color={color} header={message} />;
};

export default Alert;
