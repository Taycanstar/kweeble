import React from "react";
import "../../styles/terms.css";
import blogo from "../../images/logo3.jpg";

const HelpCenter = () => {
  return (
    <div className="priv-main">
      <div className="hc-title">
        <img src={blogo} alt="black kweeble" />
        <h1>Help Center</h1>
      </div>
      <div className="priv-main-par">
        <div className="wahetevr">
          <p className="wht">kk</p>
        </div>
        <h5>Contact us</h5>
        <p>
          <strong>Email us: </strong>
          support@kweeble.com
        </p>

        </div>
    </div>
  );
};

export default HelpCenter;
