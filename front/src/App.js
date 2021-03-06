import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("getUser");
    fetch("/getUser", { credentials: "include" })
      .then((res) => res.json())
      .then((user) => {
        console.log("getUser", user);
        setUser(user);
      });
  }, []);

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/">
          <Home user={user} setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
