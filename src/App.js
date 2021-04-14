import React, { useState } from "react";
import { Container, Divider, Header } from "semantic-ui-react";
import AddItem from "./components/AddItem";
import Itemlist from "./components/Itemlist";
import "./index.css";

const App = () => {
  const [items, setItems] = useState([]);

  const handleSubmit = (itemToAdd) => {
    setItems(items.concat(itemToAdd));
  };

  const handleRemove = (item) => {
    setItems(items.filter((i) => i.name !== item.name));
  };

  const handleRemoveAll = () => {
    setItems([]);
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

  return (
    <div className="app-background">
      <Container className="main-container" textAlign="center">
        <Header as="h1" id="header">
          Shopping list
        </Header>
        <Divider />
        <AddItem handleSubmit={handleSubmit} />
        <Itemlist
          items={items}
          handleRemove={handleRemove}
          handleNameClick={handleNameClick}
          handleQuantityChange={handleQuantityChange}
          handleRemoveAll={handleRemoveAll}
          handleRemoveChecked={handleRemoveChecked}
        />
      </Container>
    </div>
  );
};

export default App;
