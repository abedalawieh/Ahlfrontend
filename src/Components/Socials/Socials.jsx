import React,{useEffect} from 'react'

//importing styles
import './socials.css'
import {IoShareSocialSharp} from 'react-icons/io5'

//importing used icons
import {FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp} from 'react-icons/fa'

//importing aos library
import Aos from 'aos'
import 'aos/dist/aos.css'

function Socials() {

  //creating a scroll animation
  useEffect(() => {
    Aos.init({duration: 2000})
  }, [])

  return (
    <>
    <div data-aos="fade-up" className="social-div grid"> 
          <ul className="social-ul">
            <li className="social-li"> 
              <a href="http://www.facebook.com">
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div" aria-hidden="true"><FaFacebook className="socials"/></span>
              </a>
            </li>
            <li className="social-li">
              <a href="http://www.instagram.com">
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div" aria-hidden="true"><FaInstagram className="socials"/></span>
              </a>
            </li>
            <li className="social-li">
              <a href="http://www.twitter.com">
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span aria-hidden="true"><FaTwitter className="socials"/></span>
              </a>
            </li>
            <li className="social-li">
              <a href="http://www.linkedin.com">
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div" aria-hidden="true"><FaLinkedin className="socials"/></span>
              </a>
            </li>
            <li className="social-li">
              <a href="http://www.whatsapp.com">
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div"></span>
                <span className="social-div" aria-hidden="true"><FaWhatsapp className="socials"/></span>
              </a>
            </li>
          </ul>
          </div>
          <div className="rotate-vert-center">
            <IoShareSocialSharp className="socials-icon"/>
            <h4>SOCIALS</h4>
          </div>
    </>
  )
}

export default Socials