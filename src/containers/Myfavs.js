import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Character from "../components/Character";

const Myfavs = ({ favoriteCharacters, setFavoriteCharacters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Cookie.get("favoriteCharacters")) {
      const listeFav = Cookie.get("favoriteCharacters").split(" ");
      console.log(listeFav);
      const results = [];

      const fetchData = async () => {
        for (let i = 0; i < listeFav.length; i++) {
          if (listeFav[i]) {
            const response = await axios.get(
              `https://marvel-backend-mzt.herokuapp.com/character?id=${listeFav[i]}`
            );
            console.log(response.data);
            results.push(response.data.data.results[0]);
          }
        }
        console.log(results);
        setData({ results });
        setIsLoading(false);
      };
      fetchData();
    }
  }, []);

  return isLoading ? (
    <div className="loader">
      <Loader type="Puff" color="#F11E22" height={100} width={100} />
    </div>
  ) : (
    <div className="characters">
      {data.results.length > 0 ? (
        <div className="container-characters">
          {data.results.map((element, index) => {
            return (
              <Character
                key={index}
                data={element}
                favoriteCharacters={favoriteCharacters}
                setFavoriteCharacters={setFavoriteCharacters}
              />
              //)
            );
          })}
        </div>
      ) : (
        <div className="no-fav">Vous n'avez aucun favori</div>
      )}
    </div>
  );
};

export default Myfavs;
