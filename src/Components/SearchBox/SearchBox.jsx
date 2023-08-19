import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./searchbox.css";
import { RecoveryContext } from "../../App";
import { FcSearch } from "react-icons/fc";

const SearchBox = () => {
  const navigate = useNavigate();

  const { keyword, setKeyword } = useContext(RecoveryContext);
  return (
    <Form className="search-div" inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Destination"
        className="search-text"
      ></Form.Control>
      <FcSearch className="nav-search-icon" />
    </Form>
  );
};

export default SearchBox;
