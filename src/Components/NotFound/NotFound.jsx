import React from 'react'

//importing react-router
import {Link} from 'react-router-dom'

//importing styles
import './notfound.css'

function NotFound() {
  return (
    <section>
        <div className="notFound container">
            <h2>Ooops! Page Not Found</h2>
            <h1 className="wobble-hor-bottom">404</h1>
            <p>We Can't Find The Page You're Looking For</p>
            <button className="btn"><Link to={"/"}>Go Back Home</Link></button>
        </div>
    </section>
  )
}

export default NotFound