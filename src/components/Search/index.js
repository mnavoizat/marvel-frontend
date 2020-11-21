import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ setSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(searchValue);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search-form">
        <button type="submit" className="search-button">
          <FontAwesomeIcon icon="search" /> <span>Go !</span>
        </button>
        <input
          type="text"
          placeholder="Looking for something ?"
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          value={searchValue}
        />
      </form>
    </div>
  );
};

export default Search;
