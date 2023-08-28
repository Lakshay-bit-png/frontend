import React, { useEffect, useState } from "react";
import { findUser } from "../api/userRequest";

const Conversation = ({ data, currentUser }) => {
  const [userData, setUserData] = useState(null);

  //   console.log(data);
  useEffect(() => {
    const otherUserId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await findUser(otherUserId);
        setUserData(data.result);
        // console.log(data.result);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, []);
  return (
    <div>
      {userData && (
        <div>
          {" "}
          <div className="user-section">
            <img src="" />
            <div className="friend-name">
              {userData.firstname} <span> {userData.lastname}</span>
            </div>
          </div>
          <div className="partition-users"></div>
        </div>
      )}
    </div>
  );
};

export default Conversation;

//adding conversation
