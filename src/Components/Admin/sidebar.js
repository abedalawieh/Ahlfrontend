import React from "react";

//importing styles
import "./sidebar.css";

//importing icons
import { MdPendingActions } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar ">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
          <span className="align-middle">ADMIN KIT</span>
        </a>
        <div className="admin-hr"></div>

        <ul className="sidebar-nav">
          <li className="sidebar-header">
            Actions
            <MdPendingActions className="actions-icon" />
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="#dash">
              <i className="align-middle" data-feather="sliders"></i>{" "}
              <span className="align-middle ">Dashboard</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="#accepted">
              <i className="align-middle" data-feather="user"></i>{" "}
              <span className="align-middle">Accepted</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="#SP">
              <i className="align-middle" data-feather="log-in"></i>{" "}
              <span className="align-middle">Site Providers</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="#pending">
              <i className="align-middle" data-feather="user-plus"></i>{" "}
              <span className="align-middle">Pending</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="#deleted">
              <i className="align-middle" data-feather="book"></i>{" "}
              <span className="align-middle">Deleted</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="#customerService">
              <i className="align-middle" data-feather="square"></i>{" "}
              <span className="align-middle">Customer Service</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="#addSP">
              <i className="align-middle" data-feather="square"></i>{" "}
              <span className="align-middle">Add Site Provider</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Sidebar;
