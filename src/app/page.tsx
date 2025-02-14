import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: number;
  name: string;
  content: string;
  timestamp: Date;
}

export default function ChatRoomPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      return;
    }
    const newMessage: ChatMessage = {
      id: Date.now(),
      name: name.trim(),
      content: message.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 flex flex-col">
      <header className="py-4 bg-red-500 text-white text-center font-bold text-xl shadow-md">
        ❤️ Valentine's Chatroom
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow">
              <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                {msg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-red-500">{msg.name}</span>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="mt-1 text-gray-800">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="p-4 bg-red-200">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <input
              type="text"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
            >
              Send
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
