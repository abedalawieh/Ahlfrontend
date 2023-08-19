import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "../SiteProvider/Dropdown.css";
import { useLocation } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import Rating from "../Rating/Rating";
import "./Write.css";
import Carousel from "react-multi-carousel";
import "../Home/home.css";
import Aos from "aos";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState("");
  const [showPassActive, setShowPassActive] = useState(true);
  const [hidePassActive, setHidePassActive] = useState(false);
  const [passType, setPassType] = useState("password");
  const [newSPPass, setNewSPPass] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [cat, setCat] = useState("");
  const [fees, setFees] = useState("");
  const [value1, setValue1] = useState("");
  const [name1, setName1] = useState("");
  const [location1, setLocation1] = useState("");

  const [cat1, setCat1] = useState("");
  const [fees1, setFees1] = useState("");

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const [posts, setPosts] = useState([]);

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

  //creating a scroll animation
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  //responsive grid
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const fetchUserData1 = (id) => {
    fetch(`https://ahlbackendd.onrender.com/api/posts/spsite/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  };
  const data = JSON.parse(sessionStorage.getItem("data"));
  const site_provider_id = data["site_provider_id"] || data["admin_id"];

  useEffect(() => {
    fetchUserData1(site_provider_id);
  }, []);

  //upload file
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  const handleNewPass = async (e) => {
    e.preventDefault();

    axios
      .put("/posts/newsppass", {
        id: site_provider_id,
        newpass: newSPPass,
      })
      .then((response) => {
        // Handle the successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
    window.location.reload();
  };

  const upload2 = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file2);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  const edit = async (e) => {
    e.preventDefault();

    axios
      .put("/posts/sitewId", {
        name1,
        location1,
        desc1: value,
        cat1,
        fees1,
        site_id: selectedOption,
      })
      .then((response) => {
        // Handle the successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
    window.location.reload();
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const imgUrl = await upload();

    try {
      await axios.post("/posts/addPost", {
        name,
        location,
        desc: value,
        cat,
        img: file ? imgUrl : "",
        fees,
        site_provider_id,

        //  date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  const handleClick2 = async (e) => {
    e.preventDefault();

    const imgUrl = await upload2();

    try {
      await axios.post("/posts/photo", {
        img: file2 ? imgUrl : "",
        site_id: selectedOption2,

        //  date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  const [selectedOption, setSelectedOption] = useState("select");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [selectedOption2, setSelectedOption2] = useState("select");

  const handleSelectChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <div>
      <div className="add">
        <div className="content">
          <h1>Add Your Own Entertainment Site</h1>
          <input
            className="add-input"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="add-input"
            type="text"
            placeholder="fees"
            onChange={(e) => setFees(e.target.value)}
          />
          <input
            className="add-input"
            type="text"
            placeholder="location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
          <button className="buttons btn" onClick={handleClick}>
            Publish
          </button>
        </div>
        <div className="sp-menu">
          <div className="sp-item">
            <h1 className="sp-img-h1">Add image</h1>
            <input
              className="file"
              // style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            />
            {/* <label className="file" htmlFor="file">
              Upload Image
            </label> */}
          </div>
          <div className="sp-item">
            <h1>Category</h1>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "Restaurant"}
                name="cat"
                value="Restaurant"
                id="art"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Restaurant</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "Resort"}
                name="cat"
                value="Resort"
                id="science"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="science">Resort</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "Sports Activities"}
                name="cat"
                value="Sports Activities"
                id="technology"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="technology">Sports Activities</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "Night Life"}
                name="cat"
                value="Night Life"
                id="cinema"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="cinema">Night Life</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "Kids Activities"}
                name="cat"
                value="Kids Activities"
                id="design"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="design">Kids Activities</label>
            </div>
          </div>
        </div>
      </div>

      <div className="guest-main container section">
        <div className="secTitle " id="pending">
          <h3 data-aos="fade-right" className="title">
            My posts
          </h3>
        </div>

        <div className="secContent grid width">
          <Carousel responsive={responsive}>
            {posts.map((posts) => {
              return (
                <div
                  data-aos="fade-up"
                  className="singleDestination"
                  key={posts.site_id}
                >
                  <div className="imgDiv">
                    <img src={`../upload/${posts.img}`} alt={posts.title} />
                  </div>

                  <div className="cardInfo">
                    <h4 className="destTitle">{posts.name}</h4>
                    <span className="continent flex">
                      <a href={posts.location}>
                        <ImLocation className="icon" />
                      </a>
                      <span className="name">Location</span>
                    </span>

                    <Rating
                      value={posts.rating}
                      text={
                        posts.nb_rates === 0
                          ? "no reviews"
                          : posts.nb_rates === 1
                          ? "1 review"
                          : posts.nb_rates + " reviews"
                      }
                      color="#0066ff"
                    />

                    <div className="fees flex">
                      <div className="category">
                        <span>
                          {posts.cat} <small>+1</small>
                        </span>
                      </div>
                      <div className="price">
                        <h5>Avg Fees: {posts.fees}$</h5>
                      </div>
                    </div>

                    <div className="desc">
                      <p>
                        {getText(posts.description.substring(0, 100) + "...")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>

      <div className="edit">
        <h1>Edit One Of Your Sites</h1>
        <div className="dr">
          <label className="edit-site-label" htmlFor="dropdown">
            Select an option:
          </label>
          <select
            id="dropdown"
            className="select-menu"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="select">Select</option>
            {posts.map((post) => {
              return (
                <>
                  <option value={post.site_id}>
                    {post.site_id + ": " + post.name}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <div className="add edit-content">
          {posts.map((post) => {
            if (selectedOption == post.site_id) {
              return (
                <>
                  <div className="content">
                    <input
                      className="add-input"
                      type="text"
                      placeholder={post.name}
                      onChange={(e) =>
                        setName1(e.target.value ? e.target.value : post.name)
                      }
                    />
                    <input
                      className="add-input"
                      type="text"
                      placeholder={post.fees}
                      onChange={(e) =>
                        setFees1(e.target.value ? e.target.value : post.fees)
                      }
                    />
                    <input
                      className="add-input"
                      type="text"
                      placeholder={post.location}
                      onChange={(e) =>
                        setLocation1(
                          e.target.value ? e.target.value : post.location
                        )
                      }
                    />
                    <div className="editorContainer">
                      <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value ? value : post.description}
                        onChange={setValue}
                      />
                    </div>
                  </div>
                  <div className="sp-menu">
                    <div className="sp-item">
                      <h1>Edit</h1>

                      <div>
                        <button className="edit-button btn" onClick={edit}>
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="sp-item">
                      <h1>Category</h1>
                      <div className="cat">
                        <input
                          type="radio"
                          checked={post.cat === "Restaurant"}
                          name="cat"
                          value="Restaurant"
                          id="art"
                          onChange={(e) => setCat1(e.target.value)}
                        />
                        <label htmlFor="art">Restaurant</label>
                      </div>
                      <div className="cat">
                        <input
                          type="radio"
                          checked={post.cat === "Resort"}
                          name="cat"
                          value="Resort"
                          id="science"
                          onChange={(e) => setCat1(e.target.value)}
                        />
                        <label htmlFor="science">Resort</label>
                      </div>
                      <div className="cat">
                        <input
                          type="radio"
                          checked={post.cat === "Sports Activities"}
                          name="cat"
                          value="Sports Activities"
                          id="technology"
                          onChange={(e) => setCat1(e.target.value)}
                        />
                        <label htmlFor="technology">Sports Activities</label>
                      </div>
                      <div className="cat">
                        <input
                          type="radio"
                          checked={cat === "Night Life"}
                          name="cat"
                          value="Night Life"
                          id="cinema"
                          onChange={(e) => setCat1(e.target.value)}
                        />
                        <label htmlFor="cinema">Night Life</label>
                      </div>
                      <div className="cat">
                        <input
                          type="radio"
                          checked={post.cat === "Kids Activities"}
                          name="cat"
                          value="Kids Activities"
                          id="design"
                          onChange={(e) => setCat1(e.target.value)}
                        />
                        <label htmlFor="design">Kids Activities</label>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>

      <div className="add-photo">
        <h1 className="add-photo-title">Add Additional Photo For Your Site</h1>
        <div className="dr">
          <label htmlFor="dropdown">Select a site to add photo:</label>
          <select
            id="dropdown"
            className="select-menu"
            value={selectedOption2}
            onChange={handleSelectChange2}
          >
            <option value="select">Select</option>
            {posts.map((post) => {
              return (
                <>
                  <option value={post.site_id}>
                    {post.site_id + "-" + post.name}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <div className="addphoto">
          <input
            className="add-additional-image-input"
            type="file"
            id="file2"
            name=""
            onChange={(e) => setFile2(e.target.files[0])}
          />
          <label className="file" htmlFor="file2">
            <h1 className="upload-additional-h1">Upload Image</h1>
          </label>
          <div>
            <button
              onClick={handleClick2}
              className="btn upload-additional-button"
            >
              Add{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="sp-edit-password">
        <form onSubmit={handleNewPass} action="" className="sign-in-form">
          <h2 className="title">Edit Password</h2>
          <div className="input-field">
            <FaLock className="login-signup-icon" />
            <div className="pass-input">
              <input
                type={passType}
                placeholder="New Password"
                name="password"
                required
                onChange={(e) => setNewSPPass(e.target.value)}
              />
              <span>
                {showPassActive && (
                  <FaEye className="login-signup-icon" onClick={showHidePass} />
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
            value="Edit pass"
            className="login-signup-btn "
          />
        </form>
      </div>
    </div>
  );
};

export default Write;
