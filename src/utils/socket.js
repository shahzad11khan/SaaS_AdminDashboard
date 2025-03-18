import { io } from "socket.io-client";
import { baseUri } from "../AdminPanel/Components/api/baseUri"; // Ensure correct path

const socket = io(baseUri, {
  autoConnect: false, // Avoid auto-connecting when the app loads
  reconnection: true, // Ensure the socket tries to reconnect if disconnected
});

export const sendMessage = ({ senderCompany, receiverCompany, message }) => {
    socket.emit("sendMessage", { senderCompany, receiverCompany, message });
  };

export default socket;
