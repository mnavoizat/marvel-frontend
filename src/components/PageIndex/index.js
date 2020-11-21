import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const PageIndex = ({ data, page, pageName }) => {
  let resultsNumber = data.total;
  page = Number(page);
  const pages = [];
  if (page < 5) {
    for (let i = 1; i <= 6; i++) {
      pages.push(i);
    }
    pages.push("...");
    pages.push(Math.ceil(resultsNumber / 100));
  } else if (page > Math.ceil(resultsNumber / 100) - 4) {
    pages.push(1);
    pages.push("...");
    for (
      let i = Math.ceil(resultsNumber / 100) - 5;
      i <= Math.ceil(resultsNumber / 100);
      i++
    ) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push("...");
    for (let i = page - 2; i <= page + 2; i++) {
      pages.push(i);
    }
    pages.push("...");
    pages.push(Math.ceil(resultsNumber / 100));
  }

  return (
    <div className="page-index">
      <div className="container-index">
        {/* <div className="results">{resultsNumber} resultats trouvés</div> */}

        <Link to={`/${pageName}/${page - 1}`}>
          <FontAwesomeIcon
            icon="caret-left"
            className={`icon ${page <= 1 ? "unvisible" : "visible"}`}
          />
        </Link>
        {pages.map((element, index) => {
          return (
            <Link key={index} to={`/${pageName}/${pages[index]}`}>
              <button
                className={
                  pages[index] === Number(page) ? "current-page" : "other-pages"
                }
              >
                {element}
              </button>
            </Link>
          );
        })}
        <Link to={`/${pageName}/${page + 1}`}>
          <FontAwesomeIcon
            icon="caret-right"
            className={`icon ${
              page < Math.ceil(resultsNumber / 100) ? "visible" : "unvisible"
            }`}
          />
        </Link>
      </div>
    </div>
  );
};

export default PageIndex;
