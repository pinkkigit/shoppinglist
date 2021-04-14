import React from "react";
import { Icon } from "semantic-ui-react";
import "../index.css";

const Quantity = ({ item, handleQuantityChange }) => {
  return (
    <span className="quantity">
      <span className="button-minus">
        <Icon
          size="large"
          name="angle left"
          onClick={() => handleQuantityChange(item, Number(item.quantity) - 1)}
        />
      </span>
      {item.quantity}
      <span className="button-plus">
        <Icon
          size="large"
          name="angle right"
          onClick={() => handleQuantityChange(item, Number(item.quantity) + 1)}
        />
      </span>
    </span>
  );
};

export default Quantity;
