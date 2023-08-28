import React, { useEffect } from "react";
import index from "./index.css";
import Header1 from "../Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateIsMentor } from "../../api/userRequest";
import Pageloader from "../Pagesbar";
import { getcity, getcollege, getstate } from "../../api/college";

function Auth5Component() {
    
    const [state, setState]=useState([])
    const [stateselected, setStateselected]=useState("")
    const [city, setCity]=useState([])
    const [college, setCollege]=useState([])

  const indianStates = {
    AndhraPradesh: "Andhra Pradesh",
    ArunachalPradesh: "Arunachal Pradesh",
    Assam: "Assam",
    Bihar: "Bihar",
    Chhattisgarh: "Chhattisgarh",
    Goa: "Goa",
    Gujarat: "Gujarat",
    Haryana: "Haryana",
    HimachalPradesh: "Himachal Pradesh",
    Jharkhand: "Jharkhand",
    Karnataka: "Karnataka",
    Kerala: "Kerala",
    MadhyaPradesh: "Madhya Pradesh",
    Maharashtra: "Maharashtra",
    Manipur: "Manipur",
    Meghalaya: "Meghalaya",
    Mizoram: "Mizoram",
    Nagaland: "Nagaland",
    Odisha: "Odisha",
    Punjab: "Punjab",
    Rajasthan: "Rajasthan",
    Sikkim: "Sikkim",
    TamilNadu: "Tamil Nadu",
    Telangana: "Telangana",
    Tripura: "Tripura",
    UttarPradesh: "Uttar Pradesh",
    Uttarakhand: "Uttarakhand",
    WestBengal: "West Bengal",
    AndamanandNicobarIslands: "Andaman and Nicobar Islands",
    Chandigarh: "Chandigarh",
    DadraandNagarHaveliandDamanandDiu:
      "Dadra and Nagar Haveli and Daman and Diu",
    Lakshadweep: "Lakshadweep",
    Delhi: "Delhi",
    Puducherry: "Puducherry",
  };
  const navigate = useNavigate();
  const [educationInstitution, setEducationInstitution] = useState("");
  const [endYear, setEndYear] = useState("");
  const getallstates=async ()=>{
        try{
            const { data } = await getstate();
            console.log(data)
            setState(data.result)
            
        }
        catch(err){
            console.log("error")
        }

   
  }
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const checkcollege = (event) => {
    setInput1(event.target.value);
  };

  const check2college =(event) => {
    setInput2(event.target.value);
  };

  useEffect(()=>{
    getallstates()
    
  },[])
  const getallcities= async(state)=>{
    try{
      const { data } = await getcity(state);
      console.log(data)
      setCity(data.result)
      
  }
  catch(err){
      console.log("error") 
  }

  }

  const getallcolleges=async(state,city)=>{
    try{
      const { data } = await getcollege(state,city);
      console.log(data)
      setCollege(data.result)
      
  }
  catch(err){
      console.log("error") 
  }
  }
  var p
  const citydone=(event)=>{
    getallcities(event.target.value)
    setStateselected(event.target.value)
    
  }
  
  const collegedone=(event)=>{
  console.log(stateselected)
    getallcolleges(stateselected,event.target.value)
    console.log(event.target.value)
  }
 
  const redirectToPage6 = async () => {
    
    navigate("/pic");
  };
  return (
    <>
      <Header1 />
      <div className="main-5">
        <Pageloader
          givecolor2={false}
          givecolor3={false}
          givecolor4={false}
          givecolor5={true}
          givecolor6={true}
          givecolor7={true}
        />
        <div className="head-5">
          <h2>
            Your Profile Helps You Get Personalized <br></br>and Join the Right
            Community
          </h2>
        </div>

        {/* <div className="input-clg">
                    <div>College/University/School</div>
                    <input
                        className="college-name"
                        onChange={(e) =>
                            setEducationInstitution(e.target.value)
                        }
                        value={educationInstitution}
                    />
                    <div>Graduation Year</div>
                    <input
                        className="year"
                        onChange={(e) => setEndYear(e.target.value)}
                        value={endYear}
                    />
                </div> */}
        <form id="collegedetl" className="details-college" onSubmit={redirectToPage6}>
          <div className="college-name">
            <div className="state">
              <label style={{fontWeight:'bold'}} for="state">Select Your State</label>
              <select className="state-choices" id="state" onChange={citydone} required>
                {state.map((x)=>{
                    return <option >{x}</option>
                })}
              </select> 
              {/* <input type="text" className="state-inp" placeholder="Can't Find Your State, Enter Manually" /> */}
            </div>
            <div className="city">
            <label style={{fontWeight:'bold'}} htmlFor="city">City</label>
              <select id="city" className="city-choices" onChange={collegedone} required >
              {city.map((y)=>{
                    return <option >{y}</option>
                })}
              </select>
              {/* <input type="text" placeholder="Can't Find Your City,  Enter Manually" /> */}
            </div>
            <div className="college">
              <label style={{fontWeight:'bold'}} htmlFor="college">College</label>
              <select id="college" className="college-choices">
              {college.map((z)=>{
                    return <option >{z}</option>
                })}
              </select>
              
            </div>
          </div>
          <div className="gradyear">
            <label style={{fontWeight:'bold'}} for="grad">Graduation Year:</label>
            <input type="text" required/>
          </div>
          
          <button htmlFor="collegedetl" type="submit" className="nextbtn-5" >
            Next
          </button>
        
        </form>

       
      </div>
    </>
  );
}

export default Auth5Component;
