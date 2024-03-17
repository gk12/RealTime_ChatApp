import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../App";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    gender: "",
    password: "",
  });
  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${baseUrl}/auth/register`, formData);
      console.log(res.data, "Data");
      if (res.status === 201) {
        navigate("/signin");
      }
      toast.success(res.data.message);
      setFormData({
        name: "",
        username: "",
        gender: "",
        password: "",
      });
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target, "abcd");
    const { name, value, id, type } = e.target;
    type === "radio"
      ? setFormData({
          ...formData,
          [name]: id,
        })
      : setFormData({
          ...formData,
          [name]: value,
        });
  };
  return (
    <div className='w-full h-screen flex justify-center items-center py-16 md:py-0 bg-white '>
      <div className='w-full md:w-[40%] flex flex-col justify-center items-center'>
        <h1 className='text-center text-5xl font-bold'>Chat App</h1>
        <h1 className='text-center text-3xl font-bold'>Sign Up</h1>
        <div className='w-[50%]  mt-7'>
          <input
            className='w-full block rounded-md border-2 border-[#C5CDD8] py-5 px-7 mt-5'
            placeholder='name'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
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
          <div className='w-full flex py-5 px-7 mt-5 bg-black'>
            <label htmlFor='male' className='text-white'>
              Male
            </label>
            <input
              onChange={handleChange}
              className='w-[50%]'
              type='radio'
              name='gender'
              id='male'
              checked={formData.gender === "male"}
            />
            <label htmlFor='female ' className='text-white'>
              Female
            </label>
            <input
              onChange={handleChange}
              className='w-[50%]'
              type='radio'
              name='gender'
              id='female'
              checked={formData.gender === "female"}
            />
          </div>
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='w-[50%] bg-[#004AAD] rounded-md text-white font-semibold p-5 mt-5'
        >
          Sign Up
        </button>
        <div className='mt-5'>
          Don't have account?
          <span
            onClick={() => navigate("/signin")}
            className='font-bold text-[#004AAD] cursor-pointer ml-1'
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
