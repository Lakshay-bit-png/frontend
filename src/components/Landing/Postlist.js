import React, { useEffect, useState, useRef } from "react";
import meet from "../images/meet.jpeg";
import Header1 from "../Header/index";
import index from "./Post/index.css";
import userImage from "../images/user.png";
import {
    createPost,
    getAllPost,
    getPostFromSpecificUser,
} from "../../api/postRequest";
import PostComp from "../PostComp";
import axios from "axios";
const API = axios.create({ baseURL: "https://skillop-back.onrender.com" });

function Postlist({ userData, displaycreatepost, user, setProgress }) {
    const userId = window.location.pathname.split("/")[2];
    // console.log(userId);
    const [selectedFile, setSelectedFile] = useState(null);
    // console.log(selectedFile, "who");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files);
        console.log(selectedFile, "hello");
    };
    const hidepop = () => {
        document.querySelector(".photo-popup").style.display = "none";
    };

    const handleUpload = () => {
        document.querySelector(".photo-popup").style.display = "flex";
    };
    const [inputValue, setInputValue] = useState("");
    const [postData, setPostData] = useState("");
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    const likethispost = (event) => {
        if (event.target.style.color != "rgb(16, 39, 111)") {
            event.target.style.color = "rgb(16, 39, 111)";
        } else {
            event.target.style.color = "gray";
            document.querySelector(".like-count").value -= 1;
        }
    };

    const creatingPost = async () => {
        // Commented by Swaroop
        // try {
        //     const req = {
        //         title: inputValue,
        //     };
        //     const formData = new FormData();
        //     if (selectedFile) {
        //         formData.append("postImages", selectedFile, selectedFile.name);
        //     }
        //     console.log(selectedFile, inputValue, selectedFile.name);
        //     formData.append("title", inputValue);
        //     console.log(formData);
        //     const { data } = await createPost(formData);
        //     console.log(data);
        //     // const { data } = await createPost(req);
        //     // window.location.reload();
        // } catch (error) {
        //     console.log(error);
        // }
        // If any problem uncomment this part and comment the below part
        try {
            const formData = new FormData();
            if (selectedFile)
                for (let i = 0; i < selectedFile.length; i++) {
                    formData.append("postImages", selectedFile[i]);
                }
            formData.append("title", inputValue);
            console.log(formData);
            const createPost = (data) => {
                const token = localStorage.getItem("skilloptoken");

                const config = {
                    headers: {
                        Authorization: token,
                    },
                    withCredentials: true,
                };
                return API.post(`/api/post/create`, data, config);
            };
            setProgress(30);
            const data = await createPost(formData);
            setProgress(70);
            console.log(data);
            window.location.reload();
            setProgress(100);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const gettingAllPost = async () => {
            try {
                const { data } = await getAllPost();
                setPostData(data.result);
                // console.log(data.result);
            } catch (error) {
                console.log(error);
            }
        };
        const getPostsFromUser = async () => {
            try {
                const { data } = await getPostFromSpecificUser(userId);
                setPostData(data.result);
                console.log(data.result);
            } catch (error) {
                console.log(error);
            }
        };
        if (userId) getPostsFromUser();
        else gettingAllPost();
    }, []);

    return (
        <>
            <div className="posting-on-landing">
                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        zIndex: "20",
                        width: "90%",
                        height: "180px",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px",
                        display: "none",
                        justifyContent: "center",
                    }}
                    className="photo-popup"
                >
                    <input
                        type="file"
                        name="postImages"
                        multiple
                        onChange={(e) => setSelectedFile(e.target.files)}
                    />
                    <button
                        className="proceed"
                        onClick={hidepop}
                        style={{
                            border: "none",
                            padding: "5px 10px 5px 10px",
                            background: "black",
                            color: "white",
                            borderRadius: "10px",
                            cursor: "pointer",
                        }}
                    >
                        Proceed
                    </button>
                </div>
                {displaycreatepost && (
                    <div className="user-new-post">
                        <div className="user-post-head">
                            {/* <div
                                className={
                                    inputValue.length >= 1
                                        ? "post-this active"
                                        : "post-this not-active"
                                }
                            >
                                Post
                            </div> */}
                            <img src={userImage} />
                            <input
                                className="content-user-post"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="What are you Thinking..... ?"
                            />
                        </div>
                        <div className="upload-section">
                            <div
                                style={{}}
                                className="photo-upload"
                                onClick={handleUpload}
                            >
                                Photo
                            </div>

                            <div
                                style={{}}
                                className="video-upload"
                            >
                                Video
                            </div>
                            {/* <div
                                style={{ background: "rgba(220, 255, 146, 1)" }}
                                className=""
                            ></div> */}

                            <button
                                onClick={creatingPost}
                                disabled={inputValue.length < 1}
                                // className={
                                //     inputValue.length >= 1
                                //         ? "create-new-post active"
                                //         : "create-new-post not-active"
                                // }
                                className="create-new-post"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                )}
                <div className="people-post">
                    {postData &&
                        postData
                            .slice()
                            .reverse()
                            .map((val, i) => (
                                <PostComp
                                    {...val}
                                    userData={userData}
                                    user={user}
                                />
                            ))}
                </div>
            </div>
        </>
    );
}

export default Postlist;
