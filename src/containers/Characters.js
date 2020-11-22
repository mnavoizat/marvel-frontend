import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useParams } from "react-router-dom";

import Character from "../components/Character";
import PageIndex from "../components/PageIndex";
import Search from "../components/Search";
import Footer from "../components/Footer";

const Characters = ({ favoriteCharacters, setFavoriteCharacters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [searchCharacter, setSearchCharacter] = useState("");
  //const regex = new RegExp(searchCharacter, "ig");

  let { page } = useParams();
  if (!page) {
    page = 1;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-backend-mzt.herokuapp.com/characters?offset=${
          100 * (page - 1)
        }&search=${searchCharacter}`
      );
      console.log(response.data);
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page, searchCharacter]);

  return isLoading ? (
    <div className="loader">
      <Loader type="Puff" color="#F11E22" height={100} width={100} />
    </div>
  ) : (
    <>
      <div className="characters">
        <Search setSearch={setSearchCharacter} />
        <div className="container-characters">
          {data.results.map((element, index) => {
            return (
              //element.name.match(regex) && (
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
        {!searchCharacter && (
          <>
            <PageIndex data={data} page={page} pageName="characters" />
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Characters;
