import React, { useEffect } from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import Commondash from "../common";
import Topbar from "../topbar";


function Earning({userData}) {
  const navigate = useNavigate();
  const redirecttomyslots=()=>{
    navigate('/mySlots')
  }
  const redirecttomyearnings=()=>{
    navigate('/myearnings')
  }
  const redirecttomybookings=()=>{
    navigate('/mybookings')
  }
  const redirecttomyaccount=()=>{
    navigate('/myaccount')
  }
  const redirectbacktohome=()=>{
    navigate('/homepage')
  }
  var x=document.querySelector('.side-nav-mob')
  useEffect(() => {
    // This code will run when the component mounts (DOM content is loaded)
    document.querySelector('.side-nav-mob').classList.add('display')

    // You can put your specific JavaScript code here
    // For example, you can interact with the DOM or fetch data
  }, []);
  const displaynavmob=()=>{
    
    var x=document.querySelector('.side-nav-mob')
    if(x.classList[1]){
      x.classList.remove('display')
      
      
     
      
    }
    else{x.classList.add('display');
   
   }
  }

  return (
    <>
      <div className="dash-main">
        
        <Commondash userData={userData} />

        <div className="dash-right">
        <Topbar/>
          <div className="partition-d"></div>
          <div className="earning-details">
            <div className="total-mentee">
                <h1>300</h1>
                <h3>TOTAL MENTEES</h3>
            </div>
            <div className="earnings-dash">
            <h1>30,000/-</h1>
            <h3>Total Earnings</h3>
            </div>
          </div>
          <div className="info-dash-table">
            <table>
                <thead>
                    
                    <th>Mentee Name</th>
                    <th>Earning</th>
                    <th>Status:</th>
                </thead>
                <tbody>
                    <td>Lakshay</td>
                    <td>500/-</td>
                    <td>Completed</td>
                </tbody>
                <tbody>
                    <td>Lakshay</td>
                    <td>500/-</td>
                    <td>Completed</td>
                </tbody>
                <tbody>
                    <td>Lakshay</td>
                    <td>500/-</td>
                    <td>Completed</td>
                </tbody>
                <tbody>
                    <td>Lakshay</td>
                    <td>500/-</td>
                    <td>Completed</td>
                </tbody>
                <tbody>
                    <td>Lakshay</td>
                    <td>500/-</td>
                    <td>Completed</td>
                </tbody>
                <tbody>
                    <td>Lakshay</td>
                    <td>500/-</td>
                    <td>Completed</td>
                </tbody>
                <tbody>
                    <td>Lakshay</td>
                    <td>500/-</td>
                    <td>Completed</td>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
  }

export default Earning;
