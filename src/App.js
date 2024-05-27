//importing styles
import "./app.css";

//importing react-router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

//importing components
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import NotFound from "./Components/NotFound/NotFound";
import Write from "./Components/SiteProvider/Write";
import Admin from "./Components/Admin/Admin";
import About from "./Components/About/About";
import Signup from "./Components/Signup/Signup";
import SiteScreen from "./Components/Details/SiteScreen";
import OTPInput from "./Components/OTP/OTPInput";
import Reset from "./Components/Reset/Reset";
import Recovered from "./Components/Reset/Recovered";
import SpSignup from "./Components/SiteProvider/SpSignup";
import Adminsignin from "./Components/Admin/signin";
import All from "./Components/AllPostsScreen/All";
import UserHomePage from "./Components/UserHomePage/UserHomePage";
import Contact from "./Components/Contact/Contact";
import UserProfile from "./Components/UserProfile/UserProfile";
import FavoriteScreen from "./Components/Favorites/FavoriteScreen";

export const RecoveryContext = createContext();

function App() {
  const [otp, setOTP] = useState();
  const [email, setEmail] = useState();
  const [userdata, setUserdata] = useState();

  const [messageLogin, setmessageLogin] = useState();
  const [admin, setAdmin] = useState(false);
  const [messageAdmin, setMessageAdmin] = useState();
  const [messageAuth, setMesageAuth] = useState();
  const [recov, setrecov] = useState(false);
  const [siteproviderOrAdmin, setSiteProviderOrAdmin] = useState(false);
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("Role");
  const [keyword, setKeyword] = useState("");
  const [siteIdR, setSiteIdR] = useState();
  const [hasRated, setHasRated] = useState(false);
  const [valueRated, setValueRated] = useState();
  const [dateRated, setDateRated] = useState();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("data"));
    console.log(user);
    if (user) {
      setUserdata(user);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("Role");
    if (token) {
      if (role === "iamsiteprovider") {
        setSiteProviderOrAdmin(true);
      } else if (role === "iamadmin") {
        setAdmin(true);
        setSiteProviderOrAdmin(true);
      } else {
        setMesageAuth("You should be an admin or sp to access this site");
      }
    } else {
      setmessageLogin("Please login as an admin or an sp to access the site");
    }
  }, []); // <-- this useEffect hook will be called once after the component is mounted

  return (
    <RecoveryContext.Provider
      value={{
        otp,
        setOTP,
        setEmail,
        email,
        messageLogin,
        setmessageLogin,
        admin,
        siteproviderOrAdmin,
        recov,
        setrecov,
        messageAuth,
        messageAdmin,
        userdata,
        setUserdata,
        keyword,
        setKeyword,
        siteIdR,
        setSiteIdR,
        dateRated,
        setDateRated,
        hasRated,
        setHasRated,
        valueRated,
        setValueRated,
      }}
    >
      <Router>
        <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<UserHomePage />} exact />
          <Route
            path="/sp"
            element={
              siteproviderOrAdmin ? (
                <>
                  <Write />
                </>
              ) : (
                <>
                  <SpSignup />
                </>
              )
            }
          />
          <Route
            path="/admin"
            element={
              admin ? (
                <>
                  <Admin />
                </>
              ) : (
                <>
                  <SpSignup />
                </>
              )
            }
          />
          <Route
            path="/about"
            element={
              <>
                <About />
              </>
            }
          />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="/contact"
            element={
              <>
                <Contact />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Signup />
              </>
            }
          />
          <Route
            path="/site/:id"
            element={
              <>
                <SiteScreen />
              </>
            }
          />
          <Route
            path="/recovery/otp"
            element={
              recov ? (
                <>
                  <OTPInput />
                </>
              ) : (
                <>
                  <Signup />
                </>
              )
            }
          />
          <Route
            path="/recovery/reset"
            element={
              recov ? (
                <>
                  <Reset />
                </>
              ) : (
                <>
                  <Signup />
                </>
              )
            }
          />
          <Route
            path="/recovery/recovered"
            element={
              recov ? (
                <>
                  <Recovered />
                </>
              ) : (
                <>
                  <Signup />
                </>
              )
            }
          />
          <Route
            path="/login/sp"
            element={
              <>
                <SpSignup />
              </>
            }
          />
          <Route
            path="/adminsigninhadiabedwill"
            element={
              <>
                <Adminsignin />
              </>
            }
          />
          <Route
            path="/sites"
            element={
              <>
                <All />
              </>
            }
            exact
          />
          <Route
            path="/sites/favorites"
            element={
              <>
                <FavoriteScreen />
              </>
            }
            exact
          />
        </Routes>
        <Footer />
      </Router>
    </RecoveryContext.Provider>
  );
}

export default App;
