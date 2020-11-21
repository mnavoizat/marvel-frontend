import React from "react";
import "./index.css";

const Comic = ({ data }) => {
  return (
    <div className="comic">
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
