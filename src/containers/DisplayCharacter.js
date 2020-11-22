import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "js-cookie";
import Footer from "../components/Footer";

const DisplayCharacter = ({ favoriteCharacters, setFavoriteCharacters }) => {
  const { id } = useParams();
  const location = useLocation();
  const { name, description, picture } = location.state;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-backend-mzt.herokuapp.com/character/comics?id=${id}`
      );
      console.log(response.data.data);
      setData(response.data.data.results);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const handleClick = () => {
    if (Cookie.get("favoriteCharacters")?.includes(id)) {
      const newFavList = favoriteCharacters.replace(id, "");
      setFavoriteCharacters(newFavList);
      Cookie.set("favoriteCharacters", newFavList, { expires: 1 });
    } else {
      const newFavList = favoriteCharacters + " " + id;
      setFavoriteCharacters(newFavList);
      Cookie.set("favoriteCharacters", newFavList, { expires: 1 });
    }
  };

  return isLoading ? (
    <div className="loader">
      <Loader type="Puff" color="#F11E22" height={100} width={100} />
    </div>
  ) : (
    <>
      <div className="display-character">
        <div className="display-container1">
          <div className="display-container2">
            <div className="display-col1">
              <img src={picture} alt="" />
            </div>
            <div className="display-col2">
              <div className="display-infos">
                <FontAwesomeIcon
                  icon="star"
                  className={`star ${
                    Cookie.get("favoriteCharacters")?.includes(id) && "star-fav"
                  }`}
                  onClick={handleClick}
                />
                <div>
                  <h2>{name}</h2>
                  <p>{description}</p>
                </div>
                <h2>Appears in the following comics :</h2>
              </div>
              <div className="display-comics">
                {data.map((element, index) => {
                  return (
                    <div key={index} className="comic-element">
                      <div>{element.title}</div>
                      <div>
                        <img
                          src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DisplayCharacter;
