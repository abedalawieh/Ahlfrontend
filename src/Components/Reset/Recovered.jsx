import React from "react";

//importing assets
import recovered from "../../Assets/recovered.svg";

//importing styles
import "./recovered.css";

export default function Recovered() {
  return (
    <div>
      <section className="recovered-section">
        <div className="recovered-items-container">
          <div className="recovered-image-container">
            <img
              src={recovered}
              className="recovered-image"
              alt="recovery image"
            />
          </div>
          <div className="recovered-texts-container">
            <div className="recovered-success-msg">
              <h1>Password succesfully reset </h1>
            </div>

            <div class="recovered-welcome-msg">
              <h2>
                Welcome Back, Please navigate to the register page to login{" "}
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
