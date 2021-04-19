import React, { useState } from "react";
import { Button, Divider, Form, Header, Icon, Input } from "semantic-ui-react";
import Itemlist from "./Itemlist";

const ListPage = () => {
  const [isChangingName, setIsChangingName] = useState(false);
  const [listName, setListName] = useState("Shopping list");

  const handleNameChange = () => {
    setIsChangingName(!isChangingName);
  };

  return (
    <>
      <div className="header-flex">
        {isChangingName ? (
          <Form onSubmit={handleNameChange} className="header-edit-div">
            <Input
              multiline
              autoFocus
              id="header-edit"
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <Button id="primary-button" type="submit" value="Submit">
              OK
            </Button>
          </Form>
        ) : (
          <>
            <Header as="h1" id="header">
              {listName}
            </Header>
            <span className="cursorPointer" onClick={handleNameChange}>
              <Icon name="write" />
            </span>
          </>
        )}
      </div>
      <Divider />
      <Itemlist />
    </>
  );
};

export default ListPage;
