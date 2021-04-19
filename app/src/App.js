import React, { useState } from "react";
import { Container, Divider, Header, Icon } from "semantic-ui-react";
import AddItem from "./components/AddItem";
import FrontPage from "./components/FrontPage";
import Itemlist from "./components/Itemlist";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import itemService from "./services/Items";
import ListPage from "./components/ListPage";

const App = () => {
  return (
    <div className="app-background">
      <Router>
        <Switch>
          <Route path="/lists/:id">
            <Container className="main-container" textAlign="center">
              <ListPage />
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
