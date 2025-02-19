const ChatBot = () => {
    return (
      <div>
        <div className="fixed bottom-6 right-24 bg-white p-4 shadow-lg rounded-md w-[300px] h-[400px] flex flex-col">
          <div className="border-b pb-2 mb-2">
            <p className="font-semibold">Company Name</p>
          </div>
  
       
  
          <div className="flex gap-1 mt-auto">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-1 border border-gray-300 rounded-md focus:outline-none"
            />
            <button className=" bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatBot;
  