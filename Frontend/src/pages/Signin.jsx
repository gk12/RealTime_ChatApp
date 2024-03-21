import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import logo from "../assets/logo.svg";
import { baseUrl } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitForm = async () => {
    try {
      console.log(formData, "data");
      const res = await axios.post(`${baseUrl}/auth/login`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/home");
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.success("something went wrong");
      console.log(error);
    }
  };
  return (
    <div className='w-full h-screen flex justify-center items-center py-16 md:py-0 bg-white '>
      <div className='w-full md:w-[40%] flex flex-col justify-center items-center'>
        <h1 className='text-center text-5xl font-bold'>Chat App</h1>
        <h1 className='text-center text-3xl font-bold'>Sign In</h1>
        <div className='w-[50%]  mt-7'>
          <input
            className='w-full block rounded-md border-2 border-[#C5CDD8] py-5 px-7 mt-5'
            placeholder='username'
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className='w-full block rounded-md border-2 border-[#C5CDD8] py-5 px-7 mt-5'
            placeholder='Password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type='submit'
          onClick={submitForm}
          className='w-[50%] bg-[#004AAD] rounded-md text-white font-semibold p-5 mt-5'
        >
          Sign In
        </button>
        <div className='mt-5'>
          Don't have account?
          <span
            onClick={() => navigate("/")}
            className='font-bold text-[#004AAD] cursor-pointer ml-1'
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
