import { createContext, useContext, useEffect, useState } from "react";
const SocketContext = createContext();
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser, setAuthUser } = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const authUser = localStorage.getItem("auth");
  // const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(authUser, "authusersnksnkfnknk====");
    if (authUser) {
      // making connection with server(backend) and it will send userId and that will store
      // const socket = io("http://localhost:4008", 
      const socket = io("https://realtime-chatapp-1.onrender.com", 
      {
        query: {
          userId: JSON.parse(localStorage.getItem("user")).userDetails.id, //authUser.userDetails.id,
        },
      });
      setSocket(socket);
      // here i am listening event of online users
      socket.on("onlineusers", (users) => {
        setOnlineUsers(users);
      });
      // when component unmount then close socket
      return () => socket.close();
    } else {
      // unauthenicated user then close socket
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
