import React from "react";
import Common from "../common";
import MyProfile from "../myprof";
import user from "../../images/user.png";
import meet from "../../images/meet.jpeg";
import { useState, useEffect } from "react";
import {
  getSpecificPost,
  likeOrDislikePost,
  addCommentToPost,
  getCommentsForPost,
  deleteComment,
  getSpecificUser,
} from "../../../api/postRequest";
import { useNavigate } from "react-router-dom";

function Otherpost({ userData, setProgress }) {
  const postId = window.location.pathname.split("/")[2];
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  // const [userName, setUserName] = useState(null);

  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const goToProfile = () => {
    setProgress(30);
    navigate(`/profile/${post.author._id}`);
    setProgress(100);
  };
  const likethispost = async (event) => {
    setLiked(!liked);
    try {
      const { data } = await likeOrDislikePost(postId);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
    // if (event.target.style.color != "rgb(16, 39, 111)") {
    //     event.target.style.color = "rgb(16, 39, 111)";
    // } else {
    //     event.target.style.color = "gray";
    //     document.querySelector(".like-count").value -= 1;
    // }
  };

  const handleComments = async () => {
    try {
      setProgress(35);
      await addCommentToPost(postId, comment);
      setComment("");
      await fetchComments();
      setProgress(70);
      // await storeNames();
      // console.log(commentList);
      setProgress(100);
    } catch (err) {
      console.log("Unable to add comment", err);
    }
  };

  const delComm = async (commentId) => {
    try {
      setProgress(40);
      await deleteComment(commentId);
      setCommentList((prevCommentList) =>
      prevCommentList.filter((item) => item._id !== commentId)
      );
      setProgress(100);
    } catch (err) {
      console.log("unable to del comment ", err);
    }
  };

  // const fetchUserName = async (userId) => {
  //   try {
  //     const userData = await getSpecificUser(userId);
  //     const userName =
  //       userData.data.result.firstname + " " + userData.data.result.lastname;
  //     // setUserName(userName);
  //     return userName;
  //   } catch (err) {
  //     console.log("Unable to fetch user name ", err);
  //     return null;
  //   }
  // };

  // const storeNames = async () => {
  //   if (commentList && commentList.length > 0) {
  //     const userNamesPromises = commentList.map(async (item) => {
  //       const name = await fetchUserName(item.user); // Change 'item.user' to the appropriate property that holds the user ID in your comment object
  //       return { ...item, name };
  //     });

  //     const updatedCommentList = await Promise.all(userNamesPromises);
  //     setCommentList(updatedCommentList);
  //   }
  // };

  // const fetchComments = async () => {
  //   try {
  //     const data = await getCommentsForPost(postId);
  //     const commList = await data.data.result.comments;
  //     setCommentList(commList);
  //     // console.log(commList);
  //   } catch (err) {
  //     console.log("Unable to fetch comments", err);
  //   }
  // };

  const fetchComments = async () => {
    try {
      const data = await getCommentsForPost(postId);
      const commData = data.data.result;
      setCommentList(commData);
      // console.log(commData);
      // console.log(commentList);
    }
    catch(err) {
      console.log("Unable to get comments ", err);
    }
  }

  useEffect(() => {
    // (async () => {
    //   // await storeNames();
    //   await fetchComments();
    // })();
    // console.log(commentList);
    fetchComments();
  }, []);

  const onChange = (e) => {
    setComment(e.target.value);
  };

  // define useState to get the post with this postId from backend
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getSpecificPost(postId);
        console.log(data.result);
        setPost(data.result);
        setLiked(data.result.likes.includes(userData._id));
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [postId, liked, userData._id]);
  // console.log(post);
  return (
    <>
      <Common setProgress={setProgress} />
      <div className="main-content-landing">
        {post && <MyProfile userData={post.author} myUser={userData} />}
        {post && (
          <div className="posting-on-landing">
            <div className="people-post">
              <div className="post-1">
                <div className="post-postedby" onClick={goToProfile}>
                  <img src={post.author.profilePicUrl} alt={post.title} />
                  <div>
                    <span
                      style={{ fontWeight: "bold" }}
                      className="posted-by-name"
                    >
                      {post.author.firstname} {post.author.lastname}
                    </span>
                    <span
                      style={{ fontSize: "12px" }}
                      className="posted-by-brief"
                    >
                      {post.author.isMentor ? "Mentor" : "Mentee"}
                    </span>
                  </div>
                </div>
                <img
                  src={post.imageUrls[0]}
                  className="img-posted"
                  alt={post.title}
                />

                <div className="reactions">
                  <i
                    style={{
                      fontSize: "25px",
                      color: liked ? "rgb(16, 39, 111)" : "gray",
                      cursor: "pointer",
                    }}
                    className="fa fa-thumbs-up"
                    onClick={likethispost}
                  ></i>
                  <div className="like-count">{post.likes.length} likes</div>
                  <div className="comments">
                    <i
                      class="fa fa-lg fa-solid fa-comment"
                      style={{ marginRight: "4px" }}
                    ></i>
                    Comments
                  </div>
                </div>
                <div className="displayComments">
                  <input
                    type="text"
                    value={comment}
                    onChange={onChange}
                    placeholder="Comment here..."
                  />
                  <button onClick={handleComments}>Post</button>
                </div>
                <div className="comments-container">
                  <h3>Comments</h3>
                  {commentList.length === 0 ? "No comments yet" : ""}
                  {commentList &&
                    commentList.map((item) => {
                      return (
                        <div key={item._id}>
                          <div style={{ marginBottom: "5px" }}>
                            <b>{item.user.firstname + " " + item.user.lastname}</b>
                          </div>
                          {item.comment}
                          {userData._id === item.user._id && (
                            <i
                              onClick={() => delComm(item._id)}
                              className="fa fa-lg fa-solid fa-trash"
                            ></i>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Otherpost;
