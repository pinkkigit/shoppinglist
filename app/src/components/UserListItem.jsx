import React from "react";
import { List } from "semantic-ui-react";

const UserListItem = ({ list }) => {
  const joinListItems = () => {
    let firstItems = list.items
      .slice(0, 3)
      .map((item) => item.name)
      .join(", ");

    if (firstItems.length > 30) {
      firstItems = firstItems.slice(0, firstItems.lastIndexOf(","));
      firstItems += "...";
    } else if (list.items.length > 3) {
      firstItems += "...";
    }

    return firstItems;
  };

  return (
    <List.Item className="users-lists">
      <List.Content>
        <List.Header>{list.name}</List.Header>
        <List.Description>{joinListItems()}</List.Description>
      </List.Content>
    </List.Item>
  );
};

export default UserListItem;
