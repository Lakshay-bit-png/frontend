import React from "react";
import "./index.css";
import Header1 from "../Header";
import { useNavigate } from "react-router-dom";
import { updateIsMentor } from "../../api/userRequest";
import { useState } from "react";
import Pageloader from "../Pagesbar";
function Auth7Component({setProgress}) {
    const navigate = useNavigate();
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [upiId, setUpiId] = useState("");

    const finish = async () => {
        // setProgress(10);
        const { data } = await updateIsMentor({ whatsappNumber, upiId });
        console.log(data, "hello");
        if (data.result) { 
            // setProgress(40);
            navigate("/homepage");
            // setProgress(100);
        }
    };
    return (
        <>
            <Header1 />
            <div className="main-7">
                <Pageloader givecolor2={false} givecolor3={false} givecolor4={false} givecolor5={false} givecolor6={false} givecolor7={true}/>
                <div className="head-7">
                    <h2>Alright One Last Step</h2>
                </div>
                <div className="details-wp">
                    <div>Contact Number</div>
                    <input
                        className="wp"
                        onChange={(e) => setWhatsappNumber(e.target.value)
                            }
                    />
                    <div>Upi Id</div>
                    <input
                        className="Upi"
                        onChange={(e) => setUpiId(e.target.value)
                            }
                    />
                    
                </div>
                <div className="finish">
                    <button className="finishbt" onClick={finish} >
                        Finish
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp; 
          <button className="finishbt" type="button" form="myform2" onClick={()=>
            navigate("/collegedetails")}>
            Back
          </button>
                </div>
                
            </div>
        </>
    );
}

export default Auth7Component;