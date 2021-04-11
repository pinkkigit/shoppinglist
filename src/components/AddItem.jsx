import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";

const AddItem = ({ handleSubmit }) => {
  const [value, setValue] = useState("");

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit({ name: value, quantity: 1, checked: false });
    setValue("");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Add item..."
        onChange={handleValueChange}
        value={value}
      />
      <Button primary type="submit" value="Submit">
        Add
      </Button>
    </Form>
  );
};

export default AddItem;
