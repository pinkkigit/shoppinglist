import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, List } from "semantic-ui-react";
import "../index.css";
import { v4 as uuid } from "uuid";
import AuthStorageContext from "../contexts/AuthStorageContext";
import userService from "../services/Users";
import UserListItem from "./UserListItem";

const FrontPage = ({ handleLogOut }) => {
  const [lists, setLists] = useState([]);
  const currentUser = useContext(AuthStorageContext);

  useEffect(async () => {
    if (currentUser.user) {
      const user = await userService.getOne(currentUser.user.id);
      setLists(user.lists);
    }
  }, [currentUser]);

  return (
    <>
      <Header as="h1">The best shopping list website ever</Header>
      {currentUser.user ? (
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
                  <UserListItem key={list.listId} list={list} />
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
      ) : (
        <>
          <div>
            <Link to="/signup">
              <Button id="frontpage-buttons" compact>
                <Icon name="signup" />
                Sign up
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <Button id="frontpage-buttons" compact>
                <Icon name="sign-in" />
                Log in
              </Button>
            </Link>
          </div>
          <div>
            <Link to={`/lists/${uuid()}`}>
              <Button id="frontpage-buttons" compact>
                <Icon name="write" />
                Try without a user
              </Button>
            </Link>
          </div>
          <p>You can&apos;t save your shopping list without creating a user!</p>
        </>
      )}
    </>
  );
};

export default FrontPage;
