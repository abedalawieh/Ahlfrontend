import React, { useEffect, useState, useContext } from "react";

//importing styles
import "./userhomepage.css";

//importing react-router
import { Link } from "react-router-dom";

//importing components
import Home from "../Home/Home";
import Main from "../Main/Main";

//importing assets

//importing icons
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdFavorite } from "react-icons/md";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { RecoveryContext } from "../../App";
function UserHomePage() {
  //toggling the panel
  const [active, setActive] = useState("side-panel");
  const [isActive, setIsActive] = useState(false);
  const [activeButton, setActiveButton] = useState("side-panel-toggle");
  const [isprofile, setisprofile] = useState("/signup");
  const [isfavorite, setisfavorite] = useState("/signup");
  const data = JSON.parse(sessionStorage.getItem("data"));
  //username and pfp of the user
  const [username, setUsername] = useState("username");
  const { userdata } = useContext(RecoveryContext);

  const [userPFP, setUserPFP] = useState("pfp.svg");
  //showing the panel
  const togglePanel = () => {
    if (!isActive) {
      setActive("side-panel active");
      setActiveButton("side-panel-toggle active-button");
      setIsActive(true);
    } else {
      setActive("side-panel");
      setActiveButton("side-panel-toggle");
      setIsActive(false);
    }
  };
  const token = sessionStorage.getItem("token");
  const handlesubmitlink = () => {
    if (token) {
      setisprofile("/profile");
      setisfavorite("/sites/favorites");
    } else {
      setisprofile("/signup");
      setisfavorite("/signup");
    }
  };
  useEffect(() => {
    handlesubmitlink();
    if (token) {
      if (data["profile_picture"]) {
        setUserPFP(data["profile_picture"]);
      }

      setUsername(data["username"]);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="home-main">
        <Home />
        <Main />
      </div>
      <button className={activeButton} type="button" onClick={togglePanel}>
        {!isActive && <AiOutlineDoubleRight className="sp-icon-open" />}
        {isActive && <AiOutlineDoubleLeft className="sp-icon-close" />}
      </button>
      <div className={active}>
        <h3>User Panel</h3>
        <hr />
        <h4>{username}</h4>
        <div className="side-panel-pfp">
          <img className="user-pfp" src={`../upload/${userPFP}`} alt="" />
          Profile Picutre
        </div>
        <hr />
        <Link to={isprofile} className="side-panel-item">
          <CgProfile className="side-panel-item-icon" />
          <div className="side-panel-item-text">Edit Profile</div>
        </Link>
        <Link to={isfavorite} className="side-panel-item">
          <MdFavorite className="side-panel-item-icon" />
          <div className="side-panel-item-text">My Favorites</div>
        </Link>
        <Link to="/SP" className="side-panel-item">
          <BsFillCloudUploadFill className="side-panel-item-icon" />
          <div className="side-panel-item-text">Upload a Site</div>
        </Link>
      </div>
    </div>
  );
}

export default UserHomePage;
