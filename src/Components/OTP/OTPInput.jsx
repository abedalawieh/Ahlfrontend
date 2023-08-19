import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import "../../styles.css";
import { useContext } from "react";
import { RecoveryContext } from "../../App";
import "./otpinput.css";
import "../Signup/signup.css";

//importing icons
import { MdNumbers } from "react-icons/md";

export default function () {
  const { email, otp } = useContext(RecoveryContext);

  const [timerCount, setTimer] = React.useState(60);
  const [OTPinputValue, setOTPinputValue] = useState("");
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  function resendOTP() {
    if (disable) return;
    axios
      .post("https://ahlbackendd.onrender.com/api/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    console.log(otp);
    console.log(parseInt(OTPinputValue));
    if (parseInt(OTPinputValue) === otp) {
      navigate("/recovery/reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="otp-container">
      <div className="otp-items-container">
        <div className="otp-form-container">
          <div className="otp-text">
            <div className="otp-title">
              <p>Email Verification</p>
            </div>
            <div className="otp-sentEmail-text">
              <p>A code has been sent to your email {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="otp-recovery-form">
                <div className="otp-code-input">
                  <MdNumbers className="otp-icon" />
                  <input
                    type="text"
                    name="verify"
                    placeholder="CODE"
                    required
                    value={OTPinputValue}
                    onChange={(e) => setOTPinputValue(e.target.value)}
                  />
                </div>

                <div className="otp-links">
                  <div>
                    <input
                      type="submit"
                      value="Verify Account"
                      color="black"
                      onClick={() => verfiyOTP()}
                      className="otp-verify-btn"
                    />
                  </div>

                  <div className="otp-codes-div">
                    <p>Didn't recieve code?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disable ? `Resend CODE in ${timerCount}s` : "Resend OTP"}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
