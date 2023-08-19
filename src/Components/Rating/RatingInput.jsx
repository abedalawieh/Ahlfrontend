import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { RecoveryContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./ratinginput.css";

const Rating = ({ text, color }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  // const [hasRated, setHasRated] = useState(false);
  const {
    userdata,
    setSiteIdR,
    siteIdR,
    dateRated,
    setDateRated,
    hasRated,
    setHasRated,
    valueRated,
    setValueRated,
  } = useContext(RecoveryContext);
  const [isloggedinn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleRating = (value) => {
    if (!isloggedinn) {
      navigate("/signup");
    } else setRating(value);
    submitRating(value);
    updatenbrates();
  };

  axios.defaults.withCredentials = true;

  const checkRated = async () => {
    await axios
      .post("https://ahlbackendd.onrender.com/api/rated", {
        userId: userdata.user_id, // Assuming userdata.user_id contains the user's id
        siteId: siteIdR, // Assuming siteIdR contains the site's id
      })
      .then((response) => {
        console.log(response.data.result);
        if (response.data.Status === "Rated") {
          const rateData = response.data.result;
          setHasRated(true);
          setValueRated(rateData.rate);

          setDateRated(rateData.rating_date.substring(0, 10));
        } else {
          setHasRated(false);
        }

        // You may want to fetch the updated average rating here
        // For this, you'll need an endpoint on your backend that returns the average rating for a site
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    checkRated();
  }, [siteIdR]); // Empty dependency array to run the effect only once

  const submitRating = async (value) => {
    try {
      const response = await axios.post("https://ahlbackendd.onrender.com/api/rating", {
        userId: userdata.user_id, // Assuming userdata.userId contains the user's id
        siteId: siteIdR, // Assuming siteIdR contains the site's id
        ratingValue: value,
      });

      // You may want to fetch the updated average rating here
      // For this, you'll need an endpoint on your backend that returns the average rating for a site
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  const updatenbrates = async () => {
    try {
      const response = await axios.post(
        "https://ahlbackendd.onrender.com/api/site/nbrates",
        {
          site_id: siteIdR,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updatenbrates();
  }, [siteIdR]);

  return (
    <div className="input-rating">
      <h6 className="rating-input-text">Rate Us?</h6>
      {[1, 2, 3, 4, 5].map((star) => (
        <span className="rating-input-stars" key={star}>
          <i
            style={{ color }}
            onClick={() => handleRating(star)}
            className={
              rating >= star
                ? "fas fa-star"
                : rating >= star - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};
Rating.defaultProps = { color: "yellow" };
Rating.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};
export default Rating;
