import { useEffect, useState } from "react";
import "./App.css";
import { getUser } from "./api/userRequest";
import Toast from "./components/toast";
import AuthPage from "./components/Maincomp";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState(0);
  // GET USER DATA
  useEffect(() => {
    const User = async () => {
      try {
        const { data } = await getUser();

        // console.log(data.result);
        setUserData(data.result);
        // localStorage.setItem("profileData", userData);
      } catch (error) {
        console.log(error);
      }
    };
    User();
  }, []);
  return (
    <>
      {/* <RouteLanding/> */}
      <AuthPage userData={userData} setProgress={setProgress}/>
      <LoadingBar
        color="#f11946"
        height={4}
        progress={progress}
        shadow={true}
      />
    </>
  );
}

export default App;
