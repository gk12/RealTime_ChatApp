import React, { useEffect, useRef, useState } from "react";
import aiIcon from "../assets//ai-icon.svg";
import userAvatar from "../assets/avtar-1.png";
import galleryIcon from "../assets/gallery.svg";
import paperClipIcon from "../assets/paperclip.svg";
import emojiIcon from "../assets/emoji.svg";
import sendArrowIcon from "../assets/sendArrow.svg";
import { FiInfo } from "react-icons/fi";
import axios from "axios";
import { baseUrl } from "../App";
import { useSocketContext } from "../context/SocketContex";

const ChatMessages = (props) => {
  const {
    selectedUserId,
    selectedUserusername,
    selectedUserName,
    selectedUserProfile,
  } = props;
  // console.log(
  //   { selectedUserId, selectedUserusername, selectedUserName },
  //   "selectedUserId"
  // );
  const { socket } = useSocketContext();
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const getMessages = async () => {
    try {
      const messages = await axios.get(
        `${baseUrl}/messages/${selectedUserId}`,
        {
          withCredentials: true,
        }
      );
      setMessages(messages.data?.messages?.messageId);
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    getMessages();
  }, [selectedUserId]);

  const handleMessage = (e) => {
    e.preventDefault();
    setMessageContent(e.target.value);
  };

  const sendMessages = async (e) => {
    e.preventDefault();
    if (!messageContent) return;
    setMessages([...messages, { messageContent }]);
    console.log(messageContent, "value");
    try {
      const res = await axios.post(
        `${baseUrl}/messages/send/${selectedUserId}`,
        { messageContent },
        { withCredentials: true }
      );
      // setMessages(...messages, e.target.value);
    } catch (error) {
      console.log(error, "error");
    }
    setMessageContent("");
  };
  function MessageTime(time) {
    const date = new Date(time);

    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  }
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  console.log(messages, "messages");
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => socket.off("newMessage");
  }, [socket, setMessages, messages]);
  // const [messages, setMessages] = useState([
  //   {
  //     msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
  //     time: "Sent 12:30 pm",
  //     sender: "Tom",
  //   },
  //   {
  //     msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
  //     time: "Sent 12:30 pm",
  //     sender: "ai",
  //   },
  //   {
  //     msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
  //     time: "Sent 12:30 pm",
  //     sender: "Tom",
  //   },
  //   {
  //     msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
  //     time: "Sent 12:30 pm",
  //     sender: "ai",
  //   },
  //   {
  //     msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
  //     time: "Sent 12:30 pm",
  //     sender: "Tom",
  //   },
  //   {
  //     msg: "Hi, Tom. Thanks for reaching out! What can i help you wiith today?",
  //     time: "Sent 12:30 pm",
  //     sender: "ai",
  //   },
  // ]);
  return (
    <div className='w-full h-[100%] flex justify-center md:justify-start items-center py-16 md:py-0'>
      <div className='w-full h-full flex relative rounded-md shadow-lg bg-white overflow-hidden'>
        <div className='w-full'>
          <div className='w-full flex justify-between bg-gradient-to-r from-[#004AAD] to-[#3886FF] px-6 py-4'>
            <div className='flex items-center text-white'>
              <img
                src={selectedUserProfile}
                alt='logo'
                className='h-14 w-14 rounded-full'
              />
              <div className='ml-3'>
                <h1 className='font-bold'>{selectedUserName}</h1>
                <p className='text-sm'>{selectedUserusername}</p>
              </div>
            </div>
            <button className='flex items-center text-white'>
              <FiInfo size={25} className='mr-4' />
            </button>
          </div>

          <div
            ref={scrollRef}
            className='flex flex-col w-full h-[77%] pb-10 px-5 overflow-y-auto'
          >
            {messages &&
              messages?.length > 0 &&
              messages?.map((item, index) => {
                return (
                  <div className='w-full' key={index}>
                    {item.sender === selectedUserId ? (
                      <div className='max-w-[70%] w-fit flex items-start ml-3 mt-5 '>
                        <img
                          src={selectedUserProfile}
                          alt='logo'
                          className='w-11 h-11 object-cover'
                        />
                        <div>
                          <div className='bg-[#F4F6F8] w-full rounded-lg p-4 ml-3'>
                            <h1 className='text-[#454F5B]'>
                              {item?.messageContent}
                            </h1>
                          </div>
                          <p className='text-sm text-[#738493] mt-1.5 ml-3'>
                            {MessageTime(item?.createdAt)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className='max-w-[70%] w-fit flex items-start ml-auto mt-5'>
                        <div>
                          <div className='bg-[#004AAD] p-4 mr-2 rounded-lg'>
                            <h1 className='text-white'>
                              {item?.messageContent}
                            </h1>
                          </div>
                          <p className='text-right text-sm text-[#738493] mt-1.5 mr-3'>
                            {/* {item.time} */}
                            {item?.createdAt
                              ? MessageTime(item?.createdAt)
                              : "just now"}
                          </p>
                        </div>
                        <img src={aiIcon} alt='logo' className='w-11 h-11' />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          <form onSubmit={sendMessages}>
            <div className='w-full flex rounded-md shadow-inner bg-[#fff] px-6 py-4'>
              <button>
                <img src={galleryIcon} alt='logo' className='w-8' />
              </button>
              <button className='mx-3'>
                <img src={paperClipIcon} alt='logo' className='w-8' />
              </button>
              <div className='flex bg-[#F4F6F8] w-full rounded-full pl-4 py-2 ml-2'>
                <input
                  className='bg-[#F4F6F8] w-full outline-none text-sm text-black'
                  placeholder='Enter message...'
                  type='text'
                  value={messageContent}
                  onChange={handleMessage}
                />
                <button className='mx-3'>
                  <img src={emojiIcon} alt='logo' className='w-7' />
                </button>
              </div>
              <button type='submit' className='ml-5'>
                <img src={sendArrowIcon} alt='logo' className='w-9' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
