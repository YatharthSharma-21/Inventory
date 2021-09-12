import React from "react";
import { useHistory } from "react-router";

import "./NotFound.css";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="notFound">
      <div className="box">
        <h1>404</h1>
        <h2>Not Found</h2>
        <button onClick={() => history.push("/")}>
          <span className="lnr lnr-arrow-left"></span> Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
