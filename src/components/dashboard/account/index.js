import React, { useEffect, useState } from "react";
import linkedin from "../../images/linkedin.png";
import google from "../../images/google.png";
import Header1 from "../../Header";
import "./index.css"
import { Navigate, useNavigate } from "react-router-dom";
import Commondash from "../common";
import Topbar from "../topbar";
import { updateIsMentor } from "../../../api/userRequest";
import UPIicon from '../../images/UPI.png';

function Account({ userData, setProgress }) {
  /*---------LINKING ROUTES---------*/

  /*--------------------------------*/

  const navigate = useNavigate();
  const [email, setEmail] = useState(userData.email);
  const [whats, setWhats] = useState(userData.whatsappNumber);
  const [upi, setUpi] = useState(userData.upiId);

  useEffect(() => {
    // This function will run when the DOM content is loaded.
    var inp1 = document.querySelectorAll(".editable-input");
    for (var i = 0; i <= 3; i++) {
      inp1[i].disabled = true;
    }
  }, []);
  const enabledisableinput = async () => {
    var inp = document.querySelectorAll(".editable-input");

    if (inp[0].disabled) {
      for (var i = 0; i <= 3; i++) {
        inp[i].disabled = false;
      }
      document.querySelector(".edit-input").style.backgroundColor =
        "greenyellow";
      document.querySelector(".edit-input").style.color = "black";
      document.querySelector(".edit-input").textContent = "Save";
    } else {
      try {
        const request = {
          email: email,
          whatsappNumber: whats,
          upiId: upi,
        };
        setProgress(20);
        const { data } = await updateIsMentor(request);
        setProgress(100);

        console.log(data);
      } catch (error) {
        console.log(error);
        alert("Write correct credentials");
        setEmail(userData.email);
        setWhats(userData.whatsappNumber);
        setUpi(userData.upiId);
      }
      window.location.reload();
      for (var i = 0; i <= 3; i++) {
        inp[i].disabled = true;
      }
      document.querySelector(".edit-input").style.backgroundColor = "black";
      document.querySelector(".edit-input").style.color = "white";
      document.querySelector(".edit-input").textContent = "Edit";
    }
  };

  return (
    <>
      <div className="dash-main">
        <Commondash userData={ userData} />

        <div className="dash-right">
          <Topbar setProgress={setProgress}/>
          <div className="social-dash">
            <h1>Account </h1>
            <div className="social-details">
              <div className="linkedin-dash">
                <img src={linkedin} />
                <input
                  type="text"
                  placeholder="Link your LinkedIn"
                  className="editable-input"
                />
              </div>
              <div className="gmail-dash">
                <img src={google} />
                <input
                  type="text"
                  placeholder={email}
                  className="editable-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="phone-dash">
                <i className="fa fa-phone" />
                <input
                  type="text"
                  placeholder={whats}
                  className="editable-input"
                  onChange={(e) => setWhats(e.target.value)}
                />
              </div>
              <div className="upi-id-dash">
                <img src={UPIicon} alt="UPI" />
                <input
                  type="text"
                  placeholder={upi}
                  className="editable-input"
                  onChange={(e) => setUpi(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="editor-ids">
            <button className="edit-input" onClick={enabledisableinput}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
