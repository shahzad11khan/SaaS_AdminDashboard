import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatbot } from "../../Slice/BotSlice";

const InterCompanyChat = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.theme);
    const { companies } = useSelector((state) => state);
    let { data: companiesData } = companies || {};

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userQuery, setUserQuery] = useState("");

    useEffect(() => {
        dispatch(fetchChatbot());
    }, [dispatch]);

    const handleCompanyChange = (e) => {
        const companyId = e.target.value;
        const company = companiesData?.find((c) => c._id === companyId);
        setSelectedCompany(company || null);
    };

    const handleSendMessage = () => {
        if (!userQuery.trim() || !selectedCompany) return;

        const newUserMessage = { sender: "user", text: userQuery };
        setMessages([...messages, newUserMessage]);

        setUserQuery("");

        setTimeout(() => {
            const botResponse = { sender: "company", text: `Reply from ${selectedCompany.companyName}` };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 1000);
    };


    return (
        <div>
            <div className={`fixed bottom-2 right-24 ${currentTheme === 'dark' ? 'bg-[#404040] text-white' : 'bg-[#F0FFF8] text-black'} p-4 shadow-lg rounded-lg w-[300px] h-[400px] flex flex-col border border-gray-300`}>

                <div className={`border-b pb-2 mb-2`}>
                    <select
                        className={` w-full p-2 border rounded-md  ${currentTheme === 'dark' ? 'bg-[#404040] text-white' : 'bg-[#F0FFF8] text-black'}`}
                        value={selectedCompany?._id || ""}
                        onChange={handleCompanyChange}
                    >
                        <option value="" disabled>Select a Company</option>
                        {companiesData?.map((company) => (
                            <option key={company._id} value={company._id}>{company.companyName}</option>
                        ))}
                    </select>
                </div>

                {selectedCompany && (
                    <div className="flex  pb-2 gap-2 justify-center items-center">
                        <img className="w-7 h-7 rounded-full border border-gray-400" src={selectedCompany.companyLogo} alt={selectedCompany.companyName} />
                        <p className=" ">{selectedCompany.companyName}</p>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto mb-2 px-2 space-y-2"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {messages.length === 0 ? (
                        <p className={`text-center  ${currentTheme === 'dark' ? ' text-white' : 'text-gray-500'}`}> {selectedCompany ? `Start Chat with ${selectedCompany.companyName}` : "Please Select a Company"}</p>
                    ) : (
                        messages.map((message, index) => (
                            <div key={index} className={`mb-2 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`p-3 rounded-lg max-w-[80%] break-words shadow-md text-sm ${message.sender === "user"
                                            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-bl-none"
                                            : `${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} text-black rounded-br-none`
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex gap-2 mt-auto border-t pt-2">
                    <input
                        type="text"
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => {
                            if (e.key === "Enter")
                                handleSendMessage()
                        }}
                        className={`flex-1 p-2 rounded-md text-sm focus:outline-none shadow-inner border ${currentTheme === 'dark' ? 'bg-[#404040] text-white border-gray-300' : 'bg-white  border-gray-300 '}`}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                        disabled={!selectedCompany || !userQuery.trim()}
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterCompanyChat;
