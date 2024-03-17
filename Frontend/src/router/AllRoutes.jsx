import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import axios from "axios";
import { baseUrl } from "../App";

const AllRoutes = () => {
  // const [authenticated, setAuthenticated] = useState(
  //   JSON.parse(localStorage.getItem("auth"))
  // );
  // const authCheck = async (req, res) => {
  //   try {
  //     const auth = await axios.get(`${baseUrl}/api/authCheck`);
  //     console.log(auth, "cclll");
  //     if (auth.status === 200) {
  //       localStorage.setItem("auth", true);
  //     }
  //   } catch (error) {
  //     console.log("something went wrong");
  //   }
  // };
  // useEffect(() => {
  //   authCheck();
  // }, []);
  return (
    <Routes>
      <Route path='/signin' element={<Signin />} />
      <Route path='/' element={<Signup />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  );
};

export default AllRoutes;
