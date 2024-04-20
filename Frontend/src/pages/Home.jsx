import React, { useEffect, useState } from "react";
import searchIcon from "../assets/search.svg";
import avtar1 from "../assets/avtar-1.png";
import fllter from "../assets/filter.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import { baseUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ChatMessages from "../components/ChatMessages";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContex";
import { FaMobileAlt } from "react-icons/fa";
import { AiOutlineLaptop } from "react-icons/ai";

export default function Home() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  // const [activePagination, setActivePagination] = useState(0);
  // const Activepagination = [1, 2, 3, 4, 5, 6, 7];
  const [users, setUsers] = useState();
  const [selectedConversion, setSelectedConversion] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(users?._id);
  const [selectedUserName, setSelectedUserName] = useState(users?.name);
  const [selectedUserProfile, setSelectedUserProfile] = useState();
  const [selectedUserusername, setSelectedUserusername] = useState(
    users?.username
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [customerData, setCustomerData] = useState([
    {
      name: "Ann Curtis",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: true,
      unreadMessages: 3,
    },
    {
      name: "Rajan",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: true,
      unreadMessages: 0,
    },
    {
      name: "Ann Curtis",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: true,
      unreadMessages: 0,
    },
    {
      name: "Ann Curtis",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: false,
      unreadMessages: 2,
    },
    {
      name: "Ann Curtis",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: true,
      unreadMessages: 6,
    },
    {
      name: "Ann Curtis",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: false,
      unreadMessages: 0,
    },
    {
      name: "Ann Curtis",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: true,
      unreadMessages: 3,
    },
    {
      name: "Ann Curtis",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: true,
      unreadMessages: 10,
    },
    {
      name: "Ann Curtis",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: false,
      unreadMessages: 3,
    },
    {
      name: "Ann Curtis",
      Data: "Hello how are you this is my data first",
      time: "1 hour",
      status: true,
      unreadMessages: 3,
    },
  ]);
  const [totalPages, setTotalPages] = useState(1);
  const { onlineUsers } = useSocketContext();
  // const online_user = onlineUsers.includes(selectedUserId);

  const handleSearch = (event) => {
    event.preventDefault();
    // console.log(event.target.value, "searchItem");
    setSearchTerm(event.target.value);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth/logout`);
      toast.success(res.data.message);
      localStorage.clear();

      // navigate("/signin");
      setAuthUser(null);
    } catch (error) {
      toast.error("Error while logging out");
    }
  };
  const getAllusers = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/users?pageNo=${currentPage}&search=${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      // console.log(res.data, "data are====");
      setUsers(res.data?.users);
      setTotalPages(res.data?.noOfPages);
      // console.log(res.data.users, "Res users");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelect = async (uId, index, userName, email, profilePicture) => {
    setSelectedUserId(uId);
    setSelectedUserName(userName);
    setSelectedUserusername(email);
    setSelectedConversion(index);
    setSelectedUserProfile(profilePicture);
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  useEffect(() => {
    getAllusers();
  }, [currentPage, searchTerm]);
  // console.log(currentPage, "currentPage");
  return (
    <div className='w-full h-screen flex justify-center bg-[#F0F5FC]'>
      <div className='w-[50%] md:w-[50%] relative  '>
        <h1 className='text-black text-[1.6rem] leading-[1.1] font-semibold mt-8'>
          Chat Logs and History
        </h1>
        <div className='flex w-full mt-10 h-[85vh]'>
          <div className='w-[70%] md:w-[40%] rounded-lg bg-white py-3 mr-5'>
            <div className='flex items-center justify-between py-1.5 px-5'>
              <h1 className='text-black text-lg font-bold'>Chats</h1>
              <img src={fllter} alt='logo' className='' />
            </div>

            <div className='flex bg-white border border-[#C4CDD5] rounded-md py-1.5 px-2 my-3 mx-5'>
              <img src={searchIcon} alt='logo' className='mr-2' />
              <input
                type='text'
                placeholder='Search mail'
                className='outline-none min-w-[200px] bg-white'
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>

            <div className='h-[59vh] flex flex-col '>
              {users && users?.length > 0 ? (
                users?.slice(0, 6)?.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        index === selectedConversion
                          ? "bg-[#F4F6F8]"
                          : "bg-white"
                      } w-full flex items-center cursor-pointer hover:bg-[#F4F6F8] py-2 px-5 my-3`}
                      onClick={() =>
                        handleSelect(
                          data._id,
                          index,
                          data?.name,
                          data?.username,
                          data?.profilePicture
                        )
                      }
                    >
                      <div className='relative'>
                        <img
                          src={`${data.profilePicture}`}
                          alt='logo'
                          className='w-12 h-12 mr-4'
                        />
                        <GoDotFill
                          size={15}
                          className={`${
                            onlineUsers.includes(data._id)
                              ? "text-[#54D62C]"
                              : "text-[#FF0052]"
                          } bottom-0 right-4 absolute `}
                        />
                      </div>
                      <div className='w-[50%]'>
                        <div className='flex items-center'>
                          <h1 className='text-[#454F5B] font-bold'>
                            {data.name}
                          </h1>
                          {data.unreadMessages > 0 && (
                            <p className='w-4 h-4 rounded-full text-xs text-center text-white bg-[#004AAD] ml-2'>
                              {data.unreadMessages}
                            </p>
                          )}
                        </div>
                        <p className='text-[#454F5B] font-medium text-ellipsis overflow-hidden whitespace-nowrap'>
                          {data.Data}
                        </p>
                      </div>
                      <div className='self-end ml-3'>
                        <h1 className='text-[#738493]'>
                          {data.time || "123456"}
                        </h1>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className='text-center py-10'>No customer data available.</p>
              )}
            </div>

            <div className='w-full p-3 mt-auto'>
              <div className='flex justify-center'>
                <button onClick={prevPage}>
                  <FaChevronLeft size={15} className='text-[#454F5B] mr-3' />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    className={`${
                      index + 1 === currentPage &&
                      "bg-blue-100 text-[#004AAD] rounded-full"
                    } w-8 h-8 text-[#454F5B] font-semibold `}
                    onClick={() => setCurrentPage(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </button>
                ))}
                <button onClick={nextPage}>
                  <FaChevronRight size={15} className='text-[#454F5B] ml-3' />
                </button>
              </div>
              <button onClick={handleLogout} className='w-[20%] h-[20%]'>
                <TbLogout2 className='w-[50%] h-[50%] cursor-pointer' />
              </button>
            </div>
          </div>
          {selectedUserId ? (
            <div className='w-[50%] md:w-[60%] rounded-lg bg-white overflow-y-hidden '>
              <ChatMessages
                selectedUserId={selectedUserId}
                selectedUserName={selectedUserName}
                selectedUserusername={selectedUserusername}
                selectedUserProfile={selectedUserProfile}
              />
            </div>
          ) : (
            <div className='w-[50%] md:w-[60%] rounded-lg bg-[#f0fdfa] overflow-y-hidden '>
              <div className='ml-[6rem] mt-[20rem] flex'>
                <FaMobileAlt className='w-[30%] h-[10%] transform rotate-6 pr-4' />
                <AiOutlineLaptop className='w-[30%] h-[10%] transform -rotate-6 pr-4' />
              </div>
              <div className='ml-14 mt-[14rem]'>
                <h2>Your Personal Messages are End to End</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
