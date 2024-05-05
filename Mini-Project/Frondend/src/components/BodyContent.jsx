import React from "react";
import "./BodyContent.css";
import right_arrow from "../assets/right-arrow.png";
import { useStateContext } from "../context/contextProvider";

function BodyContent() {
  const { setTranslations, translations } = useStateContext();
  return (
    <div className="body-content container" data-aos="fade-up-left">
      <div className="body-text">
        <h1>{translations.Home_p1}</h1>

        <p>
          {translations.Home_p2}
        </p>

        <button className="btn">
          {translations.Home_b1} <img src={right_arrow} alt=""></img>
        </button>
      </div>
    </div>
  );
}

export default BodyContent;
