import React from "react";
import { Checkbox, Grid, Icon, Segment } from "semantic-ui-react";
import "../App.css";

const Item = ({ item, handleRemove, handleCheckChange }) => {
  return (
    <Segment>
      <Grid container>
        <Grid.Column>
          <Checkbox onClick={() => handleCheckChange(item)} />
        </Grid.Column>
        <Grid.Column>
          <p className={item.checked ? "strikethrough" : null}>{item.name}</p>
        </Grid.Column>
        <Grid.Column floated="right">
          <div className="cursorPointer" onClick={() => handleRemove(item)}>
            <Icon name="trash alternate outline" />
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Item;
