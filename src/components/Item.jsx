import React, { useState } from "react";
import { Checkbox, Form, Grid, Icon, Input, Segment } from "semantic-ui-react";
import "../App.css";

const Item = ({ item, handleRemove, handleCheckChange, handleEdit }) => {
  const [editItem, setEditItem] = useState(false);
  const [value, setValue] = useState(item.name);

  const handleEditClick = (item) => {
    setEditItem(!editItem);
    setValue(value);
    handleEdit(item, value);
  };

  return (
    <Segment>
      <Grid
        columns="equal"
        container
        padded="horizontally"
        verticalAlign="middle"
      >
        <Grid.Column width="1">
          <Checkbox onClick={() => handleCheckChange(item)} />
        </Grid.Column>
        <Grid.Column textAlign="left">
          {editItem ? (
            <Form onSubmit={() => handleEditClick(item)}>
              <Input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => handleEditClick(item)}
              />
            </Form>
          ) : (
            <p className={item.checked ? "strikethrough" : null}>{item.name}</p>
          )}
        </Grid.Column>
        <Grid.Column textAlign="right">
          <span className="cursorPointer" onClick={() => handleEditClick(item)}>
            <Icon name="edit outline" />
          </span>
          <span className="cursorPointer" onClick={() => handleRemove(item)}>
            <Icon name="trash alternate outline" />
          </span>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Item;
