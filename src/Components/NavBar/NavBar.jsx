import React, { useState, useEffect, useContext } from "react";
import { RecoveryContext } from "../../App";
import SearchBox from "../SearchBox/SearchBox";

//importing react-router
import { Link, useLocation, useNavigate } from "react-router-dom";

//importing styles
import "./navbar.css";

//importing icons
import { GrMapLocation } from "react-icons/gr";
import { TbGridDots } from "react-icons/tb";

function NavBar() {
  const {
    messageLogin,
    setmessageLogin,
    admin,
    siteproviderOrAdmin,
    recov,
    setrecov,
    messageAuth,
    messageAdmin,
  } = useContext(RecoveryContext);
  const location = useLocation();
  //toggling the navbar
  const [active, setActive] = useState("navBar");
  const [isActive, setIsActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  //showing the navbar
  const showNav = () => {
    if (!isActive) {
      setActive("navBar activeNavbar");
      setIsActive(true);
    } else {
      setActive("navBar");
      setIsActive(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
    sessionStorage.removeItem("data");
    const D = sessionStorage.getItem("Role");
    if (D) {
      sessionStorage.removeItem("Role");
    }
  }

  const [showSearchBox, setShowSearchBox] = useState(false);

  useEffect(() => {
    setShowSearchBox(location.pathname.includes("/sites"));
  }, [location.pathname]);

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <h1 className="logo">
            <GrMapLocation className="icon" /> Activity-Hub Leb
          </h1>
        </div>
        <div className={active}>
          <ul className="navLists flex">
            <li> {showSearchBox && <SearchBox />}</li>
            <li className="navItem">
              <Link to={"/"} className="navLink">
                Home
              </Link>
            </li>
            <li className="navItem">
              <Link to={"/about"} className="navLink">
                About
              </Link>
            </li>
            <li className="navItem">
              <Link to={"/contact"} className="navLink">
                Contact
              </Link>
            </li>
            <button className="btn">
              {loggedIn ? (
                <li className="navItem">
                  <Link to={"/signup"} onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="navItem">
                  <Link to={"/signup"}>Register</Link>
                </li>
              )}
            </button>
          </ul>
        </div>
        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
}

export default NavBar;
