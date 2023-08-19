import { React, useState, useEffect, useContext } from "react";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { RecoveryContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MakeFav = () => {
  const navigate = useNavigate();
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
  axios.defaults.withCredentials = true;

  const [isloggedinn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const [isFavorite, setIsFavorite] = useState(false);
  const addToFavorite = async () => {
    try {
      const response = await axios
        .post("https://ahlbackendd.onrender.com/api/setFavorite", {
          userId: userdata.user_id, // Assuming userdata.user_id contains the user's id
          siteId: siteIdR, // Assuming siteIdR contains the site's id
        })
        .then((resp) => {
          setIsFavorite(true);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log("error", e);
    }
  };
  const removeFavorite = async () => {
    try {
      const response = await axios
        .post("https://ahlbackendd.onrender.com/api/removeFavorite", {
          userId: userdata.user_id, // Assuming userdata.user_id contains the user's id
          siteId: siteIdR, // Assuming siteIdR contains the site's id
        })
        .then((resp) => {
          setIsFavorite(false);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log("error", e);
    }
  };
  const setAsFavorite = async () => {
    if (isloggedinn) {
      if (!isFavorite) {
        setIsFavorite(true);
        await addToFavorite();
      } else {
        setIsFavorite(false);
        await removeFavorite();
      }
    } else {
      navigate("/signup");
    }
  };
  const checkFavorite = async () => {
    await axios
      .post("https://ahlbackendd.onrender.com/api/favoriteCheck", {
        userId: userdata.user_id, // Assuming userdata.user_id contains the user's id
        siteId: siteIdR, // Assuming siteIdR contains the site's id
      })
      .then((response) => {
        console.log(response.data.Status);
        if (response.data.Status === "Liked") {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }

        // You may want to fetch the updated average rating here
        // For this, you'll need an endpoint on your backend that returns the average rating for a site
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    checkFavorite();
  }, [siteIdR]);
  return (
    <div className="fav-div">
      {!isFavorite && (
        <MdFavoriteBorder className="icon" onClick={setAsFavorite} />
      )}
      {isFavorite && (
        <MdFavorite className="icon fav-icon" onClick={setAsFavorite} />
      )}
    </div>
  );
};

export default MakeFav;
