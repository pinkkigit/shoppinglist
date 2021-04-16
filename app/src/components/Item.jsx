import React from "react";
import { Icon, List } from "semantic-ui-react";
import "../index.css";
import Quantity from "./Quantity";

const Item = ({
  item,
  handleRemove,
  handleNameClick,
  handleQuantityChange,
}) => {
  return (
    <List.Item>
      <List.Content className="item-list">
        <Quantity item={item} handleQuantityChange={handleQuantityChange} />
        <span className="item-name" onClick={() => handleNameClick(item)}>
          <p className={item.checked ? "strikethrough" : null}>{item.name}</p>
        </span>
        <List.Content className="edit-and-remove-buttons">
          <span className="cursorPointer" onClick={() => handleRemove(item)}>
            <Icon size="large" name="trash alternate outline" />
          </span>
        </List.Content>
      </List.Content>
    </List.Item>
  );
};

export default Item;
