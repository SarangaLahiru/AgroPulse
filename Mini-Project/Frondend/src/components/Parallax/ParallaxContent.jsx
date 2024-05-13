import React from "react";
import { Parallax } from "react-parallax";
import { useStateContext } from "../../context/contextProvider";
import "./ParallaxContent.css";
import imageOne from "/images/Good-Agricultural-Practices-Training-in-Kenya.jpg";
import imageSecond from "/images/hgic_food gardening_colorado-potato-beetle-582966_1920.jpg";
import imageThrid from "/images/shutterstock_1450482422.jpg";

function ParallaxContent() {
  const { setTranslations, translations } = useStateContext();
  return (
    <div className="app" data-aos="fade-right">
      <Parallax strength={600} bgImage={imageOne} className="images">
        <div className="hero container">
          <div className="hero-text">
            <h2>{translations.Home_p3}</h2>
            <p>
              {translations.Home_p4}
            </p>
          </div>
        </div>
      </Parallax>
      <div className="right-text" data-aos="fade-left">
        <Parallax strength={300} bgImage={imageSecond} className="images">
          <div className="hero container">
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
