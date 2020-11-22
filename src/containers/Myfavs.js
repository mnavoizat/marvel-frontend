import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Character from "../components/Character";
import Comic from "../components/Comic";
import Footer from "../components/Footer";

const Myfavs = ({
  favoriteCharacters,
  setFavoriteCharacters,
  favoriteComics,
  setFavoriteComics,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCharacters, setDataCharacters] = useState([]);
  const [dataComics, setDataComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (Cookie.get("favoriteCharacters")) {
        const listeFav = Cookie.get("favoriteCharacters").split(" ");
        console.log(listeFav);
        const results = [];
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
        setDataCharacters({ results });
      }
      if (Cookie.get("favoriteComics")) {
        const listeFav = Cookie.get("favoriteComics").split(" ");
        console.log(listeFav);
        const results = [];
        for (let i = 0; i < listeFav.length; i++) {
          if (listeFav[i]) {
            const response = await axios.get(
              `https://marvel-backend-mzt.herokuapp.com/comic?id=${listeFav[i]}`
            );
            console.log(response.data);
            results.push(response.data.data.results[0]);
          }
        }
        console.log(results);
        setDataComics({ results });
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loader">
      <Loader type="Puff" color="#F11E22" height={100} width={100} />
    </div>
  ) : (
    <>
      <div className="characters-block">
        <div>
          <div>Favorite characters :</div>
        </div>
        <div className="characters">
          {dataCharacters?.results.length > 0 ? (
            <div className="container-characters">
              {dataCharacters.results.map((element, index) => {
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
            <div className="no-fav">You don't have any favorite character</div>
          )}
        </div>
        <div className="comics-block">
          <div>
            <div>Favorite comics :</div>
          </div>
          <div>
            {dataComics.results?.length > 0 ? (
              <div className="container-comics">
                {dataComics.results.map((element, index) => {
                  return (
                    <Comic
                      key={index}
                      data={element}
                      favoriteComics={favoriteComics}
                      setFavoriteComics={setFavoriteComics}
                    />
                    //)
                  );
                })}
              </div>
            ) : (
              <div className="no-fav">You don't have any favorite comics</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Myfavs;
