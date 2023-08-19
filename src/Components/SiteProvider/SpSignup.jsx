import React, { useState, useContext } from "react";

//importing react-router
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { RecoveryContext } from "../../App";
import "../Signup/signup.css";

//importing assets
import spSignin from "../../Assets/spSignin.svg";

//importing styles

//importing icons
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
} from "react-icons/fa";

function SpSignup() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [valuesLoginSP, setValuesLoginSP] = useState({
    username: "",

    password: "",
  });

  const [messageL, setMessageL] = useState("");
  const {
    messageLogin,
    setmessageLogin,
    admin,
    siteproviderOrAdmin,
    recov,
    setrecov,
    messageAuth,
    messageAdmin,
  } = useContext(RecoveryContext);

  const [passType, setPassType] = useState("password");
  const [showPassActive, setShowPassActive] = useState(true);
  const [hidePassActive, setHidePassActive] = useState(false);

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
  const SpLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://ahlbackendd.onrender.com/api/login/sp", valuesLoginSP)
      .then((res) => {
        if (res.data.Status === "Success") {
          const { data, token, role } = res.data.response;
          console.log({ data, token });

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("data", JSON.stringify(data));
          sessionStorage.setItem("Role", role);

          navigate("/SP");
          window.location.reload();
        } else {
          setMessageL(res.data.Message);
          console.log(messageL);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="registration">
      <div className="forms-container">
        <div className="signin-singup">
          <form onSubmit={SpLogin} action="" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <FaUser className="login-signup-icon" />
              <input
                type="text"
                placeholder="Site-Provide Email or Username"
                name="username"
                required
                onChange={(e) =>
                  setValuesLoginSP({
                    ...valuesLoginSP,
                    username: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-field">
              <FaLock className="login-signup-icon" />
              <div className="pass-input">
                <input
                  type={passType}
                  placeholder="Password"
                  name="password"
                  required
                  onChange={(e) =>
                    setValuesLoginSP({
                      ...valuesLoginSP,
                      password: e.target.value,
                    })
                  }
                />
                <span>
                  {showPassActive && (
                    <FaEye
                      className="login-signup-icon"
                      onClick={showHidePass}
                    />
                  )}
                  {hidePassActive && (
                    <FaEyeSlash
                      className="login-signup-icon"
                      onClick={showHidePass}
                    />
                  )}
                </span>
              </div>
            </div>

            <input
              type="submit"
              value="Sign In"
              className="login-signup-btn "
            />

            {(messageL || messageLogin || messageAdmin || messageLogin) && (
              <div className="login-message">
                <FaExclamationTriangle className="message-icon" />
                <p className="message-text">
                  {messageL || messageLogin || messageAdmin || messageLogin}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>
              Upload your entertainment site and become a part of the team
            </h3>
            <p>
              You are signing in as a Site Provider, make sure you have an
              account. If not, contact us on activityhub@hotmail.com with the
              required documentation to create an account
            </p>
          </div>
          <img src={spSignin} alt="" className="image" />
        </div>
      </div>
    </div>
  );
}

export default SpSignup;
