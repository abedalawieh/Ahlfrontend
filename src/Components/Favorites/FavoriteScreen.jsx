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
import axios from "axios";
//importing aos library
import Aos from "aos";
import "aos/dist/aos.css";
import { Link, useParams } from "react-router-dom";
import { RecoveryContext } from "../../App";
import MakeFav from "./MakeFav";

const FavoriteScreen = () => {
  //favorite
  const [isFavorite, setIsFavorite] = useState(false);
  const setAsFavorite = () => {
    if (!isFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

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
  const [userId, setUserId] = useState();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("data"));
    console.log(user);
    if (user) {
      setUserId(user.user_id);
    }
  }, []);

  const favoritePosts = async () => {
    try {
      await axios
        .post("https://ahlbackendd.onrender.com/api/posts/user/favorite", {
          userId: userId,
        })
        .then((response) => {
          const data = response.data;
          setPosts(data);
          console.log(data);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    favoritePosts();
  }, [userId]);
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
                    text={post.nb_rates + " reviews"}
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
                    <p>{getText(post.description.substring(0, 100) + "...")}</p>
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
          })}
      </div>
    </section>
  ) : (
    <section className="all-main container section">
      <div className="secTitle">
        <h3 data-aos="fade-left" className="title">
          My Favorites
        </h3>
      </div>
      <div className="secContent grid">
        {posts.map((posts) => {
          return (
            <div
              data-aos="fade-up"
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
                  text={posts.nb_rates + " reviews"}
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
                  <p>{getText(posts.description.substring(0, 100) + "...")}</p>
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
        })}
      </div>
    </section>
  );
};

export default FavoriteScreen;
