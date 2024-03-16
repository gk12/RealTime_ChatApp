import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  );
};

export default AllRoutes;
