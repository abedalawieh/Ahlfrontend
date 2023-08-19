import { useState, useEffect } from "react";

//importing styles
import "./AddSP.css";

//importing icons
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

//importing components
import Extra from "./Extra";

import axios from "axios";

function AddSP() {
  const [email, setEmail] = useState("");
  const [Gpass, setGpass] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassActive, setShowPassActive] = useState(true);
  const [hidePassActive, setHidePassActive] = useState(false);
  const [passType, setPassType] = useState("password");
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
  const [emailBool, setEmailBool] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const regExpEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const emailPattern = () => {
    if (email !== "") {
      setEmailField(true);
      if (email.match(regExpEmail)) {
        setEmailBool(true);
      } else {
        setEmailBool(false);
      }
    } else setEmailField(false);
  };

  function generatePassword() {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setGpass(password);
    setPassword(password);
  }

  const [passText, setPassText] = useState("Your password is too weak");

  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const register = async (e) => {
    try {
      await axios.post("https://ahlbackendd.onrender.com/posts/signupSP", {
        username,
        email,
        phone,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="registrations sign-up-mode" id="addSP">
      <div className="forms-container">
        <div className="signin-singup">
          <form onSubmit={register} action="" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FaUser className="login-signup-icon" />
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Phone"
                name="phone"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-field">
              <FaLock className="login-signup-icon" />
              <div className="pass-input">
                <input
                  placeholder="Password"
                  type={passType}
                  name="password"
                  value={Gpass}
                  onClick={() => generatePassword()}
                  required
                  title="Password must contain at least one number, one lowercase letter, one uppercase letter, and be at least 8 characters long."
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
              value="Sign Up"
              className="login-signup-btn solid"
            />
          </form>
        </div>
      </div>
      <div className="right">
        <Extra />
      </div>
    </div>
  );
}
export default AddSP;
