import React from "react";

//importing styles
import "./contact.css";
import axios from "axios";
import Aos from "aos";
import { useState } from "react";

//importing icons
import { BsSendCheckFill } from "react-icons/bs";

function Contact() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/posts/addComplaint", {
        firstname,
        lastname,
        email,
        phone,
        message,

        //  date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  return (
    <div className="contact-section">
      <div className="contact-container">
        <h2>Contact Us Form</h2>

        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name=""
                required="required"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <span className="text">First Name</span>
              <span className="line"></span>
            </div>
          </div>

          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name=""
                required="required"
                onChange={(e) => setLastname(e.target.value)}
              />
              <span className="text">Last Name</span>
              <span className="line"></span>
            </div>
          </div>
        </div>

        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name=""
                required="required"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text">Email</span>
              <span className="line"></span>
            </div>
          </div>

          <div className="col">
            <div className="inputBox">
              <input
                type="text"
                name=""
                required="required"
                onChange={(e) => setPhone(e.target.value)}
              />
              <span className="text">Phone</span>
              <span className="line"></span>
            </div>
          </div>
        </div>

        <div className="row100">
          <div className="col">
            <div className="inputBox textarea">
              <textarea
                required="required"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <span className="text">Type Your Message</span>
              <span className="line"></span>
            </div>
          </div>
        </div>

        <div className="row100">
          <div className="col">
            <button
              className="submit-contact-form"
              onClick={handleClick}
              type="submit"
            >
              SEND
              <BsSendCheckFill className="submit-button-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
