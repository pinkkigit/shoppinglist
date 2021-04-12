import React from "react";
import { Segment } from "semantic-ui-react";
import Item from "./Item";

const Itemlist = ({ items, handleRemove, handleCheckChange }) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <Segment.Group piled>
      {items.map((item, index) => (
        <Item
          key={index}
          item={item}
          handleRemove={handleRemove}
          handleCheckChange={handleCheckChange}
        />
      ))}
    </Segment.Group>
  );
};

export default Itemlist;
