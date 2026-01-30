/**
 * Meta AI Chat Component - Smart AI Responses
 */

import { useState, useRef, useEffect } from 'react';

function MetaAIChat({ onClose }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hey! I'm Meta AI. How can I help you today? 🤖" },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getAIResponse = (userMessage) => {
        const msg = userMessage.toLowerCase();

        // Greetings
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('salam') || msg.includes('assalam')) {
            const greetings = [
                "Hello! 👋 How can I assist you today?",
                "Hey there! What would you like to know?",
                "Hi! I'm here to help. What's on your mind?",
                "Wa Alaikum Assalam! How can I help you today? 😊"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // How are you
        if (msg.includes('how are you') || msg.includes('kaise ho') || msg.includes('kaisa hai')) {
            return "I'm doing great, thanks for asking! 😊 I'm always ready to help. What can I do for you?";
        }

        // Weather
        if (msg.includes('weather') || msg.includes('mausam')) {
            return "I can't check live weather, but you can use weather.com or your phone's weather app! 🌤️ Is there anything else I can help with?";
        }

        // Time
        if (msg.includes('time') || msg.includes('waqt')) {
            const now = new Date();
            return `The current time is ${now.toLocaleTimeString()}. ⏰`;
        }

        // Date
        if (msg.includes('date') || msg.includes('tarikh') || msg.includes('today')) {
            const now = new Date();
            return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. 📅`;
        }

        // Jokes
        if (msg.includes('joke') || msg.includes('funny') || msg.includes('mazak')) {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything! 😄",
                "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
                "I told my wife she was drawing her eyebrows too high. She looked surprised! 😂",
                "Why don't eggs tell jokes? They'd crack each other up! 🥚"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }

        // Code/Programming
        if (msg.includes('code') || msg.includes('programming') || msg.includes('javascript') || msg.includes('react')) {
            return "I love talking about coding! 💻 What specific programming question do you have? I can help with JavaScript, React, CSS, and more!";
        }

        // Thanks
        if (msg.includes('thank') || msg.includes('shukriya') || msg.includes('thanks')) {
            return "You're welcome! 😊 Feel free to ask if you need anything else!";
        }

        // Bye
        if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('khuda hafiz') || msg.includes('allah hafiz')) {
            return "Goodbye! Have a great day! 👋 Come back anytime you need help!";
        }

        // Who are you
        if (msg.includes('who are you') || msg.includes('what are you') || msg.includes('tum kaun')) {
            return "I'm Meta AI, your helpful assistant! 🤖 I can answer questions, tell jokes, help with coding, and have friendly conversations. What would you like to know?";
        }

        // Food
        if (msg.includes('food') || msg.includes('eat') || msg.includes('hungry') || msg.includes('khana')) {
            return "Mmm, food! 🍕 I'd suggest trying some local Pakistani cuisine - biryani, nihari, or karahi are always great choices! What's your favorite food?";
        }

        // Music
        if (msg.includes('music') || msg.includes('song') || msg.includes('gana')) {
            return "I love music! 🎵 What genre do you enjoy - pop, rock, classical, or maybe some Coke Studio? Music is a great way to relax!";
        }

        // Default responses
        const defaults = [
            "That's interesting! Tell me more about it. 🤔",
            "I understand. Is there anything specific you'd like to know?",
            "Great question! Let me think about that... What else is on your mind?",
            "I'm here to help! Could you give me more details?",
            "That's a good point! What would you like to discuss?",
            "Interesting! I'd love to learn more about what you're thinking."
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMsg = message;
        setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'me',
            text: userMsg
        }]);
        setMessage('');
        setIsTyping(true);

        // Simulate AI thinking
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'ai',
                text: getAIResponse(userMsg)
            }]);
        }, 1000 + Math.random() * 1000);
    };

    return (
        <div className="chat-popup meta-ai-chat">
            {/* Header */}
            <div className="chat-header meta-ai-header">
                <div className="chat-user-info">
                    <div className="meta-ai-avatar">○</div>
                    <div className="chat-user-meta">
                        <span className="chat-user-name">Meta AI</span>
                        <span className="chat-status">Always active</span>
                    </div>
                </div>
                <div className="chat-header-actions">
                    <button className="chat-action" title="Minimize">—</button>
                    <button className="chat-action" title="Close" onClick={onClose}>✕</button>
                </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg.id} className={`chat-msg ${msg.sender === 'ai' ? 'them' : 'me'}`}>
                        {msg.sender === 'ai' && <div className="msg-avatar meta-ai-icon">○</div>}
                        <div className="msg-bubble">{msg.text}</div>
                    </div>
                ))}
                {isTyping && (
                    <div className="chat-msg them">
                        <div className="msg-avatar meta-ai-icon">○</div>
                        <div className="msg-bubble typing">Meta AI is typing...</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className="chat-input-area" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Ask Meta AI anything..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat-input"
                />
                <button type="submit" className="chat-send-btn">➤</button>
            </form>
        </div>
    );
}

export default MetaAIChat;
