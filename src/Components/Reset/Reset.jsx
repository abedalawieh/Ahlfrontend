import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RecoveryContext } from "../../App";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./reset.css";
//import "../../styles.css"

const Reset = () => {
  const [valuesReset, setValuesReset] = useState({});
  const [message, setMessage] = useState({});
  const [showPassActive, setShowPassActive] = useState(false);
  const [hidePassActive, setHidePassActive] = useState(true);
  const [passType, setPassType] = useState("password");
  const { email } = useContext(RecoveryContext);
  console.log(email);
  const navigate = useNavigate();
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

  const handlePasswordChange = (e) => {
    setValuesReset({ ...valuesReset, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "https://ahlbackendd.onrender.com/api/reset";
    const data = { password: valuesReset.password, email: email };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        navigate("/recovery/recovered");
        // handle response from backend
      })
      .catch((error) => {
        console.log(error); // handle error
      });
  };

  return (
    <div className="reset-container">
      <div className="reset-form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <FaLock className="login-signup-icon" />
            <div className="pass-input">
              <input
                type={passType}
                placeholder="New Password"
                name="password"
                required
                onChange={handlePasswordChange}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password must contain at least one number, one lowercase letter, one uppercase letter, and be at least 8 characters long."
              />
              <span>
                {showPassActive && (
                  <FaEye className="login-signup-icon" onClick={showHidePass} />
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
          <button className="login-signup-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
