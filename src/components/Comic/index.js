import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "js-cookie";

const Comic = ({ data, favoriteComics, setFavoriteComics }) => {
  const handleClick = () => {
    if (Cookie.get("favoriteComics")?.includes(data.id)) {
      const newFavList = favoriteComics.replace(data.id, "");
      setFavoriteComics(newFavList);
      Cookie.set("favoriteComics", newFavList, { expires: 1 });
    } else {
      const newFavList = favoriteComics + " " + data.id;
      setFavoriteComics(newFavList);
      Cookie.set("favoriteComics", newFavList, { expires: 1 });
    }
  };
  return (
    <div className="comic">
      <FontAwesomeIcon
        icon="star"
        className={`star ${
          Cookie.get("favoriteComics")?.includes(data.id) && "star-fav"
        }`}
        onClick={handleClick}
      />
      <div className="picture-comic">
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt=""
        />
      </div>
      <div className="title-comic">
        <div>{data.title}</div>
      </div>
    </div>
  );
};

export default Comic;
