import React, { useState, useEffect } from "react";

//importing styles
import "./userprofile.css";

//imorting icons
import { MdMarkEmailRead, MdEdit } from "react-icons/md";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { GrContactInfo } from "react-icons/gr";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

function UserProfile() {
  //user info
  const [dbUsername, setDbUsername] = useState("my username");
  const [username, setUsername] = useState("");
  const [userPFP, setUserPFP] = useState("../upload/pfp.svg");
  const [dbUserEmail, setDbUserEmail] = useState("user-email@example.com");
  const [userEmail, setUserEmail] = useState("");
  const [dbUserPhone, setDbphone] = useState("71-111111");
  const [file, setFile] = useState(null);
  const [userPhone, setUserPhone] = useState("");
  const [hasPhone, setHasPhone] = useState(true);
  const [dbUserBio, setDbUserBio] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  );
  const [userBio, setUserBio] = useState("");
  const [hasBio, setHasBio] = useState(true);
  const [dbUserPassword, setDbUserPassword] = useState("'s password");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] =
    useState("cofirm my password");
  //toggling showpass
  const [showPassActive, setShowPassActive] = useState(true);
  const [hidePassActive, setHidePassActive] = useState(false);
  const [passType, setPassType] = useState("password");
  //checking email pattern
  const [emailBool, setEmailBool] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const regExpEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  //checking pass pattern
  const [passText, setPassText] = useState("Your password is too weak");
  const [passValid, setPassValid] = useState(false);
  var no = 0;
  const indicator = document.querySelector(".indicator");
  const meter = document.querySelector(".pass-text");
  const weak = document.querySelector(".weak");
  const medium = document.querySelector(".medium");
  const strong = document.querySelector(".strong");
  const regExpWeak = /[a-z]/;
  const regExpMedium = /\d+/;
  const regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
  const data = JSON.parse(sessionStorage.getItem("data"));

  const user_id = data["user_id"];
  const [user, setUser] = useState([]);

  const editProfile = async (e) => {
    e.preventDefault();

    await axios
      .put("/posts/updateuserInfo", {
        user_id,
        username,
        userEmail,
        userPhone,
        userBio,
        userPassword,
      })
      .then((response) => {
        // Handle the successful response
        window.location.reload();
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };

  const fetchUser = () => {
    fetch(`https://ahlbackendd.onrender.com/api/posts/User/${user_id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log(data);
        setDbphone(data[0].phone);
        setDbUserEmail(data[0].email);
        setDbUsername(data[0].username);
        if (data[0].profile_picture !== null) {
          setUserPFP(data[0].profile_picture);
        } else {
          setUserPFP("../upload/pfp.svg");
        }
        if (data[0].bio !== null) {
          setDbUserBio(data[0].bio);
        }
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
  const updatepfp = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    axios
      .put("/posts/updatepfp", {
        img: imgUrl,
        user_id,
      })
      .then((response) => {
        // Handle the successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
    window.location.reload();
  };

  //FUNCTIONS
  //check for email pattern
  const emailPattern = () => {
    if (userEmail !== "") {
      setEmailField(true);
      if (userEmail.match(regExpEmail)) {
        setEmailBool(true);
      } else {
        setEmailBool(false);
      }
    } else setEmailField(false);
  };

  //show and hide the pass
  const showHidePass = () => {
    if (showPassActive) {
      setShowPassActive(false);
      setHidePassActive(true);
      setPassType("text");
    } else {
      setShowPassActive(true);
      setHidePassActive(false);
      setPassType("password");
    }
  };
  //check for password pattern
  const passPattern = () => {
    if (userPassword !== "") {
      indicator.style.display = "block";
      indicator.style.display = "flex";
      if (
        userPassword.length <= 3 &&
        (userPassword.match(regExpWeak) ||
          userPassword.match(regExpMedium) ||
          userPassword.match(regExpStrong))
      )
        no = 1;
      if (
        userPassword.length >= 6 &&
        ((userPassword.match(regExpWeak) && userPassword.match(regExpMedium)) ||
          (userPassword.match(regExpMedium) &&
            userPassword.match(regExpStrong)) ||
          (userPassword.match(regExpWeak) && userPassword.match(regExpStrong)))
      )
        no = 2;
      if (
        userPassword.length >= 6 &&
        userPassword.match(regExpWeak) &&
        userPassword.match(regExpMedium) &&
        userPassword.match(regExpStrong)
      )
        no = 3;
      if (no === 1) {
        weak.classList.add("active");
        setPassText("Your password is too weak");
        meter.style.display = "block";
        meter.classList.add("weak");
      }
      if (no === 2) {
        medium.classList.add("active");
        setPassText("Your password is medium");
        meter.classList.add("medium");
      } else {
        medium.classList.remove("active");
        meter.classList.remove("medium");
        setPassText("Your password is too weak");
      }
      if (no === 3) {
        weak.classList.add("active");
        medium.classList.add("active");
        strong.classList.add("active");
        setPassText("Your password is strong");
        meter.classList.add("strong");
      } else {
        strong.classList.remove("active");
        meter.classList.remove("strong");
      }
    } else {
      indicator.style.display = "none";
      meter.style.display = "none";
    }
  };

  return (
    <div className="user-section">
      <div className="user-info">
        <h2>{dbUsername}</h2>
        <div className="user-pfp-div">
          <img className="user-pfp" src={`../upload/${userPFP}`} alt="" />
          <div>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label className="file edit-pfp" htmlFor="file">
              <MdEdit />
            </label>
          </div>

          <p>Profile Picture</p>
          <button className="btn update-pfp" onClick={updatepfp}>
            Update PFP
          </button>
        </div>
        <div className="user-about">
          <h2>About</h2>
          <div className="about-item">
            <div className="about-item-icon">
              <MdMarkEmailRead />
            </div>
            <div className="about-item-text">{dbUserEmail}</div>
          </div>
          {hasPhone && (
            <div className="about-item">
              <div className="about-item-icon">
                <HiDevicePhoneMobile />
              </div>
              <div className="about-item-text">{dbUserPhone}</div>
            </div>
          )}
          {hasBio && (
            <div className="about-item">
              <div className="about-item-icon">
                <GrContactInfo />
              </div>
              <div className="about-item-text">{dbUserBio}</div>
            </div>
          )}
        </div>
      </div>

      <div className="edit-info">
        <form onSubmit={editProfile} action="" className="edit-info-form">
          <h2>Edit Info</h2>
          <div className="edit-info-item">
            <FaUser className="edit-info-icon" />
            <input
              type="text"
              placeholder={dbUsername}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="edit-info-item">
            <FaEnvelope className="edit-info-icon" />
            <div className="edit-info-email">
              <input
                type="text"
                placeholder={dbUserEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                onKeyUp={emailPattern}
              />
              {emailField && (
                <span>
                  {!emailBool && (
                    <AiOutlineCloseCircle className="edit-info-icon wrong-email" />
                  )}
                  {emailBool && (
                    <AiOutlineCheckCircle className="edit-info-icon correct-email" />
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="edit-info-item">
            <FaPhone className="edit-info-icon" />
            <input
              type="text"
              placeholder={dbUserPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>
          <div className="edit-info-item">
            <FaLock className="edit-info-icon" />
            <div className="edit-info-pass">
              <input
                type={passType}
                placeholder={dbUsername + dbUserPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                onKeyUp={passPattern}
              />
              <span>
                {showPassActive && (
                  <FaEye className="edit-info-icon" onClick={showHidePass} />
                )}
                {hidePassActive && (
                  <FaEyeSlash
                    className="edit-info-icon"
                    onClick={showHidePass}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="indicator">
            <span className="weak"></span>
            <span className="medium"></span>
            <span className="strong"></span>
          </div>
          <div className="pass-text">{passText}</div>
          <div className="edit-info-item-area">
            <MdEdit className="edit-info-icon" />
            <textarea
              placeholder={dbUserBio}
              onChange={(e) => setUserBio(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Update Profile"
            className="btn edit-info-button"
          />
          <div className="login-message">
            <FaExclamationTriangle className="message-icon" />
            <p className="message-text">
              Please make sure to fill all the above fields before pressing the
              update button
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
