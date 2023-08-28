import React, { useEffect, useState } from "react";
import { findUser } from "../api/userRequest";
import { addMessage, getMessages } from "../api/messageRequest";
import { format } from "timeago.js";

const Chatbox = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const otherUserId = chat?.members?.find((id) => id !== currentUser);

    // console.log(otherUserId);

    const getUserData = async () => {
      try {
        const { data } = await findUser(otherUserId);
        setUserData(data.result);
      } catch (e) {
        console.log(e);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  const handleChange = (event) => {
    const newMessageValue = event.target.value;
    setNewMessage(newMessageValue);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
      // chatId: "64db7e1e8bb983fa766a79a5",
    };

    // send message to database

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (e) {
      console.log(e);
    }

    // send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);

    setSendMessage({ ...message, receiverId });
  };

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        console.log(data);
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
    if (chat !== null) fetchMessages();
  }, [chat]);
  return (
    <div className="chatting">
      <div className="chat-user-details">
        {chat ? <img src="" className="chat-user-img"></img> : <div></div>}
        {userData && (
          <div className="chat-user-name">
            {" "}
            {userData.firstname} <span>{userData.lastname}</span>
          </div>
        )}
      </div>
      {chat ? (
        <div className="chatbox-messages">
          {" "}
          {messages ? (
            messages.map((message) => (
              <div
                className={`${
                  message.senderId === currentUser
                    ? "message-right"
                    : "message-left"
                }`}
              >
                <p
                  style={{
                    background: "rgb(7, 63, 137)",
                    padding: "4px 8px 4px 8px",
                    borderRadius: "25px 25px 35px 0px",
                  }}
                >
                  {message.text}
                </p>

                <span style={{ fontSize: "12px", color: "gray" }}>
                  {format(message.createdAt)}
                </span>
              </div>
            ))
          ) : (
            <span>Start Typing</span>
          )}
        </div>
      ) : (
        <div
          className="chatbox-messages"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
          }}
        >
          <p>Click on chat to start conversation</p>
        </div>
      )}
      <div className="message-send-bar">
        {chat && (
          <input
            placeholder="Enter Your Message"
            value={newMessage}
            onChange={handleChange}
            className="message-tobe-sent"
          />
        )}
        {chat ? (
          <button className="send-btn" onClick={handleSend}>
            Send
          </button>
        ) : (
          <div>Please Select a User to Chat with!!</div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;
