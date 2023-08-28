import React from "react";
import { useNavigate } from "react-router-dom";

const NotifyBar = ({ author, title, _id }) => {
  const navigate = useNavigate();

  const openPost = () => {
    navigate(`/postsection/${_id}`);
  };

  return (
    <div className="post-notification">
      <div onClick={openPost} className="notification-content">
        <div className="notification-header">
          <img src="" alt="" />
          <div>
            {/* <span style={{ fontWeight: "bold" }}>
              {author.firstname} {author.lastname}
            </span>
            <span className="notification-info">
              {author.isMentor ? "Mentor" : "Mentee"}
            </span> */}
          </div>
        </div>
        <div onClick={openPost}>
        <div className="post-postedby">
          {/* <img src="" /> */}
          {/* <div>
            <span style={{ fontWeight: "bold" }} className="posted-by-name">
              {author.firstname} {author.lastname}
            </span>
            <span style={{ fontSize: "12px" }} className="posted-by-brief">
              {author.isMentor ? "Mentor" : "Mentee"}
            </span>
          </div> */}
        </div>
        <p className="user-content-post">{title}</p>
        
      </div>
        <p className="user-content-post">{"Kartik was here "}</p>
      </div>
    </div>
  );
};

export default NotifyBar;
