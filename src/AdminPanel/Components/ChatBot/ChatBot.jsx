import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatbot } from "../../Slice/BotSlice";

const ChatBot = () => {
  const dispatch = useDispatch();
  const { companyId, companyName, companyImg } = useSelector((state) => state.selectedCompany);
  const currentTheme = useSelector((state) => state.theme.theme);
  const { data } = useSelector((state) => state.chatbot);
  const [messages, setMessages] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [isFirstLoad ,setIsFirstLoad] = useState(true);

  useEffect(() => {
    dispatch(fetchChatbot());
  }, [dispatch]);

  useEffect(() => {
    if (data && !isFirstLoad ) {
      setMessages(prevMessages => [...prevMessages, { text: data, sender: "bot" }]);
    }
  }, [data,isFirstLoad]);

  const handleSendMessage = async () => {
    if (userQuery.trim() !== "") {
      setMessages(prevMessages => [...prevMessages, { text: userQuery, sender: "user" }]);
      
      await dispatch(fetchChatbot(userQuery));
      setIsFirstLoad(false);
      setUserQuery("");
    }
  };

  return (
    <div>
      <div className={`fixed bottom-6 right-24 ${currentTheme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-[#F0FFF8]'}  p-4 shadow-lg rounded-lg w-[300px] h-[400px] flex flex-col border border-gray-300`}>
        <div className="flex border-b pb-2 mb-2 gap-2 items-center">
          <img className="w-10 h-10 rounded-full border border-gray-400" src={companyId ? companyImg : "../../../images/justLogo.svg"} alt="" />
          <p className="font-semibold text-lg">{companyId ? companyName : "CompanyName"}</p>
        </div>

        <div 
          className="flex-1 overflow-y-auto mb-2 px-2 space-y-2" 
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex justify-center text-gray-500 ">
            {messages.length === 0 ? <p>What can I help you with?</p> : null}
          </div>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-2 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`p-3 rounded-lg max-w-[80%] break-words shadow-md text-sm ${
                  message.sender === "user" 
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-bl-none" 
                    : `${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} text-black rounded-br-none` 
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-auto border-t pt-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 p-2 rounded-md text-sm focus:outline-none shadow-inner ${currentTheme === 'dark' ? 'bg-[#404040] text-white' : 'bg-white border border-gray-300'}`}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
