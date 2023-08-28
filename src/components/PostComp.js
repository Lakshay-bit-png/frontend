import React, { useState, useEffect } from "react";
import { getSpecificPost, likeOrDislikePost } from "../api/postRequest";
import { useNavigate } from "react-router-dom";
const PostComp = ({ userData, author, imageUrls, title, likes, _id, user }) => {
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState();
  const navigate = useNavigate();
  //   console.log(post);

  const openPost = () => {
    navigate(`/postsection/${_id}`);
  };

  const likethispost = async (event) => {
    setLiked(!liked);
    try {
      const { data } = await likeOrDislikePost(_id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getSpecificPost(_id);
        // console.log(data.result);
        setPost(data.result);
        setLiked(data.result.likes.includes(userData._id));
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [liked, _id]);

  return (
    <div className="post-1">
      <div onClick={openPost}>
        <div className="post-postedby">
          <img src="" />
          <div>
            <span style={{ fontWeight: "bold" }} className="posted-by-name">
              {author.firstname} {author.lastname}
            </span>
            <span style={{ fontSize: "12px" }} className="posted-by-brief">
              {author.isMentor ? "Mentor" : "Mentee"}
            </span>
          </div>
        </div>
        <p className="user-content-post">{title}</p>
        <div style={{ height: "40px" }}></div>
        {imageUrls.length ? (
          <img src={imageUrls[0]} className="img-posted" alt={title} />
        ) : (
          ""
        )}
      </div>
      <div className="reactions">
        <div className="like-count">
          <i
            style={{
              marginRight: "4px",
              fontSize: "25px",
              color: liked ? "rgb(16, 39, 111)" : "gray",
              cursor: "pointer",
            }}
            className="fa fa-thumbs-up"
            onClick={likethispost}
          ></i>
          {post && post.likes.length} likes
        </div>
        <div
          className="comments"
          onClick={() => {
            navigate(`/postsection/${_id}`);
          }}
        >
          <i
            class="fa fa-lg fa-solid fa-comment"
            style={{ marginRight: "4px" }}
          ></i>
          Comments
        </div>
      </div>
    </div>
  );
};

export default PostComp;
