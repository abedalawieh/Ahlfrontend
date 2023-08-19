import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//importing components
import Rating from "../Rating/Rating";

//importing styles
import "./main.css";

//importing icons
import { ImLocation } from "react-icons/im";
import { BsClipboardPlus } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";

//importing aos library
import Aos from "aos";
import "aos/dist/aos.css";

//importing slider library
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MakeFav from "../Favorites/MakeFav";

function Main() {
  //creating a scroll animation
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  //favorite
  const [isFavorite, setIsFavorite] = useState(false);
  const setAsFavorite = () => {
    if (!isFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };
  //responsive grid
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  //reading the posts from db
  const [posts, setPosts] = useState([]);
  const fetchUserData = () => {
    fetch("https://ahlbackendd.onrender.com/api/posts/site")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data.data);
        console.log(data);
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <section className="guest-main container section">
      <div className="secTitle">
        <h3 data-aos="fade-left" className="title">
          Most Viewed/Highest rated Destinations
        </h3>
      </div>

      <div className="secContent grid width">
        <Carousel responsive={responsive}>
          {posts.map((posts) => {
            if (posts.status == 1) {
              return (
                <div
                  data-aos="fade-up"
                  className="singleDestination"
                  key={posts.site_id}
                >
                  <div className="imgDiv">
                    <img src={`../upload/${posts.img}`} alt={posts.title} />
                  </div>

                  <div className="cardInfo">
                    <h4 className="destTitle">{posts.name}</h4>
                    <span className="continent flex">
                      <a href={posts.location}>
                        <ImLocation className="icon" />
                      </a>
                      <span className="name">Location</span>
                    </span>

                    <Rating
                      value={posts.rating}
                      text={
                        posts.nb_rates === 0
                          ? "no reviews"
                          : posts.nb_rates === 1
                          ? "1 review"
                          : posts.nb_rates + " reviews"
                      }
                      color="#0066ff"
                    />

                    <div className="fees flex">
                      <div className="category">
                        <span>
                          {posts.cat} <small>+1</small>
                        </span>
                      </div>
                      <div className="price">
                        <h5>Avg Fees: {posts.fees}$</h5>
                      </div>
                    </div>

                    <div className="desc">
                      <p>
                        {getText(posts.description.substring(0, 100) + "...")}
                      </p>
                    </div>

                    <div className="functionalities">
                      <button className="btn flex">
                        <Link to={`/site/${posts.site_id}`}>
                          DETAILS <BsClipboardPlus className="icon" />
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </Carousel>
      </div>
    </section>
  );
}

export default Main;
