import React, {useEffect} from 'react'

//importing react-router
import {Link} from 'react-router-dom';

//importing styles
import './footer.css'

//importing components
import Socials from '../Socials/Socials'

//importing assets


//importing used icons
import {FiSend} from 'react-icons/fi'
import {TbTransitionTop} from 'react-icons/tb'
import {BiChevronRight} from 'react-icons/bi'

//importing the aos library
import Aos from 'aos'
import 'aos/dist/aos.css'

function Footer() {

  //creating a scroll animation
  useEffect(() => {
    Aos.init({duration: 2000})
  }, [])

  return (
    <>
      <section className="footer">
        <div className="videoDiv">

        </div>

        <div className="secContent container">
          <div className="contactDiv flex">

            <div data-aos="fade-up" className="text">
              <small>KEEP IN TOUCH</small>
              <h2>Contact Us</h2>
            </div>

            <div className="inputDiv flex">
              <Link to="/contact"><button data-aos="fade-up" data-aos-duration="3000" className="btn flex" type="submit">
                NEXT<FiSend className="icon"/>
              </button></Link>
            </div>
            
          </div>

          <div className="footerCard flex">
            <div className="footerIntro flex">
              <div className="logoDiv">
                <a href="#" className="logo flex">
                  <TbTransitionTop className="icon"/>
                  Activity-Hub Leb.
                </a>
              </div>

              <div data-aos="fade-up" data-aos-duration="3000" className="footerParagraph">
                Discover the best entertainment spots in Lebanon with our website. From resorts and restaurants to sports activities, parties and many more,
                we have everything you need to make the most of your leisure time. Our platform is dedicated to providing you with accurate and up-to-date information
                about the avaialable entertainment options in Lebanon. We hope you find our website helpful and enjoyable, and please don't hesitate to contact us if you have 
                any inquiries or
              </div>


            </div>

            <div className="footerLinks grid">

              {/* first group*/}
              <div data-aos="fade-up" data-aos-duration="3000" className="linkGroup">
                <span className="groupTitle">
                  OUR AGENCY
                </span>

                <li className="footerList flex">
                  <BiChevronRight className="icon"/> 
                  Agency
                </li>

                <li className="footerList flex">
                  <BiChevronRight className="icon"/> 
                  Tourism 
                </li>

                <li className="footerList flex">
                  <BiChevronRight className="icon"/> 
                  Packages
                </li>

                <li className="footerList flex">
                  <BiChevronRight className="icon"/> 
                  Payments
                </li>

              </div>

              {/* second group*/}
              <div data-aos="fade-up" data-aos-duration="4000" className="linkGroup">
                <span className="groupTitle">
                  SERVICES
                </span>

                <li className="footerList flex">
                  <BiChevronRight className="icon"/> 
                  Sign in
                </li>

                <li className="footerList flex">
                  <BiChevronRight className="icon"/> 
                  Sign up 
                </li>

                <li className="footerList flex">
                  <BiChevronRight className="icon"/> 
                  Contact
                </li>

                <li className="footerList flex">
                  <BiChevronRight className="icon"/> 
                  About
                </li>


              </div>

            </div> 

            <div className="footerDiv flex">
              <small>BEST ENTERTAINMENT PLATFORM</small>
              <small>DONE BY W.H.A</small>
            </div>

          </div>
        </div>
      </section>
      <section className="socials-section">
        <Socials/>
      </section>
    </>
  )
}

export default Footer