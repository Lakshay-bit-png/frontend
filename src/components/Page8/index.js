import React,{useState} from "react";
import Header1 from "../Header";
import index from './index.css'
import user from '../images/user.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pageloader from "../Pagesbar";
const API = axios.create({ baseURL: "http://localhost:4000" });


function Uploadpic({userData}){
    const navigate =useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedcImage, setSelectedcImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };
  // const handleImageChange2 = (event) => {
  //   const imageFile = event.target.files[0];
  //   setSelectedcImage(imageFile);
  // };

  const handleUpload = async() => {
    if (selectedImage) {
      // Here you can implement the code to upload the image to your server or cloud storage
      // For example, you can use the Fetch API or a library like axios.
      // Don't forget to handle errors and success states accordingly.
      console.log('Uploading image:', selectedImage.name);
      const formData = new FormData();
      formData.append("profilePic", selectedImage);
      
      console.log(selectedImage)
    console.log(formData)
      const uploadprofilepic = (data) => {
        const token = localStorage.getItem("skilloptoken");

        const config = {
            headers: {
                Authorization: token,
            },
            withCredentials: true,
        };
        return API.put(`/api/user/update/profile`, data, config);
    };
    const data = await uploadprofilepic(formData);
    console.log(data);
    }
  };
  const redirecttolast=()=>{
    navigate('/laststep')
  }
  // const handleUpload2 = () => {
  //   if (selectedcImage) {
  //     // Here you can implement the code to upload the image to your server or cloud storage
  //     // For example, you can use the Fetch API or a library like axios.
  //     // Don't forget to handle errors and success states accordingly.
  //     console.log('Uploading image:', selectedcImage.name);
  //   }
  // };
  const showupload=()=>{
    document.querySelector('.pop-img-u').style.display='flex';
  }
  const hideupload=()=>{
    document.querySelector('.pop-img-u').style.display='none';
  }
    return(

        <>
        <Header1/>
        <Pageloader givecolor2={false}
          givecolor3={false}
          givecolor4={false}
          givecolor5={false}
          givecolor6={true}
          givecolor7={true} />
        <div className="pop-img-u" style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',position:'absolute',zIndex:'4',backdropFilter:'blur(5px)',display:'none'}}>
        <div className="img-uploadpopup">
        
          <div onClick={hideupload} className="fa fa-close" style={{fontSize:'25px',position:'absolute',top:'0',right:'0',cursor:'pointer'}}></div>
          {/* <h3>Cover Photo</h3> */}
          {/* <input
        type="file"
        accept="image/*"
       
        className="file-input"
        onChange={handleImageChange2}
      />
      <button className="upload-button" onClick={handleUpload2}>
        Upload Image
      </button> */}
      <h3>Profile Photo</h3>
          <input
        type="file"
        
        name="profilePic"
        className="file-input"
        onChange={(e)=> setSelectedImage(e.target.files[0])}
      />
      <button className="upload-button" onClick={handleUpload}>
        Upload Image
      </button>
        </div>
        </div>
        <div className="header-8">Add Your Cover And Profile Pic</div>
        <div className="upload-img">
            <div className="cover">
            
      
            </div>
            <div className="main-photo">
            <button className="uploadbtn" onClick={showupload}>Upload</button>
            </div>
    
            
        </div>
        <div className="next-button-8">
          <button onClick={redirecttolast}>Next</button>
        </div>
        <div className="skip">
         <div >Skip For Now</div> 
        </div>
        
        
        </>

    )
}

export default Uploadpic