import React, { useEffect, useState } from "react";
import user from "../images/user.png";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api/userRequest";
import { createChat } from "../../api/chatRequest";

function MyProfile({ userData, isMyProfile, myUser }) {
  const navigate = useNavigate();
  // console.log("my prof - user data", userData.linkedinId);

  const zoomInPic = () => {
    const dp = document.querySelector('.profile-img');
    dp.style.transform = "scale(5) translateX(6vw) translateY(2vh)"
    dp.style.zIndex = "1000000";
    setTimeout(() => {
      dp.style.transform = "scale(1)"
    }, 2000)
  }

  const goToProfile = () => {
    // navigate(`/profile/${userData._id}`);
    navigate(`/myaccount`);
  };
  const redirecttoslotbook=()=>{
    navigate('/books')
  }

  const creatingChat = async () => {
    try {
      const req = {
        senderId: myUser._id,
        receiverId: userData._id,
      };
      const { data } = await createChat(req);

      console.log(data);
    } catch (error) {
      console.log(error);
      alert("chat already exists");
    }
  };
  // console.log(myUser);
  myUser._id === userData._id ? (isMyProfile = true) : (isMyProfile = false);
  return (
    <>
      <div className="my-profile-landing">
        <div className="profile-landing-bg">
          <div className="profile-img" onClick={zoomInPic}>
            <img src={user} />
          </div>
        </div>
        <div className="brief">
          <div
            style={{ fontWeight: "bold" }}
            className="my-name"
            onClick={goToProfile}
          >
            {userData.firstname} <span> {userData.lastname}</span>
          </div>
          {!isMyProfile && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="follow-me" onClick={creatingChat}>
                Follow
              </button>
              {userData.isMentor && (
                <button className="book-me follow-me" onClick={redirecttoslotbook}>Book</button>
                )}
              {/* <div>Follow to chat!</div></> */}
            </div>
          )}
          <div className="det">
            <div style={{ fontWeight: "bold" }} className="prof-status">
              {userData.isMentor ? "Mentor" : "Mentee"}
            </div>
            <div className="profession">--{userData.jobTitle}</div>
          </div>
          <a href={`https://linkedin.com/in/${userData.linkedinId}`}><i class="fa fa-lg fa-brands fa-linkedin" style={{ cursor: "pointer" }}></i></a>
        </div>
      </div>
    </>
  );
}

export default MyProfile;