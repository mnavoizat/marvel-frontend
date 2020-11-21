import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Cookie from "js-cookie";

import Header from "./components/Header";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import MyFavs from "./containers/Myfavs";
import DisplayCharacter from "./containers/DisplayCharacter";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faTimes,
  faEye,
  faCaretLeft,
  faCaretRight,
  faCaretDown,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSearch,
  faTimes,
  faEye,
  faCaretLeft,
  faCaretRight,
  faCaretDown,
  faStar
);

function App() {
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    Cookie.get("favoriteCharacters") || ""
  );

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/myfavs">
          <MyFavs
            favoriteCharacters={favoriteCharacters}
            setFavoriteCharacters={setFavoriteCharacters}
          />
        </Route>
        <Route path="/comics/:page">
          <Comics />
        </Route>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/display-character/:id">
          <DisplayCharacter
            favoriteCharacters={favoriteCharacters}
            setFavoriteCharacters={setFavoriteCharacters}
          />
        </Route>
        <Route path="/characters/:page">
          <Characters
            favoriteCharacters={favoriteCharacters}
            setFavoriteCharacters={setFavoriteCharacters}
          />
        </Route>
        <Route path="/">
          <Characters
            favoriteCharacters={favoriteCharacters}
            setFavoriteCharacters={setFavoriteCharacters}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
