import React, { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import calvinAndHobbesImage from '../assets/img/calvinandhobbes.jpg';
import ParticleBackground from "../assets/particleBackground";
import "../index.css";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const canvasRef = useRef(null);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              window.localStorage.setItem("auth", "true");
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/dashboard/songs", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    } else {
      document.title = "Musico Login Page";
    }
  }, []);

  return (
    <div>
      <div className="relative w-screen h-screen bg-black">
        <h1 className="flex items-center justify-center text-9xl text-[#ff5500] p-10 hover:animate-pulse">Musico</h1>
        <h2 className="flex items-center justify-center text-7xl text-[#ff5500]">The app for all your listening needs</h2>
        <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
          <ParticleBackground />
          <div className="md:h-370 w-full md:w-375 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
            <h1 className="flex items-center justify-center text-5xl text-[#ff5500] py-10">Login</h1>
            <span className="container flex items-center justify-center text-[#ff5500]">
              <span class="note-1">♫</span>
              <span class="note-2">♪</span>
              <span class="note-3">♪</span>
              <span class="note-4">♫</span>
            </span>
            <div
              onClick={loginWithGoogle}
              className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all p-370">
              <FcGoogle className="text-xl" />
              <p>Sign in with Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
