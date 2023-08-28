import React, { useState } from "react";
import Common from "../common";
import MyProfile from "../myprof";
import user from "../../images/user.png";
import "./notification.css";
import NotifyBar from "./notifybar";

// function Notify({ userData }) {
const Notification = () => {
  // Sample data, replace with actual data
  const userData = { _id: "123", firstname: "John", lastname: "Doe" };
  const isMyProfile = true; // Or false
  const myUser = { _id: "12345" };

  const [selectedButton, setSelectedButton] = useState("All"); // Initial selected button

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <Common />
      <div className="notify">
        <h1>Notifications</h1>
        <div className="notify-btns">
          <button
            className={selectedButton === "All" ? "selected" : ""}
            onClick={() => handleButtonClick("All")}
          >
            All
          </button>
          <button
            className={selectedButton === "New" ? "selected" : ""}
            onClick={() => handleButtonClick("New")}
          >
            New
          </button>
          <button
            className={selectedButton === "Read" ? "selected" : ""}
            onClick={() => handleButtonClick("Read")}
          >
            Read
          </button>
          <button
            className={selectedButton === "Primary" ? "selected" : ""}
            onClick={() => handleButtonClick("Primary")}
          >
            Primary
          </button>
        </div>
      </div>
      {/* <MyProfile
        userData={userData}
        isMyProfile={isMyProfile}
        myUser={myUser}
      /> */}
      <NotifyBar/>
    </>
  );
};
// }

export default Notification;
