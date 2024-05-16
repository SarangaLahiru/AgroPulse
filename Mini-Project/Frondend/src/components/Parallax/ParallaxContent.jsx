import React from "react";
import { Parallax } from "react-parallax";
import { useStateContext } from "../../context/contextProvider";
import "./ParallaxContent.css";
import imageOne from "../images/pexels-ryerey1987-5136449.jpg";
import imageSecond from "../images/pexels-dr-vivasayam-youtube-channel-21436606-13740688.jpg";
import imageThrid from "/images/shutterstock_1450482422.jpg";
import Aos from "aos";

function ParallaxContent() {
  const { setTranslations, translations } = useStateContext();
  return (
    <div className="app">
      <Parallax strength={600} bgImage={imageOne} className="images">
        <div className="hero container" data-aos="fade-right">
          <div className="hero-text" >
            <h2>{translations.Home_p3}</h2>
            <p>
              {translations.Home_p4}
            </p>
          </div>
        </div>
      </Parallax>
      <div className="right-text">
        <Parallax strength={300} bgImage={imageSecond} className="images">
          <div className="hero container" data-aos="fade-left">
            <div className="hero-text move">
              <h2>{translations.Home_p5} </h2>
              <p>
                {translations.Home_p6}

              </p>
            </div>
          </div>
        </Parallax>

        <Parallax strength={600} bgImage={imageThrid} className="images">
          <div className="hero container" data-aos="fade-right">
            <div className="hero-text moves">
              <h2>{translations.Home_p7} </h2>
              <p>{translations.Home_p8}</p>
            </div>
          </div>
        </Parallax>
      </div>
    </div>
  );
}

export default ParallaxContent;
