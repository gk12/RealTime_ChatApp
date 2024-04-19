import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import axios from "axios";
import { baseUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AllRoutes = () => {
  const { authUser, setAuthUser } = useAuthContext();
  setAuthUser(localStorage.getItem("user"));
  // console.log(localStorage.getItem("auth"));
  console.log(authUser, "authUser");
  const navigate = useNavigate();
  // const [authenticated, setAuthenticated] = useState(
  //   localStorage.getItem("auth")
  // );
  // const authCheck = async (req, res) => {
  //   try {
  //     const auth = await axios.get(`${baseUrl}/authCheck`, {
  //       withCredentials: true,
  //     });
  //     console.log(auth.data, "auth");
  //     if (auth.status === 200) {
  //       // if (localStorage.getItem("auth")) {
  //       navigate("/home");
  //       // } else {
  //       //   navigate("/signin");
  //       // }
  //       localStorage.setItem("auth", true);
  //     }
  //   } catch (error) {
  //     console.log("something went wrong");
  //   }
  // };
  // useEffect(() => {
  //   authCheck();
  // }, [authenticated]);
  return (
    <Routes>
      <Route
        path='/signin'
        element={authUser ? <Navigate to={"/"} /> : <Signin />}
      />
      <Route
        path='/signup'
        element={authUser ? <Navigate to={"/"} /> : <Signup />}
      />
      <Route
        path='/'
        element={authUser ? <Home /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
};

export default AllRoutes;
