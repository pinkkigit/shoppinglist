import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import "../index.css";

const AddItem = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  const [quantityValue, setQuantityValue] = useState(1);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantityValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit({ name: value, quantity: quantityValue, checked: false });
    setValue("");
    setQuantityValue(1);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Input
        className="quantityInput"
        type="number"
        min="0"
        name="quantity"
        value={quantityValue}
        onChange={handleQuantityChange}
      />
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
