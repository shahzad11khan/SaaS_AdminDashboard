import  { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSocket, disconnectSocket } from "./AdminPanel/Slice/socketSlice";
import { io } from "socket.io-client";

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // Your backend URL
    dispatch(setSocket(newSocket)); // Store socket in Redux state
    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  return <div>{children}</div>; // Render children components
};

export default SocketProvider;
