import React from "react";
import "./BodyContent.css";
import right_arrow from "../assets/right-arrow.png";

function BodyContent() {
  return (
    <div className="body-content container">
      <div className="body-text">
        <h1>Welcome to Our Website!</h1>

        <p>
          In the realm of agriculture, the menace of pest infestations looms
          large, presenting a formidable challenge to crop yields and quality. The
          identification and effective management of these pests stand as pivotal
          pillars for ensuring sustainable agricultural practices and safeguarding
          global food security. In response to this pressing need, our project
          endeavors to pioneer an innovative solution leveraging the power of
          modern technology.
        </p>

        <button className="btn">
          Get Started <img src={right_arrow} alt=""></img>
        </button>
      </div>
    </div>
  );
}

export default BodyContent;
