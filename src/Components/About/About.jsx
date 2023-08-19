import React, {useEffect} from 'react'

//importing styles
import './about.css'

//importing assets
import beirutNighlife from '../../Assets/beirutNightlife.jpeg'
import beirutDtRestaurants from '../../Assets/beirutDtRestaurants.jpeg'

//importing the aos library
import Aos from 'aos'
import 'aos/dist/aos.css'

function About() {

  //creating a scroll animation
  useEffect(() => {
    Aos.init({duration: 3000})
  }, [])

  return (
    <div className="about container">
      <div className="contentDiv flex">
        <h1 data-aos="fade-left">MAKE YOUR LIFE EASIER</h1>
        <p data-aos="fade-right"><span>Activity-Hub Leb</span> gives you the opportunity to see a lot, with just a few clicks, within a short time frame</p>

        <div className="aboutUsDiv">
          <div className="aboutUs-text">
            <h2 data-aos="fade-up">ABOUT US</h2>
            <p data-aos="fade-up">Welcome to our website, a destination guide for exploring Lebanon's many offerings, including nightlife, restaurants, sports activities, resorts, and more. Our mission is to provide visitors with a 
              comprehensive resource for navigating Lebanon's diverse landscape, and to promote the country's unique and vibrant culture. Our team has extensive 
              experience in the travel and hospitality industry and at the core of our work are values of 
              authenticity, accessibility, and sustainability, which we believe are essential to creating meaningful and enriching travel experiences. We're proud to have received 
              recognition for our work, but what motivates us most is the positive impact we have on the local community. As we continue to grow and evolve, we remain committed to providing 
              valuable resources for travelers, and to promoting Lebanon as a top destination for both locals and visitors alike.
            </p>
          </div>
          <div className="aboutUs-images">
            <img data-aos="fade-right" src={beirutDtRestaurants} alt=""/>
            <img data-aos="fade-left" src={beirutNighlife} alt=""/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About