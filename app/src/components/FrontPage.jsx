import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon } from "semantic-ui-react";
import "../index.css";

const FrontPage = () => {
  return (
    <>
      <Header as="h1">The best shopping list website ever</Header>
      <div>
        <Button id="frontpage-buttons" compact>
          <Icon name="signup" />
          Sign up
        </Button>
      </div>
      <div>
        <Button id="frontpage-buttons" compact>
          <Icon name="sign-in" />
          Log in
        </Button>
      </div>
      <div>
        <Link to="/lists">
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
