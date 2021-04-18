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
        await listService.create({ id: id });
      }

      const allItems = await itemService.getAll(id);
      if (allItems.items) {
        setItems(allItems.items);
      }
    } catch (error) {
      console.log("error loading items", error);
    }
  }, []);

  const handleSubmit = async (itemToAdd) => {
    const newItems = items.concat(itemToAdd);
    try {
      await itemService.update(id, newItems);
      setItems(newItems);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemove = async (item) => {
    const newItems = items.filter((i) => i.id !== item.id);
    try {
      await itemService.update(id, newItems);
      setItems(newItems);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveAll = async () => {
    try {
      await itemService.update(id, []);
      setItems([]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveChecked = () => {
    setItems(items.filter((i) => !i.checked));
  };

  const handleNameClick = (item) => {
    const updatedItem = { ...item, checked: !item.checked };
    setItems(items.map((i) => (i.name === item.name ? updatedItem : i)));
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      return null;
    }
    const updatedItem = { ...item, quantity: newQuantity };
    setItems(items.map((i) => (i.name === item.name ? updatedItem : i)));
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
