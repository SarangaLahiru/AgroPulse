import React from "react";
import "./BodyContent.css";
import right_arrow from "../components/images/right-arrow.png";
import { useStateContext } from "../context/contextProvider";
import { Link } from "react-router-dom";

function BodyContent() {
  const { setTranslations, translations } = useStateContext();

  return (
    <div className="body-content container items-center" data-aos="fade-up">
      <div className="body-text">
        <h1>{translations.Home_p1}</h1>

        <p>{translations.Home_p2}</p>

        <Link to='/detection'>
        <button className="started btn">
          {translations.Home_b1} <img src={right_arrow} alt=""></img>
        </button>
        </Link>
      </div>
    </div>
  );
}

export default BodyContent;
