import React from "react";
import "./ParallaxContent.css";
import { Parallax } from "react-parallax";
import imageOne from "/images/Good-Agricultural-Practices-Training-in-Kenya.jpg";
import imageSecond from "/images/hgic_food gardening_colorado-potato-beetle-582966_1920.jpg";
import imageThrid from "/images/shutterstock_1450482422.jpg";

function ParallaxContent() {
  return (
    <div className="app">
      <Parallax strength={600} bgImage={imageOne} className="images">
        <div className="hero container">
          <div className="hero-text">
            <h2>We are dedicated </h2>
            <p>
              to empowering farmers with innovative pest management solutions.
            </p>
          </div>
        </div>
      </Parallax>
      <div className="right-text">
        <Parallax strength={300} bgImage={imageSecond} className="images">
          <div className="hero container">
            <div className="hero-text move">
              <h2>Discover </h2>
              <p>
                expert insights, practical tools, and product recommendations to
                protect your crops and maximize yields sustainably.
              </p>
            </div>
          </div>
        </Parallax>

        <Parallax strength={600} bgImage={imageThrid} className="images">
          <div className="hero container">
            <div className="hero-text moves">
              <h2>Join our community </h2>
              <p>and unlock the power of innovation in agriculture.</p>
            </div>
          </div>
        </Parallax>
      </div>
    </div>
  );
}

export default ParallaxContent;
