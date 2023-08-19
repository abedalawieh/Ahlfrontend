import React, { useState, useContext } from "react";

import { Password } from "primereact/password";

//importing react-router
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { RecoveryContext } from "../../App";

//importing assets
import signup from "../../Assets/signup.svg";
import signin from "../../Assets/signin.svg";

//importing styles
import "./signup.css";

//importing icons
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

function Signup() {
  const { setEmail, email, setOTP, recov, setrecov, userdata, setUserdata } =
    useContext(RecoveryContext);

  const [values, setValues] = useState({
    phone: "",
    username: "",

    password: "",
    email: "",
  });
  const [valuesLogin, setValuesLogin] = useState({
    username: "",

    password: "",
  });

  const [message, setMessage] = useState("");
  const [messager, setMessager] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://ahlbackendd.onrender.com/api/login", valuesLogin)
      .then((res) => {
        if (res.data.Status === "Success") {
          const { data, token } = res.data.resp;

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("data", JSON.stringify(data));

          navigate("/");
          window.location.reload();
        } else {
          setMessage(res.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post("https://ahlbackendd.onrender.com/api/signup", values)
      .then((res) => {
        if (res.data.Status === "Successs") {
          setMessager("User Created Succesfully,Please Sign In to Continue.");
        } else {
          setMessager(res.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };

  const navigateToOtp = (e) => {
    if (valuesLogin.username) {
      setEmail(valuesLogin.username);
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);
      axios
        .post("https://ahlbackendd.onrender.com/api/send_recovery_email", {
          OTP,
          recipient_email: valuesLogin.username,
        })
        .then(() => {
          setrecov(true);
          navigate("/recovery/otp");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please enter your email");
    }
  };

  //USE STATES:
  //togglin signin and signup
  const [signIn, setSignIn] = useState("registration");
  //toggling showpass
  const [showPassActive, setShowPassActive] = useState(true);
  const [hidePassActive, setHidePassActive] = useState(false);
  const [passType, setPassType] = useState("password");
  //reading signin data
  const [signinUsername, setSigninUsername] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  //reading signup data
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
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
  //checking if passwords match
  const [passMatchText, setPassMatchText] = useState("Passwords don't match");
  const passMatchIndicator = document.querySelector(".pass-match-text");

  //FUNCTIONS:
  //showing the signup
  const showSignUp = () => {
    setSignIn("registration sign-up-mode");
  };
  //show the signin
  const showSignIn = () => {
    setSignIn("registration");
  };
  //check for email pattern
  const emailPattern = () => {
    if (values.email !== "") {
      setEmailField(true);
      if (values.email.match(regExpEmail)) {
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
    if (values.password !== "") {
      indicator.style.display = "block";
      indicator.style.display = "flex";
      if (
        values.password.length <= 3 &&
        (values.password.match(regExpWeak) ||
          values.password.match(regExpMedium) ||
          values.password.match(regExpStrong))
      )
        no = 1;
      if (
        values.password.length >= 6 &&
        ((values.password.match(regExpWeak) &&
          values.password.match(regExpMedium)) ||
          (values.password.match(regExpMedium) &&
            values.password.match(regExpStrong)) ||
          (values.password.match(regExpWeak) &&
            values.password.match(regExpStrong)))
      )
        no = 2;
      if (
        values.password.length >= 6 &&
        values.password.match(regExpWeak) &&
        values.password.match(regExpMedium) &&
        values.password.match(regExpStrong)
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
  //check if passwords match
  const passMatch = () => {
    if (signupConfirmPassword !== "") {
      passMatchIndicator.style.display = "block";
      if (signupConfirmPassword === values.password)
        setPassMatchText("Passwords match");
      else setPassMatchText("Passwords don't match");
    } else {
      passMatchIndicator.style.display = "none";
    }
  };

  return (
    <div className={signIn}>
      <div className="forms-container">
        <div className="signin-singup">
          <form onSubmit={handleSubmit} action="" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <FaUser className="login-signup-icon" />
              <input
                type="text"
                placeholder="Email or Username"
                name="username"
                required
                onChange={(e) =>
                  setValuesLogin({ ...valuesLogin, username: e.target.value })
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
                    setValuesLogin({ ...valuesLogin, password: e.target.value })
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

            <a href="#" onClick={() => navigateToOtp()} className="forgot">
              Forgot Password? Please enter you email above and click here to
              continue.
            </a>

            <input
              type="submit"
              value="Sign In"
              className="login-signup-btn "
            />
            {message && (
              <div className="login-message">
                <FaExclamationTriangle className="message-icon" />
                <p className="message-text">{message}</p>
              </div>
            )}
          </form>

          <form onSubmit={register} action="" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FaUser className="login-signup-icon" />
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <FaEnvelope className="login-signup-icon" />
              <div className="email-input">
                <input
                  type="text"
                  placeholder="E-mail"
                  name="email"
                  required
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                  onKeyUp={emailPattern}
                />
                {emailField && (
                  <span>
                    {!emailBool && (
                      <AiOutlineCloseCircle className="login-signup-icon wrong" />
                    )}
                    {emailBool && (
                      <AiOutlineCheckCircle className="login-signup-icon correct" />
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="input-field">
              <FaPhone className="login-signup-icon" />
              <input
                type="text"
                placeholder="Phone (Optional)"
                name="phone"
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
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
                    setValues({ ...values, password: e.target.value })
                  }
                  onKeyUp={passPattern}
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
            <div className="indicator">
              <span className="weak"></span>
              <span className="medium"></span>
              <span className="strong"></span>
            </div>
            <div className="pass-text">{passText}</div>
            <div className="input-field">
              <FaLock className="login-signup-icon" />
              <input
                type={passType}
                placeholder="Confirm Password"
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                onKeyUp={passMatch}
              />
            </div>
            <div className="pass-match-text">{passMatchText}</div>
            <input
              type="submit"
              value="Sign Up"
              className="login-signup-btn solid"
            />
            {messager && (
              <div className="login-message">
                <FaExclamationTriangle className="message-icon" />
                <p>{messager}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New To The Website?</h3>
            <p>Enter Your Personal Details And Start Your Journey With Us</p>
            <button
              className="login-signup-btn transparent"
              onClick={showSignUp}
            >
              Sign Up
            </button>
          </div>

          <img src={signin} alt="" className="image" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Welcome Back!</h3>
            <p>Login With Your Personal Data To Stay Connected With Us</p>
            <button
              className="login-signup-btn transparent"
              onClick={showSignIn}
            >
              Sign In
            </button>
          </div>

          <img src={signup} alt="" className="image" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
