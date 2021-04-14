import React from "react";
import { Form, Input } from "semantic-ui-react";

const EditNameForm = ({ item, handleEditClick, value, setValue }) => {
  return (
    <Form>
      <Form.Group inline>
        <Input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => handleEditClick(item)}
        />
      </Form.Group>
    </Form>
  );
};

export default EditNameForm;
