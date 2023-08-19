import React from 'react'

//imoporting styles
import './banner.css'

//importing pictures for the banner
import parties from '../../Assets/parties.jpg';
import resorts from '../../Assets/resorts.jpg';
import sportsActivities from '../../Assets/sportsActivities.jpg';
import restaurants from '../../Assets/restaurants.jpg';
import amusementParks from '../../Assets/amusementParks.jpg';

function Banner() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={resorts} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <h2>Resorts</h2>
                    <p>A commercial establishment that offers you a range of amenities and recreational 
                        activities, often situated in a scenic location</p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={restaurants} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <h2>Restaurants</h2>
                    <p>A venue where you gather with your mates to eat, drink, and socialize, often offering 
                        a menu of various dishes and drinks</p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={sportsActivities} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <h2>Sports Activities</h2>
                    <p>An area where you can engage in various physical activities, such as team 
                        sports, individual workouts, and fitness classes, and many more...</p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={amusementParks} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <h2>Amusement Parks</h2>
                    <p>A location where you can enjoy various rides, games, and 
                        attractions, often designed for children and families, with a focus on entertainment and fun.</p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={parties} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <h2>Night Life</h2>
                    <p>A place where you can enjoy music, drinks, and socializing, typically during the 
                        evening and nighttime hours, often with live performances or DJs providing entertainment</p>
                </div>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
  )
}

export default Banner