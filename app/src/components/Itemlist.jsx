import React, { useEffect, useState } from "react";
import { Button, Icon, List } from "semantic-ui-react";
import Item from "./Item";
import itemService from "../services/Items";
import listService from "../services/Lists";
import { useRouteMatch } from "react-router";
import AddItem from "./AddItem";

const Itemlist = () => {
  const [items, setItems] = useState([]);

  const match = useRouteMatch("/lists/:id");
  const id = match.params.id;

  useEffect(async () => {
    try {
      const lists = await listService.getAll();
      const thisList = lists.find((list) => list.id === id);
      if (!thisList) {
        await listService.create({ id: id, items: [] });
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
    const newItems = items.concat(itemToAdd);
    try {
      await itemService.create(id, itemToAdd);
      setItems(newItems);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemove = async (item) => {
    const newItems = items.filter((i) => i.id !== item.id);
    try {
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

  const handleRemoveChecked = () => {
    try {
      items
        .filter((item) => item.checked)
        .map((i) => itemService.remove(id, i.id));
      setItems(items.filter((i) => !i.checked));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleNameClick = async (item) => {
    try {
      console.log(item.id);
      const updatedItem = { ...item, checked: !item.checked };
      await itemService.update(id, item.id, updatedItem);
      setItems(items.map((i) => (i.id === item.id ? updatedItem : i)));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) {
      return null;
    }

    try {
      console.log(item.id);
      const updatedItem = { ...item, quantity: newQuantity };
      await itemService.update(id, item.id, updatedItem);
      setItems(items.map((i) => (i.name === item.name ? updatedItem : i)));
    } catch (error) {
      console.log("error", error);
    }
  };

  // if (items.length === 0) {
  //   return null;
  // }
  return (
    <>
      <AddItem handleSubmit={handleSubmit} />
      <List relaxed celled verticalAlign="middle">
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            handleRemove={handleRemove}
            handleNameClick={handleNameClick}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </List>
      {items.length > 0 && (
        <List>
          <List.Item>
            <List.Content floated="right">
              <Button
                id="delete-checked-button"
                compact
                onClick={handleRemoveChecked}
              >
                <Icon name="check" />
                Delete checked
              </Button>
              <Button compact negative onClick={handleRemoveAll}>
                <Icon name="trash alternate outline" />
                Delete All
              </Button>
            </List.Content>
          </List.Item>
        </List>
      )}
    </>
  );
};

export default Itemlist;
