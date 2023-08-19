import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import "react-quill/dist/quill.snow.css";

import "./comments.css";
import axios from "axios";
import { RecoveryContext } from "../../App";

import { Row, Col, Image, Card, Button, Form } from "react-bootstrap";

const Comments = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { setEmail, email, setOTP, recov, setrecov, userdata, setUserdata } =
    useContext(RecoveryContext);

  //   const fetchPostData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8800/api/posts/site/${id}`
  //       );
  //       const data = response.data;

  //       if (data) {
  //         setPost(data.data);
  //         console.log(data);
  //       } else {
  //         response.send("NoProduct");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const getText = (html) => {
  //     const doc = new DOMParser().parseFromString(html, "text/html");
  //     return doc.body.textContent;
  //   };

  //   console.log(post.site_id);
  //   useEffect(() => {
  //     const user = JSON.parse(sessionStorage.getItem("data"));
  //     console.log(user);
  //     if (user) {
  //       setUserdata(user);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     fetchPostData();
  //   }, [id]);

  //   console.log(post.name);
  const [comments, setComments] = useState([]);
  const [file, setFile] = useState(null);

  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(1); // hardcoded for simplicity, this should be dynamic based on the user
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const addComment = async () => {
    const imgUrl = await upload();

    await axios.post("https://ahlbackendd.onrender.com/site/addcomment", {
      text: comment,
      commentmedia: file ? imgUrl : "Null",
      postedBy: userdata.username,
      user_id: userdata.user_id,
      site_id: post.site_id,
    });
    setComment("");
    setFile(null);
  };
  useEffect(() => {
    fetchComments(post.site_id); // Pass the siteId to the fetchComments function
  }, [post.site_id]); // Depend on siteId, so that when it changes, fetchComments is called

  const fetchComments = async (siteId) => {
    const response = await axios.get(
      `https://ahlbackendd.onrender.com/site/comments/${post.site_id}`
    );
    setComments(response.data);
  };

  return (
    <div>
      <>
        {comments.map((comment) => (
          <Card className="mb-3" key={comment.id}>
            <Card.Body>
              <Row>
                <Col md={1}>
                  <Image src="/path/to/profile/picture" roundedCircle />
                </Col>
                <Col md={10}>
                  <Card.Title>
                    <strong>{comment.postedBy}</strong> (Posted on:{" "}
                    {new Date(comment.createdAt).toLocaleString()}):
                  </Card.Title>
                  <Card.Text>{comment.text}</Card.Text>
                  <Image
                    src={comment.commentmedia}
                    alt="Comment image"
                    className="mt-3"
                    style={{ maxWidth: "100%" }}
                  />
                </Col>
                <Col md={1} className="text-right">
                  <Button variant="danger" className="mb-2">
                    Delete
                  </Button>
                  <Button variant="primary">Upload</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}

        <div className="mt-4">
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter comment"
              />
              <Form.Group>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
            </Form.Group>

            <Button variant="primary" onClick={addComment}>
              Add Comment
            </Button>
          </Form>
        </div>
      </>
    </div>
  );
};

export default Comments;
