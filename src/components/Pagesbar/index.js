import React from "react";
import index from "./index.css";
import tick1 from './../images/gray.png'


function Pageloader({givecolor2,givecolor3,givecolor4,givecolor5,givecolor6,givecolor7}) {
  return (
    <>
      <div className="topper">
        <div className="load-main">
          <div className="circle-1 color-blue">1</div>
          <div className="line-1 bgcolor-blue"></div>
        </div>
        <div className="load-main" >
        <div className={givecolor2 ? "circle-1" :"circle-1 color-blue"}>2</div>
          <div className={givecolor2 ? "line-1" :"line-1 bgcolor-blue"}></div>
        </div>
        <div className="load-main">
          <div className={givecolor3 ? "circle-1" :"circle-1 color-blue"}>3</div>
          <div className={givecolor3 ? "line-1" :"line-1 bgcolor-blue"}></div>
        </div>
        <div className="load-main">
        <div className={givecolor4 ? "circle-1" :"circle-1 color-blue"}>4</div>
          <div className={givecolor4 ? "line-1" :"line-1 bgcolor-blue"}></div>
        </div>
        <div className="load-main">
        <div className={givecolor5 ? "circle-1" :"circle-1 color-blue"}>5</div>
          <div className={givecolor5 ? "line-1" :"line-1 bgcolor-blue"}></div>
        </div>
        <div className="load-main">
        <div className={givecolor6 ? "circle-1" :"circle-1 color-blue"}>6</div>
          <div className={givecolor6 ? "line-1" :"line-1 bgcolor-blue"}></div>
        </div>
        <div className="load-main">
           <div className={givecolor7 ? "circle-1" :"circle-1 color-blue"}><img src={tick1} style={{height:'20px'}}/></div>
         
          
        </div>

      </div>
      
    </>
  );
}

export default Pageloader;
