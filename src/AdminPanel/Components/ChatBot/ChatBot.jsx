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

  useEffect(() => {
    dispatch(fetchChatbot());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setMessages(prevMessages => [...prevMessages, { text: data, sender: "bot" }]);
    }
  }, [data]);

  const handleSendMessage = async () => {
    if (userQuery.trim() !== "") {
      // Add user message to chat
      setMessages(prevMessages => [...prevMessages, { text: userQuery, sender: "user" }]);
      
      // Dispatch chatbot action
      await dispatch(fetchChatbot(userQuery));
      
      // Clear input field
      setUserQuery("");
    }
  };

  return (
    <div>
      <div className={`fixed bottom-6 right-24 ${currentTheme === 'dark' ? 'bg-[#404040] text-white' : 'bg-[#F0FFF8]'}  p-4 shadow-lg rounded-md w-[300px] h-[400px] flex flex-col border`}>
        <div className="flex border-b pb-2 mb-2 gap-2">
          <img className="w-8 h-8 rounded-full" src={companyId ? companyImg : "../../../images/justLogo.svg"} alt="" />
          <p className="font-semibold">{companyId ? companyName : "CompanyName"}</p>
        </div>

        <div 
          className="flex-1 overflow-y-auto mb-2 px-2" 
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
            >
              <div 
                className={`inline-block p-2 rounded-lg max-w-[80%] break-words ${
                  message.sender === "user" 
                    ? "bg-blue-500 text-white" 
                    : `${currentTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 mt-auto">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 p-1 ${currentTheme === 'dark' ? 'bg-[#404040]' : 'bg-white'}  border border-gray-300 rounded-md focus:outline-none`}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button 
            className="bg-blue-500 text-white px-3 rounded-md hover:bg-blue-600" 
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