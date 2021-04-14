import React from "react";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import Item from "./Item";

const Itemlist = ({
  items,
  handleRemove,
  handleNameClick,
  handleQuantityChange,
  handleRemoveAll,
  handleRemoveChecked,
}) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <>
      <List relaxed celled verticalAlign="middle">
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            handleRemove={handleRemove}
            handleNameClick={handleNameClick}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </List>
      {items.length > 0 && (
        <List>
          <List.Item>
            <List.Content floated="right">
              <Button
                id="delete-checked-button"
                compact
                onClick={handleRemoveChecked}
              >
                <Icon name="check" />
                Delete checked
              </Button>
              <Button compact negative onClick={handleRemoveAll}>
                <Icon name="trash alternate outline" />
                Delete All
              </Button>
            </List.Content>
          </List.Item>
        </List>
      )}
    </>
  );
};

export default Itemlist;
