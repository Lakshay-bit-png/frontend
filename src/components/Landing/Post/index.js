import React, { useEffect, useState, useRef } from "react";

import Common from "../common";
import MyProfile from "../myprof";
import Postlist from "../Postlist";

function Post({ userData, setProgress }) {
  // Function to handle input changes

  // useEffect(()=>{
  //   window.location.reload();
  // },[])

  return (
    <>
      <Common setProgress={setProgress}/>
      <div className="main-content-landing">
        {userData && (
          <MyProfile isMyProfile={true} userData={userData} myUser={userData} />
        )}
        {userData && <Postlist setProgress={setProgress} displaycreatepost={true} userData={userData} />}
      </div>
    </>
  );
}
export default Post;
