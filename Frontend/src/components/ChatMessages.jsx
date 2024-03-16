import React, { useRef, useState } from "react";
import aiIcon from "../assets//ai-icon.svg";
import userAvatar from "../assets/avtar-1.png";
import galleryIcon from "../assets/gallery.svg";
import paperClipIcon from "../assets/paperclip.svg";
import emojiIcon from "../assets/emoji.svg";
import sendArrowIcon from "../assets/sendArrow.svg";
import { FiInfo } from "react-icons/fi";

const ChatMessages = () => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([
    {
      msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
      time: "Sent 12:30 pm",
      sender: "Tom",
    },
    {
      msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
      time: "Sent 12:30 pm",
      sender: "ai",
    },
    {
      msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
      time: "Sent 12:30 pm",
      sender: "Tom",
    },
    {
      msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
      time: "Sent 12:30 pm",
      sender: "ai",
    },
    {
      msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
      time: "Sent 12:30 pm",
      sender: "Tom",
    },
    {
      msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
      time: "Sent 12:30 pm",
      sender: "ai",
    },
  ]);
  return (
    <div className='w-full h-[80vh] flex justify-center md:justify-start items-center py-16 md:py-0'>
      <div className='w-full h-full flex relative rounded-md shadow-lg bg-white overflow-hidden'>
        <div className='w-full'>
          <div className='w-full flex justify-between bg-gradient-to-r from-[#004AAD] to-[#3886FF] px-6 py-4'>
            <div className='flex items-center text-white'>
              <img
                src={userAvatar}
                alt='logo'
                className='h-14 w-14 rounded-full'
              />
              <div className='ml-3'>
                <h1 className='font-bold'>Ann Curtis</h1>
                <p className='text-sm'>anncurtis@gmail.com</p>
              </div>
            </div>
            <button className='flex items-center text-white'>
              <FiInfo size={25} className='mr-4' />
            </button>
          </div>

          <div
            ref={scrollRef}
            className='flex flex-col w-full h-[77%] pb-10 px-5 overflow-scroll'
          >
            {messages?.length > 0 &&
              messages?.map((item, index) => {
                return (
                  <div className='w-full' key={index}>
                    {item.sender === "ai" ? (
                      <div className='max-w-[70%] w-fit flex items-start ml-3 mt-5 '>
                        <img
                          src={userAvatar}
                          alt='logo'
                          className='w-11 h-11 object-cover'
                        />
                        <div>
                          <div className='bg-[#F4F6F8] w-full rounded-lg p-4 ml-3'>
                            <h1 className='text-[#454F5B]'>{item?.msg}</h1>
                          </div>
                          <p className='text-sm text-[#738493] mt-1.5 ml-3'>
                            {item.time}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className='max-w-[70%] w-fit flex items-start ml-auto mt-5'>
                        <div>
                          <div className='bg-[#004AAD] p-4 mr-2 rounded-lg'>
                            <h1 className='text-white'>{item.msg}</h1>
                          </div>
                          <p className='text-right text-sm text-[#738493] mt-1.5 mr-3'>
                            {item.time}
                          </p>
                        </div>
                        <img src={aiIcon} alt='logo' className='w-11 h-11' />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          <div className='w-full flex rounded-md shadow-inner bg-[#fff] px-6 py-4'>
            <button>
              <img src={galleryIcon} alt='logo' className='w-8' />
            </button>
            <button className='mx-3'>
              <img src={paperClipIcon} alt='logo' className='w-8' />
            </button>
            <div className='flex bg-[#F4F6F8] w-full rounded-full pl-4 py-2 ml-2'>
              <input
                className='bg-[#F4F6F8] w-full outline-none text-sm'
                placeholder='Enter message...'
                type='text'
              />
              <button className='mx-3'>
                <img src={emojiIcon} alt='logo' className='w-7' />
              </button>
            </div>
            <button className='ml-5'>
              <img src={sendArrowIcon} alt='logo' className='w-9' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
