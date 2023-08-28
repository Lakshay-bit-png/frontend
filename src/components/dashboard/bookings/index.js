import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import Commondash from "../common";
import Topbar from "../topbar";

function Bookings({ userData }) {
    /*If user opened navbar mob and didn't closed it*/

    /*------------------------------*/
    const navigate = useNavigate();
    const redirecttomyslots = () => {
        navigate("/mySlots");
    };
    const redirecttomyearnings = () => {
        navigate("/myearnings");
    };
    const redirecttomybookings = () => {
        navigate("/mybookings");
    };
    const redirecttomyaccount = () => {
        navigate("/myaccount");
    };
    const redirectbacktohome = () => {
        navigate("/homepage");
    };

    useEffect(() => {
        // This code will run when the component mounts (DOM content is loaded)
        document.querySelector(".side-nav-mob").classList.add("display");

        // You can put your specific JavaScript code here
        // For example, you can interact with the DOM or fetch data
    }, []);
    const displaynavmob = () => {
        var x = document.querySelector(".side-nav-mob");
        if (x.classList[1]) {
            x.classList.remove("display");
        } else {
            x.classList.add("display");
        }
    };

    return (
        <>
            <div className="dash-main">
                <Commondash userData={userData} />

                <div className="dash-right">
                    <Topbar />
                    <div className="session-dash-info">
                        <div className="heading-session-status">
                            <div>Upcoming</div>
                            <div>Completed</div>
                        </div>

                        <div className="partition-session"></div>
                        <div className="session-list-dash">
                            <div className="individual-session">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img src={logo} />
                                    <span>Timing: 9:00-10:00</span>
                                </div>
                                <span>Number of Bookings :12</span>
                            </div>
                            <div className="individual-session">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img src={logo} />
                                    <span>Timing: 9:00-10:00</span>
                                </div>
                                <span>Number of Bookings :12</span>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Bookings;
