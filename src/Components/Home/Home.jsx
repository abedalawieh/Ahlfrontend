import React, { useEffect, useState } from "react";

//importing styles
import "./home.css";

//importing react-router
import { Link } from "react-router-dom";

//importing components
import Banner from "../Banner/Banner";
import About from "../About/About";

//importing assets
import backgroundVidHome from "../../Assets/backgroundVidHome.mp4";

//importing used icons
import { ImSearch } from "react-icons/im";
import { AiOutlineFolderView } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";

//importing the aos library
import Aos from "aos";
import "aos/dist/aos.css";

function Home() {
  //creating a scroll animation
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  //creating the price constant
  const [priceChosen, setPriceChosen] = useState(48);

  return (
    <section>
      <section>
        <Banner />
      </section>

      <section>
        <About />
      </section>

      <section className="home">
        <div className="overlay"></div>
        <video
          src={backgroundVidHome}
          muted
          autoPlay
          loop
          type="video/mp4"
        ></video>

        <div className="homeContent container">
          <div className="textDiv">
            <span data-aos="fade-up" className="smallText">
              Welcome
            </span>
            <h1 data-aos="fade-up" className="homeTitle">
              Search Your Entertainment Site In the View All Page
            </h1>
          </div>

          <div data-aos="fade-up" className="cardDiv grid">
            <div className="destinationInput">
              <label htmlFor="city">
                Search your destination in the view all page
              </label>
              <div className="input flex">
                <input type="text" placeholder="Check the view all page" />
                <ImSearch className="icon-search" />
              </div>
            </div>

            <div className="priceInput">
              <div className="label_total flex">
                <label htmlFor="price">Price range:</label>
                <h3 className="total">{priceChosen}$</h3>
              </div>
              <div className="input flex">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  onChange={(e) => {
                    setPriceChosen(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="searchOptions flex">
              {" "}
              <Link className="link-to-all" to="/sites">
                <AiOutlineFolderView className="view-all-icon" />
                <span>VIEW ALL</span>
              </Link>
            </div>
          </div>

          <div data-aos="fade-up" className="homeFooterIcons flex">
            <div className="rightIcons">
              <a href="https://www.facebook.com">
                <FiFacebook className="icon" />
              </a>
              <a href="https://www.instagram.com">
                <AiOutlineInstagram className="icon" />
              </a>
            </div>

            <div className="leftIcons">
              <BsListTask className="icon" />
              <TbApps className="icon" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;
