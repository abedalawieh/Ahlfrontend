import React, { useState } from "react";

//importing react-router
import { useNavigate } from "react-router-dom";
import axios from "axios";

//importing assets
import adminSignin from "../../Assets/adminSignin.svg";

//importing styles
import "../Signup/signup.css";

//importing icons
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [values, setValues] = useState({
    username: "",

    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/api/posts/Loginadmin", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          const { data, token, role } = res.data.response;
          console.log({ data, token });

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("data", JSON.stringify(data));
          sessionStorage.setItem("Role", role);

          navigate("/admin");
          window.location.reload();
        } else {
          setMessage(res.data.Message);
          console.log(message);
        }
      })
      .catch((err) => console.log(err));
  };

  //USE STATES:
  //toggling showpass
  const [showPassActive, setShowPassActive] = useState(true);
  const [hidePassActive, setHidePassActive] = useState(false);
  const [passType, setPassType] = useState("password");

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

  return (
    <div className="registration">
      <div className="forms-container">
        <div className="signin-singup">
          <form onSubmit={handleSubmit} action="" className="sign-in-form">
            <h2 className="title">Sign in</h2>
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
              className="login-signup-btn solid"
            />
            {message && (
              <div>
                <h3>{message}</h3>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Welcome Back</h3>
            <p>
              You are signing in as Admin, make sure you have the correct
              credentials
            </p>
          </div>
          <img src={adminSignin} alt="" className="image" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
