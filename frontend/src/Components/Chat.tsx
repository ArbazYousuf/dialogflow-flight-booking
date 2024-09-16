import React, { useEffect, useState, useRef } from 'react';
import Messages from './Messages';

const Chat = () => {
    const [responses, setResponses] = useState<{ text: string; isBot: boolean }[]>([{
        "isBot": true,
        text: "Hey, How can i help you?"
    }]);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [ws, setWs] = useState<WebSocket | null>(null); // Track WebSocket connection
    const [isConnected, setIsConnected] = useState<boolean>(false); // Track connection status

    // Scroll to the bottom when new messages arrive
    const chatEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    console.log({ responses })

    useEffect(() => {
        // Establish WebSocket connection
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            const responseData = {
                text: event.data ? event.data : "Sorry, I didn't understand that. Can you repeat?",
                isBot: true,
            };
            setResponses((responses) => [...responses, responseData]);
            scrollToBottom();
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
            setIsConnected(false);
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (message: string) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message); // Send message to WebSocket server
        }
    };

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(event.target.value);
    };

    const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && currentMessage.trim() !== '') {
            const messageData = {
                text: currentMessage,
                isBot: false,
            };
            setResponses((responses) => [...responses, messageData]);
            sendMessage(currentMessage); // Send user message through WebSocket
            setCurrentMessage(''); // Clear input
            scrollToBottom(); // Scroll to the latest message
        }
    };

    return (
        <>
            <div className="flex justify-end px-3 mx-auto">
                <div className="flex flex-col justify-between w-full h-auto max-w-xs py-4 my-2 bg-gray-100 shadow-sm lg:max-w-md dark:bg-gray-900 rounded-xl">
                    <div className="flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch messagesSection scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2">
                        <Messages messages={responses} />
                        <div ref={chatEndRef} /> {/* This keeps the view scrolled to the bottom */}
                    </div>

                    <div className="flex justify-center px-3 py-2 border-t-2 border-gray-200 dark:border-gray-600">
                        <div className="w-full px-2 py-2 bg-white rounded-lg shadow-sm dark:bg-gray-800 lg:max-w-lg">
                            <input
                                type="text"
                                value={currentMessage}
                                onChange={handleMessageChange}
                                onKeyDown={handleSubmit}
                                placeholder="Enter your message here"
                                className="block w-full py-2 pl-3 pr-3 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-900 dark:text-white dark:placeholder-gray-100 focus:outline-none focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 dark:focus:placeholder-white focus:ring-1 focus:ring-indigo-300 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
