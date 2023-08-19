import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "./sitescreen.css";
import axios from "axios";
import Rating from "../Rating/Rating";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Row, Col, Image, Card, Button, Form } from "react-bootstrap";
import { RecoveryContext } from "../../App";
import { VscLocation } from "react-icons/vsc";
import { AiFillDelete } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import RatingInput from "../Rating/RatingInput";
import { BsFillCameraFill } from "react-icons/bs";
import MakeFav from "../Favorites/MakeFav";

const SiteScreen = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [userPFP, setUserPFP] = useState("pfp.svg");

  const [posts, setPosts] = useState([]);
  const fetchUserData = () => {
    fetch(`https://ahlbackendd.onrender.com/api/posts/getImgs/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);

        console.log(data);
      });
  };
  const {
    setEmail,
    email,
    setOTP,
    recov,
    setrecov,
    admin,
    userdata,
    setUserdata,
    setSiteIdR,
    siteIdR,
    dateRated,
    setDateRated,
    hasRated,
    setHasRated,
    valueRated,
    setValueRated,
  } = useContext(RecoveryContext);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("data"));
    console.log(user);
    if (user) {
      setUserdata(user);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [id]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `https://ahlbackendd.onrender.com/api/posts/site/${id}`
      );
      const data = response.data;

      if (data) {
        setPost(data.data);
      } else {
        response.send("NoProduct");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [id]);

  console.log(post.name);
  const [comments, setComments] = useState([]);
  const [file, setFile] = useState(null);

  const [comment, setComment] = useState("");
  // hardcoded for simplicity, this should be dynamic based on the user
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const addComment = async () => {
    //  if(!isloggedin){
    //   navigate('/signup')
    //  }else{
    const imgUrl = await upload();

    await axios.post("http://localhost:8800/site/addcomment", {
      text: comment,
      commentmedia: file ? imgUrl : "Null",
      postedBy: userdata.username,
      user_id: userdata.user_id,
      site_id: post.site_id,
    });
    setComment("");
    setFile(null);
    window.location.reload();
  };
  // };
  useEffect(() => {
    fetchComments(post.site_id);
    if (userdata) {
      setUserId(userdata.user_id);
    } // Pass the siteId to the fetchComments function
  }, [post.site_id]); // Depend on siteId, so that when it changes, fetchComments is called
  setSiteIdR(post.site_id);

  const fetchComments = async (siteId) => {
    const response = await axios.get(
      `http://localhost:8800/site/comments/${post.site_id}`
    );
    setComments(response.data);
  };

  const deleteUserComment = async (comment_id) => {
    try {
      const response = await axios
        .post("http://localhost:8800/api/comments/user/delete", {
          userId: userdata.user_id,
          siteId: siteIdR,
          comment_id: comment_id,
        })
        .then((resp) => {
          console.log(resp);
          // Filter out the deleted comment
          setComments(comments.filter((comment) => comment.id !== comment_id));
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log("Error", e);
    }
  };

  const deleteAdminComment = async (comment_id) => {
    try {
      const response = await axios
        .post("https://ahlbackendd.onrender.com/api/comments/admin/delete", {
          siteId: siteIdR,
          comment_id: comment_id,
        })
        .then((resp) => {
          console.log(resp);
          // Filter out the deleted comment
          setComments(comments.filter((comment) => comment.id !== comment_id));
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div className="site-screen-content">
      <div className="site-screen-post">
        <div className="site-screen-image">
          <Carousel
            className="site-details-images-carousel"
            responsive={responsive}
          >
            {posts.map((r) => {
              return <img src={`../upload/${r.img}`} alt="" fluid />;
            })}
          </Carousel>
        </div>

        <div className="site-screen-info1">
          <div className="site-details1">
            <div className="site-details-top">
              <h4>{post.name}</h4>
              <div className="site-details-rating">
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
              </div>
            </div>
            <div className="site-details-hr"></div>
            <div className="site-details-cat-fees">
              <div className="site-details-category">
                <span>
                  {post.cat} <small>+1</small>
                </span>
              </div>
              <div className="site-details-fees">
                <h5>Average Fees: {post.fees}$</h5>
              </div>
            </div>
            <div className="site-details-hr"></div>
            <div className="site-details-location">
              <Link className="btn site-details-btn" to={post.location}>
                Visit Location
                <VscLocation className="icon" />
              </Link>
              <MakeFav className="details-fav-icon" />
            </div>
            <div className="site-details-description">
              <h5>Desciption: </h5> {getText(post.description)}
            </div>
          </div>
        </div>
      </div>
      <div className="comments-section">
        <div className="comments-container">
          <div className="comments-section-title">
            <span>Comments Section</span>
            <span>Scroll</span>
          </div>
          <div className="scrolling-through-comments">
            {comments.map((comment) => (
              <div className="all-comments" key={comment.id}>
                <div className="a-comment">
                  <div className="comment-pfp">
                    {comment.profile_picture !== null ? (
                      <Image
                        src={`../upload/${comment.profile_picture}`}
                        className="comment-user-pfppppp"
                        roundedCircle
                      />
                    ) : (
                      <Image
                        src={`../upload/${userPFP}`}
                        className="comment-user-pfppppp"
                        roundedCircle
                      />
                    )}
                  </div>

                  <div className="comment-info">
                    <div className="comment-user-date">
                      <strong className="comment-username">
                        {comment.postedBy}
                      </strong>{" "}
                      Posted on: {new Date(comment.createdAt).toLocaleString()}
                    </div>
                    <div className="comment-textmedia-and-button">
                      <div className="comment-text-and-media">
                        <div className="comment-text-white">{comment.text}</div>
                        {comment.commentmedia !== "Null" && (
                          <img
                            src={`../upload/${comment.commentmedia}`}
                            alt="Comment image"
                            className="comment-media-image"
                          />
                        )}
                      </div>
                      <div className="delete-comment-button">
                        {(admin || userId === comment.user_id) && (
                          <AiFillDelete
                            className="trash-comment-icon"
                            onClick={() => {
                              if (admin) {
                                deleteAdminComment(comment.id);
                              } else {
                                deleteUserComment(comment.id);
                              }
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="add-comment-div">
            {isLoggedIn ? (
              <Form>
                <Form.Group className="add-comment-group">
                  <div className="comment-and-post">
                    <Form.Control
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter comment"
                      className="add-comment-input"
                    />
                    <span>
                      <FaCommentDots
                        className="post-comment-icon"
                        onClick={addComment}
                      />
                    </span>
                  </div>
                  <Form.Group className="add-image-in-comment">
                    <BsFillCameraFill className="camera-comment" />
                    <Form.Control
                      type="file"
                      className="adding-media-to-comment"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>
                </Form.Group>
              </Form>
            ) : (
              <p className="message-if-not-logged">
                Please log in to add a comment.
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="details-rating-div">
          {hasRated ? (
            <h6 className="details-rating-text">
              You rated us
              <Rating value={valueRated} color="#0066ff" /> on {dateRated}
            </h6>
          ) : (
            <RatingInput color="#0066ff" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteScreen;
