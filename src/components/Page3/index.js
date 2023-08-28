import React from "react";
import index from "./index.css";
import Header1 from "../Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateIsMentor } from "../../api/userRequest";
import Pageloader from "../Pagesbar";
function Auth3Component({setProgress}) {
  const initialSkillsLevel1 = [
    " Graphic Designer",
    "Full stack Web developer",
    "Software Developer",
    "IT Manager",
    "Software Engineer",
    "Product Manager",
  ];
  const initialSkillsLevel2 = [
    "Digital Marketing",
    "BlockChain Developer",
    "Machine Learning Expert",
  ];
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();
  console.log(skills);
  const redirectToPage4 = async () => {
    console.log("nt running");
    try {
      // const x = document.getElementById("myform2");
      if (!skills.length) {
        alert("Please add a skill");
        return;
      }
      const request = {
        skills: skills,
      };
      const { data } = await updateIsMentor(request);

      console.log(data);
      if (data.result) 
      {
        if (data.result) {
          setProgress(40);
          navigate("/skills");
          setProgress(100);
        }
      }
    } catch (error) {
      console.log(error);
    }
    navigate("/jobtitles");
  };
  var y = 0;

  const elaborate = () => {
    if (y == 0) {
      document.querySelector(".other").style.backgroundColor = "cyan";
      document.querySelector(".explain").classList.remove("hidethis");
      y++;
    } else {
      document.querySelector(".other").style.backgroundColor = "white";
      document.querySelector(".explain").classList.add("hidethis");
      y--;
    }
  };

  return (
    <>
      <Header1 />
      <div classNam="main-3">
        <Pageloader
          givecolor2={false}
          givecolor3={true}
          givecolor4={true}
          givecolor5={true}
          givecolor6={true}
          givecolor7={true}
        />
        <div className="head-3">
          <h2>Tell Us Your Skills</h2>
          <div>Select Your Skills</div>
        </div>
        <div style={{ height: "40px" }}></div>
        <form>
          <div className="options">
            <div className="row-1">
              {initialSkillsLevel1.map((skill, index) => (
                <div
                  className={skills.includes(skill) ? "selectedSDF" : ""}
                  key={index}
                  onClick={(e) => {
                    skills.includes(skill)
                      ? setSkills(skills.filter((ele) => ele !== skill))
                      : setSkills([...skills, skill]);
                  }}
                >
                  {skill}
                 
                </div>
              ))}
             

              {/* <div>Skill 2</div>
                            <div>Skill 3</div>
                            <div>Skill 4</div>
                            <div>Skill 5</div>
                            <div>Skill 6</div> */}
            </div>
            <div className="row-2">
              {initialSkillsLevel2.map((skill, index) => (
                <div
                  className={skills.includes(skill) ? "selectedSDF" : ""}
                  key={index}
                  onClick={(e) => {
                    skills.includes(skill)
                      ? setSkills(skills.filter((ele) => ele !== skill))
                      : setSkills([...skills, skill]);
                  }}
                >
                  {skill}
                </div>
              ))}
              {/* <div>Skill 7</div>
                            <div>Skill 8</div>
                            <div>Skill 9</div> */}
              <div onClick={elaborate} className="other">
                Other
              </div>
            </div>
          </div>
        </form>
        <div style={{ height: "40px" }}></div>
        <div className="explain hidethis">
        <div style={{width:'100%',display:'flex',alignItems:'center',flexDirection:'column',gap:'5px'}}>
            Explain A little about Your Skills
         

          <textarea
            className="textarea-skills"
            rows="8" // Adjust the number of visible rows
            cols="50" // Adjust the number of visible columns
            placeholder="Enter your skills"
            maxLength={200}
            onChange={(e) => {
              // if(skills.find(e.target.value) === ) return;
              const ski = e.target.value.split(",").map((ele) => ele.trim()); // remove spaces and split
              setSkills(ski);
            }}
            value={skills.join(",")}
          ></textarea>
          </div>
        </div>

        <div className="next">
          <button onClick={redirectToPage4}>Next</button>
        </div>
      </div>
    </>
  );
}
export default Auth3Component;
