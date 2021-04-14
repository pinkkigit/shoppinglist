import React from "react";
import { List, Segment } from "semantic-ui-react";
import Item from "./Item";

const Itemlist = ({
  items,
  handleRemove,
  handleCheckChange,
  handleEdit,
  handleQuantityChange,
}) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <List relaxed celled verticalAlign="middle">
      {items.map((item, index) => (
        <Item
          key={index}
          item={item}
          handleRemove={handleRemove}
          handleCheckChange={handleCheckChange}
          handleEdit={handleEdit}
          handleQuantityChange={handleQuantityChange}
        />
      ))}
    </List>
  );
};

export default Itemlist;
