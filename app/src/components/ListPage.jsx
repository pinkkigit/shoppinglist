import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Header, Icon, Input } from "semantic-ui-react";
import Itemlist from "./Itemlist";
import listService from "../services/Lists";
import itemService from "../services/Items";
import { useRouteMatch } from "react-router";

const ListPage = () => {
  const [isChangingName, setIsChangingName] = useState(false);
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([]);

  const match = useRouteMatch("/lists/:id");
  const id = match.params.id;

  useEffect(async () => {
    try {
      const lists = await listService.getAll();
      const thisList = lists.find((list) => list.listId === id);
      if (!thisList) {
        await listService.create({ listId: id, items: [] });
        setListName("Shopping list");
      } else {
        setListName(thisList.name);
      }

      const allItems = await itemService.getAll(id);
      if (allItems) {
        setItems(allItems);
      }
    } catch (error) {
      console.log("error loading items", error);
    }
  }, []);

  const handleSubmit = async (itemToAdd) => {
    try {
      const returnedList = await itemService.create(id, itemToAdd);
      setItems(returnedList.items);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemove = async (item) => {
    try {
      const newItems = items.filter((i) => i.id !== item.id);
      await itemService.remove(id, item.id);
      setItems(newItems);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveAll = async () => {
    try {
      await itemService.removeAll(id);
      setItems([]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveChecked = async () => {
    try {
      await itemService.removeMany(id);
      setItems(items.filter((i) => !i.checked));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleNameClick = async (item) => {
    try {
      console.log(item.id);
      const updatedItem = { ...item, checked: !item.checked };
      const returnedList = await itemService.update(id, item.id, updatedItem);
      setItems(returnedList.items);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) {
      return null;
    }

    try {
      const updatedItem = { ...item, quantity: newQuantity };
      const returnedList = await itemService.update(id, item.id, updatedItem);
      setItems(returnedList.items);
    } catch (error) {
      console.log("error", error);
    }
  };

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
      <Itemlist
        items={items}
        handleSubmit={handleSubmit}
        handleRemove={handleRemove}
        handleRemoveAll={handleRemoveAll}
        handleRemoveChecked={handleRemoveChecked}
        handleNameClick={handleNameClick}
        handleQuantityChange={handleQuantityChange}
      />
    </>
  );
};

export default ListPage;
