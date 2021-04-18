import React, { useState } from "react";
import { Container, Divider, Header } from "semantic-ui-react";
import AddItem from "./components/AddItem";
import FrontPage from "./components/FrontPage";
import Itemlist from "./components/Itemlist";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import itemService from "./services/Items";

const App = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <div className="app-background">
      <Router>
        <Switch>
          <Route path="/lists/:id">
            <Container className="main-container" textAlign="center">
              <Header as="h1" id="header">
                Shopping list
              </Header>
              <Divider />
              <Itemlist />
            </Container>
          </Route>
          <Route path="/signup">
            <div className="frontpage-top" />
            <Container className="frontpage" textAlign="center" text>
              <SignUpForm />
            </Container>
          </Route>
          <Route path="/login">
            <div className="frontpage-top" />
            <Container className="frontpage" textAlign="center" text>
              <LoginForm />
            </Container>
          </Route>
          <Route path="/">
            <div className="frontpage-top" />
            <Container className="frontpage" textAlign="center" text>
              <FrontPage />
            </Container>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
