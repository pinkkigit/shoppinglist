import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Header, Icon, Input } from "semantic-ui-react";
import Itemlist from "./Itemlist";
import listService from "../services/Lists";
import { useRouteMatch } from "react-router";

const ListPage = () => {
  const [isChangingName, setIsChangingName] = useState(false);
  const [listName, setListName] = useState("");

  const match = useRouteMatch("/lists/:id");
  const id = match.params.id;

  useEffect(async () => {
    const list = await listService.getOne(id);
    if (list.name) {
      setListName(list.name);
    } else {
      setListName("Shopping list");
    }
  }, []);

  const handleNameChange = async () => {
    setIsChangingName(!isChangingName);

    if (isChangingName) {
      try {
        const list = await listService.getOne(id);
        const newList = {
          ...list,
          name: listName,
        };

        await listService.update(id, newList);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <div className="header-flex">
        {isChangingName ? (
          <Form onSubmit={handleNameChange} className="header-edit-div">
            <Input
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
