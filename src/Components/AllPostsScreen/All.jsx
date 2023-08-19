import React, { useEffect, useState, useContext } from "react";
import Rating from "../Rating/Rating";

//importing styles
import "./All.css";

//importing icons
import { ImLocation } from "react-icons/im";
import { BsClipboardPlus } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";

//importing aos library
import Aos from "aos";
import "aos/dist/aos.css";
import { Link, useParams } from "react-router-dom";
import { RecoveryContext } from "../../App";
import MakeFav from "../Favorites/MakeFav";

const All = () => {
  //favorite
  const [isFavorite, setIsFavorite] = useState(false);
  const setAsFavorite = () => {
    if (!isFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  //new
  const [cat, setCat] = useState([]);
  const [sort, setSortOrder] = useState("None");

  const {
    messageLogin,
    setmessageLogin,
    admin,
    siteproviderOrAdmin,
    recov,
    setrecov,
    messageAuth,
    messageAdmin,
    keyword,
    setKeyword,
  } = useContext(RecoveryContext);

  // const { keyword } = useParams();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [posts, setPosts] = useState([]);

  // const fetchUserData = () => {
  //   fetch("http://localhost:8800/api/posts/site")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setPosts(data);
  //       console.log(data);
  //     });
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);
  const fetchUserData = () => {
    fetch(`https://ahlbackendd.onrender.com/api/posts/site?sort=${sort}&category=${cat}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data.data);
        console.log(data.data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [sort, cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return keyword ? (
    <section className="all-main container section">
      <div className="secContent">
        {posts
          .filter((post) =>
            post.name.toLowerCase().includes(keyword.toLowerCase())
          )
          .map((post) => {
            if (post.status == 1) {
              return (
                <div
                  data-aos="fade-up"
                  className="singleDestination"
                  key={post.site_ID}
                >
                  <div className="imgDiv">
                    <img src={`../upload/${post.img}`} alt={post.tile} />
                  </div>

                  <div className="cardInfo">
                    <h4 className="destTitle">{post.name}</h4>
                    <span className="continent flex">
                      <a href={post.location}>
                        <ImLocation className="icon" />
                      </a>
                      <span className="name">Location</span>
                    </span>
                    <Rating
                      value={post.rating}
                      text={
                        post.nb_rates === 0
                          ? "no reviews"
                          : post.nb_rates === 1
                          ? "1 review"
                          : post.nb_rates + " reviews"
                      }
                      color="#0066ff"
                    />

                    <div className="fees flex">
                      <div className="category">
                        <span>
                          {post.cat} <small>+1</small>
                        </span>
                      </div>
                      <div className="price">
                        <h5>Avg Fees: {post.fees}$</h5>
                      </div>
                    </div>

                    <div className="desc">
                      <p>
                        {getText(post.description.substring(0, 100) + "...")}
                      </p>
                    </div>

                    <div className="functionalities">
                      <button className="btn flex">
                        {console.log(post.site_id)}
                        <Link to={`/site/${post.site_id}`}>
                          DETAILS <BsClipboardPlus className="icon" />
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </section>
  ) : (
    <section className="all-main container section">
      {/* <div className="filter-div">
        <span>Filter By:</span>
        <div>
          <button className="btn h-to-l">
            By Highest price <BsGraphUpArrow className="icon" />{" "}
          </button>
        </div>
        <div>
          <button className="btn l-to-h">
            By Lowest price <BsGraphDownArrow className="icon" />{" "}
          </button>
        </div>
        <div>
          <button className="btn l-to-h">
            By category <BsGraphDownArrow className="icon" />{" "}
          </button>
        </div>
      </div> */}
      <div className="filter-div">
        <span>Filter By:</span>

        <select
          className="btn l-to-h"
          value={sort}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Fees</option>
          <option value="LowestToHighest">Lowest to Highest</option>
          <option value="HighestToLowest">Highest to Lowest</option>
        </select>

        <select
          className="btn l-to-h"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="">Category</option>

          <option value="Resort">Resort</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Night Life">Night Life</option>
          <option value="Sports Activities">Sports Activities</option>

          <option value="Kids Activities">Kids Activities</option>
        </select>
      </div>
      <div className="secContent grid">
        {posts.map((posts) => {
          if (posts.status == 1) {
            return (
              <div
                // data-aos="fade-up"
                className="singleDestination"
                key={posts.site_ID}
              >
                <div className="imgDiv">
                  <img src={`../upload/${posts.img}`} alt={posts.tile} />
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
      </div>
    </section>
  );
};

export default All;
