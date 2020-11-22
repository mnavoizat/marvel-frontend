import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useParams } from "react-router-dom";

import Comic from "../components/Comic";
import PageIndex from "../components/PageIndex";
import Search from "../components/Search";

const Comics = ({ favoriteComics, setFavoriteComics }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [searchComic, setSearchComic] = useState("");

  let { page } = useParams();
  if (!page) {
    page = 1;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-backend-mzt.herokuapp.com/comics?offset=${
          100 * (page - 1)
        }&search=${searchComic}`
      );
      console.log(response.data);
      const results = response.data.data.results;
      results.sort((a, b) => (a.title > b.title ? 1 : -1));
      setData({ results, total: response.data.data.total });
      setIsLoading(false);
    };
    fetchData();
  }, [page, searchComic]);

  return isLoading ? (
    <div className="loader">
      <Loader type="Puff" color="#F11E22" height={100} width={100} />
    </div>
  ) : (
    <div className="comics">
      <Search setSearch={setSearchComic} />
      <div className="container-comics">
        {data.results.map((element, index) => {
          return (
            <Comic
              key={index}
              data={element}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
            />
          );
        })}
      </div>
      {!searchComic && <PageIndex data={data} page={page} pageName="comics" />}
    </div>
  );
};

export default Comics;
