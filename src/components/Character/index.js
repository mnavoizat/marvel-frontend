import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "js-cookie";

const Character = ({ data, favoriteCharacters, setFavoriteCharacters }) => {
  const handleClick = () => {
    if (Cookie.get("favoriteCharacters")?.includes(data.id)) {
      const newFavList = favoriteCharacters.replace(data.id, "");
      setFavoriteCharacters(newFavList);
      Cookie.set("favoriteCharacters", newFavList, { expires: 1 });
    } else {
      const newFavList = favoriteCharacters + " " + data.id;
      setFavoriteCharacters(newFavList);
      Cookie.set("favoriteCharacters", newFavList, { expires: 1 });
    }
  };
  return (
    <div className="character">
      <FontAwesomeIcon
        icon="star"
        className={`star ${
          Cookie.get("favoriteCharacters")?.includes(data.id) && "star-fav"
        }`}
        onClick={handleClick}
      />
      <Link
        to={{
          pathname: `/display-character/${data.id}`,
          state: {
            name: data.name,
            description: data.description,
            picture: `${data.thumbnail.path}.${data.thumbnail.extension}`,
          },
        }}
      >
        <div className="picture-character">
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt=""
          />
        </div>
        <div className="name-character">
          <div>{data.name}</div>
        </div>
      </Link>
    </div>
  );
};

export default Character;
