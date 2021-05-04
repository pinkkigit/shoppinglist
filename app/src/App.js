import React, { useEffect, useState } from "react";
import { Container, Divider, Header, Icon } from "semantic-ui-react";
import FrontPage from "./components/FrontPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import ListPage from "./components/ListPage";
import AuthStorageContext from "./contexts/AuthStorageContext";

const App = () => {
  const [user, setUser] = useState(null);

  const setCurrentUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("shoppingListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setCurrentUser(user);
    }
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem("shoppingListUser");
    setCurrentUser(null);
  };

  return (
    <AuthStorageContext.Provider value={{ user, setCurrentUser }}>
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
                <FrontPage handleLogOut={handleLogOut} />
              </Container>
            </Route>
          </Switch>
        </Router>
      </div>
    </AuthStorageContext.Provider>
  );
};

export default App;
