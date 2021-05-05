import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, List } from "semantic-ui-react";

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
    <List.Item>
      <List.Content className="users-lists">
        <div className="user-list-text">
          <Link to={`/lists/${list.listId}`}>
            <List.Header>{list.name}</List.Header>
            <List.Description>{joinListItems()}</List.Description>
          </Link>
        </div>
        <List.Content className="delete-list-button-content">
          <Button compact id="delete-list-button">
            <Icon size="large" name="trash alternate outline" />
          </Button>
        </List.Content>
      </List.Content>
    </List.Item>
  );
};

export default UserListItem;
