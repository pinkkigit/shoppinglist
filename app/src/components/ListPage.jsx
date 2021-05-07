import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Form, Header, Icon, Input } from "semantic-ui-react";
import Itemlist from "./Itemlist";
import listService from "../services/Lists";
import itemService from "../services/Items";
import userService from "../services/Users";
import { useRouteMatch } from "react-router";
import AuthStorageContext from "../contexts/AuthStorageContext";
import Alert from "./Alert";

const ListPage = ({ user }) => {
  const [isChangingName, setIsChangingName] = useState(false);
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([]);
  const [list, setList] = useState(null);
  const [thisUser, setThisUser] = useState(null);
  const [isMyList, setIsMyList] = useState(false);

  const match = useRouteMatch("/lists/:id");
  const id = match.params.id;

  useEffect(async () => {
    const lists = await listService.getAll();
    const thisList = lists.find((list) => list.listId === id);
    setList(thisList);

    if (user) {
      setThisUser(await userService.getOne(user.id));
    }

    if (user && !thisList) {
      setList(
        await listService.create({
          listId: id,
          items: [],
          name: "Shopping list",
        })
      );
    }
  }, [user]);

  useEffect(async () => {
    if (list) {
      setListName(list.name);
      const allItems = await itemService.getAll(id);
      if (allItems) {
        setItems(allItems);
      }
    } else {
      setListName("Shopping list");
    }

    if (list && list.users.length <= 1) {
      addListToUser(list._id);
    }

    if (list && user) {
      if (list.users.includes(user.id)) {
        setIsMyList(true);
      }
    }
  }, [list]);

  const addListToUser = async (id) => {
    if (thisUser) {
      const userHasList = thisUser.lists.some((list) => list._id == id);
      if (!userHasList) {
        const newLists = thisUser.lists.concat(id);
        const newUser = {
          username: thisUser.username,
          id: thisUser.id,
          lists: newLists,
        };
        await userService.update(thisUser.id, newUser);
        addUserToList();
      }
    }
  };

  const addUserToList = async () => {
    if (user && list) {
      if (!list.users.find((u) => u.id === user.id)) {
        const updatedList = {
          ...list,
          users: list.users.concat(user.id),
        };
        const result = await listService.update(id, updatedList);
        setIsMyList(true);
      }
    }
  };

  const handleSubmit = async (itemToAdd) => {
    try {
      if (!user) {
        setItems(items.concat(itemToAdd));
        return;
      }
      const returnedList = await itemService.create(id, itemToAdd);
      setItems(returnedList.items);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemove = async (item) => {
    try {
      if (!user) {
        setItems(items.filter((i) => i !== item));
        return;
      }
      const newItems = items.filter((i) => i.id !== item.id);
      await itemService.remove(id, item.id);
      setItems(newItems);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveAll = async () => {
    try {
      if (user) {
        await itemService.removeAll(id);
      }
      setItems([]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveChecked = async () => {
    try {
      if (user) {
        await itemService.removeMany(id);
      }
      setItems(items.filter((i) => !i.checked));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleNameClick = async (item) => {
    try {
      const updatedItem = { ...item, checked: !item.checked };
      if (!user) {
        setItems(items.map((i) => (i === item ? updatedItem : i)));
        return;
      }
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
      if (!user) {
        setItems(items.map((i) => (i === item ? updatedItem : i)));
        return;
      }
      const returnedList = await itemService.update(id, item.id, updatedItem);
      setItems(returnedList.items);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleNameChange = async () => {
    setIsChangingName(!isChangingName);
    if (!user) {
      return;
    }

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

  const handleAddToMyLists = async () => {
    addListToUser(list._id);
  };

  return (
    <>
      {!user && (
        <Alert
          color="brown"
          message="You are not signed in. Any changes made to the list will not be saved!"
        />
      )}
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
      {!isMyList ? (
        <Button
          compact
          id="add-to-my-lists-button"
          onClick={handleAddToMyLists}
        >
          <Icon name="add" />
          Add to my lists
        </Button>
      ) : null}
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
