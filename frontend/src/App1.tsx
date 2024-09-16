import React, { useEffect, useState, useRef } from 'react';
import './App.css'; // Add CSS for styling

interface Message {
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false); // Track WebSocket connection status
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true); // Set connection status to true when WebSocket opens
    };

    socket.onmessage = (event) => {
      const message = event.data;
      addMessage('bot', message);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false); // Set connection status to false when WebSocket closes
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const addMessage = (sender: 'user' | 'bot', content: string) => {
    const newMessage = {
      sender,
      content,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    scrollToBottom();
  };

  const sendMessage = () => {
    if (ws && input) {
      ws.send(input);
      addMessage('user', input); // Add user's message to the chat
      setInput('');
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-container">
      <h1>Chat with DialogFlow</h1>

      {/* Connection Status Indicator */}
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        {isConnected ? 'Connected' : 'Disconnected'}
        <span className={`status-indicator ${isConnected ? 'active' : ''}`}></span>
      </div>

      <div className="chat-window">
        <ul className="messages-list">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`message-item ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                <span className="message-text">{msg.content}</span>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            </li>
          ))}
        </ul>
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Send message on "Enter"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
