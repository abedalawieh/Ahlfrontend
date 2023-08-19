import { useEffect, useState } from "react";
import axios from "axios";
import {
  BsClipboardPlusFill,
  BsClipboardXFill,
  BsFillPersonFill,
  BsFillPersonVcardFill,
  BsCoin,
  BsFillFilePostFill,
} from "react-icons/bs";

//importing sliding animation
import Aos from "aos";

//importing icons
import "./dashboard.css";
import { MdAutoDelete } from "react-icons/md";
import { ImLocation } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { MdPending } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FcCustomerSupport } from "react-icons/fc";

//importing components
import Rating from "../Rating/Rating";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

function Dashboard() {
  const [NbPosts, setNbPosts] = useState([]);
  const [Nbusers, setNbusers] = useState([]);
  const [show, setshow] = useState(false);
  const [StRequest, setStRequest] = useState([]);
  const [posts, setPosts] = useState([]);
  const [provider, setProvider] = useState([]);
  const [Complaints, setComplaints] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
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
  const countpending = 0;
  const fetchUserData1 = () => {
    fetch("https://ahlbackendd.onrender.com/api/posts/site")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data.data);
      });
  };
  const fetchUserData2 = () => {
    fetch("https://ahlbackendd.onrender.com/api/posts/provider")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProvider(data);
      });
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  useEffect(() => {
    fetchUserData1();
    fetchUserData2();
  }, []);

  const fetchUsernb = () => {
    fetch("https://ahlbackendd.onrender.com/api/posts/nbusers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNbusers(data);
      });
  };
  const fetchUserData = () => {
    fetch("https://ahlbackendd.onrender.com/api/posts/nbp")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNbPosts(data);
      });
  };

  const fetchreq = () => {
    fetch("https://ahlbackendd.onrender.com/api/posts/Strequest")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStRequest(data);
      });
  };

  const fetchComplaints = () => {
    fetch("https://ahlbackendd.onrender.com/api/posts/Complaints")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setComplaints(data);
      });
  };

  useEffect(() => {
    fetchUserData();
    fetchreq();
    fetchUsernb();
    fetchComplaints();
  }, []);
  const accept = async (id) => {
    await axios.put(`/posts/acc/${id}`, {
      value: 1,
    });
    window.location.reload();
  };
  const reject = async (id) => {
    await axios.put(`/posts/rej/${id}`, {
      value: -1,
    });
    window.location.reload();
  };
  const Delete = async (id) => {
    await axios.delete(`/posts/delete/${id}`, {});
    window.location.reload();
  };
  const deleteSP = async (id) => {
    await axios.delete(`/posts/deleteSP/${id}`, {});
    window.location.reload();
  };
  const showt = () => {
    setshow(!show);
  };

  return (
    <>
      <h1 className="h3 mb-3" id="dash">
        <strong>Analytics</strong>
        <span> Dashboard</span>
      </h1>
      <div className="row">
        <div className=" d-flex">
          <div className="w-100">
            <div className="row">
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title">Site providers</h5>
                      </div>

                      <div className="col-auto text-primary font">
                        <BsFillPersonVcardFill className="dashboard-icon" />
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">2.382</h1>
                    <div className="mb-0"></div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title">Users</h5>
                      </div>

                      <div className="col-auto text-primary font ">
                        <BsFillPersonFill className="dashboard-icon" />
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">{Nbusers.toString()}</h1>
                    <div className="mb-0"></div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title">Posts</h5>
                      </div>

                      <div className="col-auto text-primary font">
                        <BsFillFilePostFill className="dashboard-icon" />
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">{NbPosts.toString()}</h1>
                    <div className="mb-0"></div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title">Bookings</h5>
                      </div>

                      <div className="col-auto font text-primary">
                        <BsCoin className="dashboard-icon" />
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">64</h1>
                    <div className="mb-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="secTitle " id="accepted">
        <h3 data-aos="fade-right" className="title" style={{ color: "black" }}>
          Accepted Posts
          <TiTick className="icon accepted-posts-icon" />
        </h3>
      </div>
      <div className="row accepted-posts-table">
        <div className="col-12 col-lg-12 col-xxl-12 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Latest Projects</h5>
            </div>
            <table className="table table-hover my-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Site provider</th>
                  <th className="d-none d-xl-table-cell">Category</th>
                  <th className="d-none d-xl-table-cell">Main image</th>

                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {StRequest.map((req) => {
                  return (
                    <tr>
                      <td style={{ width: "15vw" }}> {req.name}</td>
                      <td>{req.username}</td>
                      <td className="d-none d-xl-table-cell">{req.cat}</td>
                      <td className="d-none d-xl-table-cell">
                        {" "}
                        <div className="imagediv">
                          <img src={`../upload/${req.img}`} alt={req.tile} />
                        </div>
                      </td>

                      <td>
                        {" "}
                        <button
                          className="btn icon-reject"
                          onClick={() => reject(req.site_id)}
                        >
                          Reject <BsClipboardXFill className="icon" />
                        </button>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="secTitle site-providers-title" id="SP">
        <h3 data-aos="fade-right" className="title">
          Site Providers
          <BsFillPersonVcardFill className="icon site-providers-icon" />
        </h3>
      </div>
      <div className="row site-providers-table">
        <div className="col-12 col-lg-12 col-xxl-12 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Latest Site Providers</h5>
            </div>
            <table className="table table-hover my-0">
              <thead>
                <tr>
                  <th>Username</th>

                  <th className="d-none d-xl-table-cell">Email</th>
                  <th className="d-none d-xl-table-cell">Phone</th>

                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {provider.map((req) => {
                  return (
                    <tr>
                      <td style={{ width: "15vw" }}> {req.username}</td>

                      <td className="d-none d-xl-table-cell">{req.email}</td>
                      <td className="d-none d-xl-table-cell">{req.phone}</td>

                      <td>
                        {" "}
                        <button
                          className="btn icon-reject"
                          onClick={() => deleteSP(req.site_provider_id)}
                        >
                          Delete <BsClipboardXFill className="icon" />
                        </button>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="guest-main pending-deleted-posts">
        <div className="secTitle " id="pending">
          <h3
            data-aos="fade-right"
            className="title"
            style={{ color: "black" }}
          >
            Pending Posts
            <MdPending className="icon site-providers-icon" />
          </h3>
        </div>
        <div className="secContent grid width">
          <Carousel responsive={responsive}>
            {posts.map((posts) => {
              if (posts.status == 0) {
                return (
                  <div
                    data-aos="fade-up"
                    className="singleDestination"
                    key={posts.site_ID}
                  >
                    <div className="imgDiv">
                      <img src={`../upload/${posts.img}`} alt={posts.tile} />
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
                      <div className="admin-buttons-div">
                        <button
                          className="btn flex admin-accept-icon"
                          onClick={() => accept(posts.site_id)}
                        >
                          Accept
                          <BsClipboardPlusFill className="icon" />
                        </button>
                        <button
                          className="btn flex icon-posts"
                          onClick={() => reject(posts.site_id)}
                        >
                          Reject <BsClipboardXFill className="icon " />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </Carousel>
        </div>
      </div>
      <div className="guest-main pending-deleted-posts">
        <div className="secTitle" id="deleted">
          <h3 data-aos="fade-right" className="title" style={{ color: "red" }}>
            Deleted Posts
            <button onClick={showt} className="deleted-posts-icon">
              {" "}
              <MdAutoDelete className="icon" />
            </button>
          </h3>
        </div>
        {show && (
          <div className="secContent grid width">
            <Carousel responsive={responsive}>
              {posts.map((posts) => {
                if (posts.status == -1) {
                  return (
                    <div
                      data-aos="fade-up"
                      className="singleDestination"
                      key={posts.site_ID}
                    >
                      <div className="imgDiv">
                        <img src={`../upload/${posts.img}`} alt={posts.tile} />
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
                            {getText(
                              posts.description.substring(0, 100) + "..."
                            )}
                          </p>
                        </div>
                        <div className="admin-buttons-div">
                          <button
                            className="btn flex admin-accept-icon"
                            onClick={() => accept(posts.site_id)}
                          >
                            Accept <BsClipboardPlusFill className="icon" />
                          </button>
                          <button
                            className="btn flex icon-posts"
                            onClick={() => Delete(posts.site_id)}
                          >
                            Delete <BsClipboardXFill className="icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </Carousel>
          </div>
        )}
      </div>
      <div className="secTitle site-providers-title" id="customerService">
        <h3 data-aos="fade-right" className="title">
          Customer Service
          <FcCustomerSupport className="icon site-providers-icon" />
        </h3>
      </div>
      <div className="row site-providers-table">
        <div className="col-12 col-lg-12 col-xxl-12 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Latest Inquiries</h5>
            </div>
            <table className="table table-hover my-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="d-none d-xl-table-cell">Email</th>
                  <th className="d-none d-xl-table-cell">Phone</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {Complaints.map((req) => {
                  return (
                    <tr>
                      <td style={{ width: "15vw" }}>
                        {" "}
                        {req.firstname + " " + req.lastname}
                      </td>

                      <td className="d-none d-xl-table-cell">{req.email}</td>
                      <td className="d-none d-xl-table-cell">{req.phone}</td>
                      <td className="d-none d-xl-table-cell">{req.message}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="secTitle ">
        <h3 data-aos="fade-right" className="title" style={{ color: "black" }}>
          Add a Site Provider
          <AiOutlineUsergroupAdd className="icon site-providers-icon" />
        </h3>
      </div>
    </>
  );
}
export default Dashboard;
