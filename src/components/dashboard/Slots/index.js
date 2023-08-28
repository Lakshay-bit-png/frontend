import React, { useEffect, useRef } from "react";
import Header1 from "../../Header";
import "./index.css";
import rect from "../../images/rect.png";
import logo from "../../images/logo.png";
// import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Commondash from "../common";
import Topbar from "../topbar";
import { getActualAvail, postSlot } from "../../../api/slotsRequest";
import { useState } from "react";

function Dashboard({ userData }) {
  const targetref = useRef(null);
  const [actualAvail, setActualAvail] = useState({});
  const [avail, setAvail] = useState(
    userData.mentor ? userData.mentor.actualAvailability : {}
  );
  console.log(avail);
  const getSlots = async () => {
    try {
      const { data } = await getActualAvail();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getSlots = async () => {
      try {
        const { data } = await getActualAvail();
        setActualAvail(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getSlots();
  }, []);
  // console.log(avail);
  useEffect(() => {
    function handleClickOutside2(event) {
      if (targetref.current && !targetref.current.contains(event.target)) {
        // This condition checks if the clicked element is not within the target div
        // Place your function code here
        document.querySelector(".slot-pop").classList.add("hideelem");
      }
    }

    document.addEventListener("click", handleClickOutside2);

    return () => {
      document.removeEventListener("click", handleClickOutside2);
    };
  }, []);

  var abled = 1;
  const blockentry = (event) => {
    // if (event.target.checked) {
    //     document.getElementById(
    //         event.target.value + "-start"
    //     ).disabled = false;
    //     document.getElementById(
    //         event.target.value + "-end"
    //     ).disabled = false;
    //     abled = 0;
    // } else {
    //     document.getElementById(
    //         event.target.value + "-start"
    //     ).disabled = true;
    //     document.getElementById(
    //         event.target.value + "-end"
    //     ).disabled = true;
    //     abled = 1;
    // }
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
  const showslotlist = () => {
    document.querySelector(".slot-pop").classList.remove("hideelem");
    document.querySelector(".slot-pop").style.backdropFilter = "blur(5px)";
  };
  const AddSlot = async () => {
    try {
      console.log(avail);
      const { data } = await postSlot({
        actualAvailability: JSON.stringify(avail),
      });

      console.log(data.message);
    } catch (error) {
      console.log(error); // toast it  error.response.data.message
    }
  };
  // AddSlot();
  const closeit = () => {
    document.querySelector(".slot-pop").classList.add("hideelem");
  };
  const addButton = (day) => {
    // if (abled === 1) {
    //     console.log("select the day first");
    // } else {
    // avail[day].push({ s: "", e: "" });
    const s = document.getElementById(day + "-start").value;
    const e = document.getElementById(day + "-end").value;

    var slot = document.createElement("div");
    slot.textContent = s + " " + " " + e;
    document.querySelector("." + day).appendChild(slot);
    var h = document.querySelector("." + day).querySelector("h6");
    if (h) {
      h.parentNode.removeChild(h);
    }
    console.log(s, e);
    let xcvn = avail;
    if (!xcvn) xcvn = {};
    if (!xcvn[day]) xcvn[day] = [];
    xcvn[day].push({
      // remove semicolon from the s

      s:
        s.replace(/:/g, "").length === 3
          ? "0" + s.replace(/:/g, "")
          : s.replace(/:/g, ""),
      e:
        e.replace(/:/g, "").length === 3
          ? "0" + e.replace(/:/g, "")
          : e.replace(/:/g, ""),
    });
    // let x = "8:00"
    // // remove semicolon from x
    // x = x.replace(/:/g, "");
    setAvail(xcvn);
    // abled = 1;
    console.log(avail);
    // }
  };
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <>
      <div className="slot-pop hideelem">
        <div className="popup-of-slots">
          <div className="cross" onClick={closeit}>
            <div className="line31"></div>
            <div className="line32"></div>
          </div>
          <div className="all-slots">
            {days.map((day) => (
              <>
                <div className={day}>
                  <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                  <br></br>
                  {actualAvail[day] && actualAvail[day].length !== 0 ? (
                    actualAvail[day].map((slot, index) => {
                      // console.log(slot);
                      return (
                        <div key={index}>
                          {JSON.stringify(slot.s).length === 3
                            ? JSON.stringify(slot.s).slice(0, 1) +
                              ":" +
                              JSON.stringify(slot.s).slice(1, 3)
                            : JSON.stringify(slot.s).slice(0, 2) +
                              ":" +
                              JSON.stringify(slot.s).slice(2, 4)}{" "}
                          {JSON.stringify(slot.e).length === 3
                            ? JSON.stringify(slot.e).slice(0, 1) +
                              ":" +
                              JSON.stringify(slot.e).slice(1, 3)
                            : JSON.stringify(slot.e).slice(0, 2) +
                              ":" +
                              JSON.stringify(slot.e).slice(2, 4)}
                        </div>
                      );
                    })
                  ) : (
                    <h6>----------------(No slots To show)--------------- </h6>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="dash-main">
        <Commondash userData={userData} />

        <div className="dash-right">
          <Topbar />
          <div className="header-dash">
            LET YOUR PEER KNOW YOUR AVAILABILITY
          </div>
          <div className="schedules-dash">
            <div className="buttons-dash">
              <button className="today">Today</button>
              <button className="show-slot-list" onClick={showslotlist}>
                View Slots
              </button>
              <div className="btns-dash">
                <button>On Date </button>
                <button>Month</button>
                <button>23</button>
              </div>
            </div>

            <div className="slot-dash">
              <div className="days-dash">
                <div className="days">
                  <input
                    type="checkbox"
                    id="MONDAY"
                    value="monday"
                    onChange={blockentry}
                  />
                  <label htmlFor="MONDAY">MONDAY</label>
                </div>
                <div className="days-partition"></div>
                <div className="days">
                  <input
                    type="checkbox"
                    id="TUESDAY"
                    value="tuesday"
                    onChange={blockentry}
                  />
                  <label htmlFor="TUESDAY">TUESDAY</label>
                </div>
                <div className="days-partition"></div>
                <div className="days">
                  <input
                    type="checkbox"
                    id="WEDNESDAY"
                    value="wednesday"
                    onChange={blockentry}
                  />
                  <label htmlFor="WEDNESDAY">WEDNESDAY</label>
                </div>
                <div className="days-partition"></div>
                <div className="days">
                  <input
                    type="checkbox"
                    id="THURSDAY"
                    value="thursday"
                    onChange={blockentry}
                  />
                  <label htmlFor="THURSDAY">THURSDAY</label>
                </div>
                <div className="days-partition"></div>
                <div className="days">
                  <input
                    type="checkbox"
                    id="FRIDAY"
                    value="friday"
                    onChange={blockentry}
                  />
                  <label htmlFor="FRIDAY">FRIDAY</label>
                </div>
                <div className="days-partition"></div>
                <div className="days">
                  <input
                    type="checkbox"
                    id="SATURDAY"
                    value="saturday"
                    onChange={blockentry}
                  />
                  <label htmlFor="SATURDAY">SATURDAY</label>
                </div>
                <div className="days-partition"></div>
                <div className="days">
                  <input
                    type="checkbox"
                    id="SUNDAY"
                    value="sunday"
                    onChange={blockentry}
                  />
                  <label htmlFor="SUNDAY">SUNDAY</label>
                </div>
                <div className="days-partition"></div>
              </div>
              <div className="slots-dash">
                <div className="slot-1">
                  <select id="monday-start">
                    <option value="8:00">8:00</option>
                    <option value="8:30">8:30</option>
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                  </select>
                  <select id="monday-end">
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                    <option value="24:00">24:00</option>
                  </select>
                  <button
                    className="pushslot"
                    id="monday"
                    onClick={() => {
                      addButton("monday");
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById("monday-start");
                      const endTimeSelect =
                        document.getElementById("monday-end");
                      startTimeSelect.value = "8:00";
                      endTimeSelect.value = "9:00";
                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="slot-2">
                  <select id="tuesday-start">
                    <option value="8:00">8:00</option>
                    <option value="8:30">8:30</option>
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                  </select>
                  <select id="tuesday-end">
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                    <option value="24:00">24:00</option>
                  </select>
                  <button
                    className="pushslot"
                    id="tuesday"
                    onClick={() => {
                      addButton("tuesday");
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById("tuesday-start");
                      const endTimeSelect =
                        document.getElementById("tuesday-end");
                      startTimeSelect.value = "8:00";
                      endTimeSelect.value = "9:00";
                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="slot-3">
                  <select id="wednesday-start">
                    <option value="8:00">8:00</option>
                    <option value="8:30">8:30</option>
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                  </select>
                  <select id="wednesday-end">
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                    <option value="24:00">24:00</option>
                  </select>
                  <button
                    className="pushslot"
                    id="wednesday"
                    onClick={() => {
                      addButton("wednesday");
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById("wednesday-start");
                      const endTimeSelect =
                        document.getElementById("wednesday-end");
                      startTimeSelect.value = "8:00";
                      endTimeSelect.value = "9:00";
                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="slot-4">
                  <select id="thursday-start">
                    <option value="8:00">8:00</option>
                    <option value="8:30">8:30</option>
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                  </select>
                  <select id="thursday-end">
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                    <option value="24:00">24:00</option>
                  </select>
                  <button
                    className="pushslot"
                    id="thursday"
                    onClick={() => {
                      addButton("thursday");
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById("thursday-start");
                      const endTimeSelect =
                        document.getElementById("thursday-end");
                      startTimeSelect.value = "8:00";
                      endTimeSelect.value = "9:00";
                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="slot-5">
                  <select id="friday-start">
                    <option value="8:00">8:00</option>
                    <option value="8:30">8:30</option>
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                  </select>
                  <select id="friday-end">
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                    <option value="24:00">24:00</option>
                  </select>
                  <button
                    className="pushslot"
                    id="friday"
                    onClick={() => {
                      addButton("friday");
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById("friday-start");
                      const endTimeSelect =
                        document.getElementById("friday-end");
                      startTimeSelect.value = "8:00";
                      endTimeSelect.value = "9:00";
                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="slot-6">
                  <select id="saturday-start">
                    <option value="8:00">8:00</option>
                    <option value="8:30">8:30</option>
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                  </select>
                  <select id="saturday-end">
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                    <option value="24:00">24:00</option>
                  </select>
                  <button
                    className="pushslot"
                    id="saturday"
                    onClick={() => {
                      addButton("saturday");
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById("saturday-start");
                      const endTimeSelect =
                        document.getElementById("saturday-end");
                      startTimeSelect.value = "8:00";
                      endTimeSelect.value = "9:00";
                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="slot-7">
                  <select id="sunday-start">
                    <option value="8:00">8:00</option>
                    <option value="8:30">8:30</option>
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                  </select>
                  <select id="sunday-end">
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                    <option value="24:00">24:00</option>
                  </select>
                  <button
                    className="pushslot"
                    id="sunday"
                    onClick={() => {
                      addButton("sunday");
                      // Reset selected time slots to default (9:00)
                      const startTimeSelect =
                        document.getElementById("sunday-start");
                      const endTimeSelect =
                        document.getElementById("sunday-end");
                      startTimeSelect.value = "8:00";
                      endTimeSelect.value = "9:00";
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="Save-btn">
            <button className="save-dash-det" onClick={AddSlot}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
