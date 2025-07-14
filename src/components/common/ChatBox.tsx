import React, { useState } from 'react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const ChatBox: React.FC = () => {
  // State for messages and input
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle sending a message
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    // Fake AI reply after a short delay
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { role: 'ai', content: "I'm an AI! This is a sample reply." },
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-4 flex flex-col h-96">
      {/* Message history */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.length === 0 && (
          <div className="text-blue-400 text-center mt-8">Start the conversation!</div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words shadow text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-900'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-blue-100 text-blue-900 max-w-xs shadow text-sm animate-pulse">
              AI is typing...
            </div>
          </div>
        )}
      </div>
      {/* Input area */}
      <form onSubmit={handleSend} className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors duration-150"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox; 