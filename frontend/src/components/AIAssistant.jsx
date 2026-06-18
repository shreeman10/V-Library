import React, { useState } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI Librarian. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "That's an interesting question! I am currently a demo assistant, but soon I'll be able to search the entire library database for you.", isBot: true }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-inter">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 md:w-96 h-[500px] flex flex-col overflow-hidden mb-4 transition-all duration-300 transform origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#424593] to-[#605fe6] p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white text-[#424593] p-2 rounded-full">
                <FaRobot className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">V-Library AI</h3>
                <p className="text-xs text-blue-100">Online | Ask me anything</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition p-1">
              <FaTimes className="text-xl" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.isBot 
                    ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm' 
                    : 'bg-[#605fe6] text-white rounded-tr-none shadow-md'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your AI librarian..." 
                className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#605fe6] transition"
              />
              <button 
                type="submit" 
                className="bg-[#605fe6] hover:bg-[#424593] text-white p-3 rounded-full transition shadow-md flex items-center justify-center"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#424593] to-[#605fe6] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-bounce-slow"
        >
          <FaRobot className="text-3xl" />
        </button>
      )}
    </div>
  );
}

export default AIAssistant;
