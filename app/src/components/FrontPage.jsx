import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon } from "semantic-ui-react";
import "../index.css";
import { v4 as uuid } from "uuid";

const FrontPage = () => {
  return (
    <>
      <Header as="h1">The best shopping list website ever</Header>
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
      <p>You can not save your shopping list without creating a user!</p>
    </>
  );
};

export default FrontPage;
