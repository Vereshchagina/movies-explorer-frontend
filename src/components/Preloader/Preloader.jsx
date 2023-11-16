import React from "react";
import "./Preloader.css";

const Preloader = (isLoading) => {
  return (
    <div className={`preloader ${isLoading ? "preloader_visible" : ""}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
