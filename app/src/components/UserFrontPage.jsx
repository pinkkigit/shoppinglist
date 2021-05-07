import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, List } from "semantic-ui-react";
import "../index.css";
import { v4 as uuid } from "uuid";
import AuthStorageContext from "../contexts/AuthStorageContext";
import userService from "../services/Users";
import listService from "../services/Lists";
import UserListItem from "./UserListItem";

const UserFrontPage = ({ handleLogOut }) => {
  const [lists, setLists] = useState([]);
  const currentUser = useContext(AuthStorageContext);

  useEffect(async () => {
    if (currentUser.user) {
      const user = await userService.getOne(currentUser.user.id);
      setLists(user.lists);
    }
  }, [currentUser]);

  const handleListDelete = async (list) => {
    const updatedLists = lists.filter((l) => l !== list);
    const newUser = {
      username: currentUser.user.username,
      id: currentUser.user.id,
      lists: updatedLists,
    };
    await userService.update(currentUser.user.id, newUser);

    const updatedListUsers = list.users.filter(
      (u) => u !== currentUser.user.id
    );

    if (updatedListUsers.length === 0) {
      await listService.remove(list.listId);
    } else {
      await listService.update(list.listId, {
        ...list,
        users: updatedListUsers,
      });
    }
    setLists(updatedLists);
  };

  return (
    <>
      <p>
        Logged in as <strong>{currentUser.user.username}</strong>
      </p>
      <div>
        <Link to={`/lists/${uuid()}`}>
          <Button id="frontpage-buttons" compact>
            <Icon name="write" />
            Create a new list
          </Button>
        </Link>
      </div>
      {lists.length > 0 && (
        <>
          <Header as="h2">My lists</Header>
          <List celled relaxed>
            {lists.map((list) => (
              <UserListItem
                key={list.listId}
                list={list}
                handleListDelete={handleListDelete}
              />
            ))}
          </List>
        </>
      )}
      <div>
        <Button id="frontpage-buttons" compact onClick={handleLogOut}>
          <Icon name="sign-out" />
          Log out
        </Button>
      </div>
    </>
  );
};

export default UserFrontPage;
