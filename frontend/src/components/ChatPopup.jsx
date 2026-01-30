/**
 * ChatPopup Component - With Photo Upload
 */

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function ChatPopup({ contact, onClose }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, sender: 'me', text: 'ha', time: '5m' },
        { id: 2, sender: 'me', text: 'Wo ghr he hota ha purana phone ha', time: '5m' },
        { id: 3, sender: 'them', text: 'Achaaaa Achaaa', time: '4m' },
        { id: 4, sender: 'me', text: 'Wo sath nae lata', time: '4m' },
        { id: 5, sender: 'me', text: 'Ghr ja kay msg krta', time: '3m' },
        { id: 6, sender: 'them', text: 'Achaaaa Sahiii Jbhii', time: '2m' },
    ]);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'me',
            text: message,
            time: 'now'
        }]);
        setMessage('');

        // Fake reply after 1 second
        setTimeout(() => {
            const replies = ['Haan bhai', 'Achaa theek hai', 'Ok 👍', 'Haha nice', 'Ji bilkul', 'Sahi keh rahe ho'];
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'them',
                text: replies[Math.floor(Math.random() * replies.length)],
                time: 'now'
            }]);
        }, 1000);
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create preview immediately
        const previewUrl = URL.createObjectURL(file);
        setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'me',
            image: previewUrl,
            time: 'now'
        }]);

        // Upload to server
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Photo uploaded:', response.data);
        } catch (err) {
            console.error('Upload error:', err);
        }

        // Fake reply
        setTimeout(() => {
            const replies = ['Nice photo! 📸', 'Wow! 🔥', 'Beautiful! 😍', 'Zabardast!', 'Amazing pic!'];
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'them',
                text: replies[Math.floor(Math.random() * replies.length)],
                time: 'now'
            }]);
        }, 1500);

        // Clear input
        e.target.value = '';
    };

    return (
        <div className="chat-popup">
            {/* Header */}
            <div className="chat-header">
                <div className="chat-user-info">
                    <div className="chat-avatar">{contact.name[0]}</div>
                    <div className="chat-user-meta">
                        <span className="chat-user-name">{contact.name}</span>
                        <span className="chat-status">Active 5m ago</span>
                    </div>
                </div>
                <div className="chat-header-actions">
                    <button className="chat-action" title="Call">📞</button>
                    <button className="chat-action" title="Video">📹</button>
                    <button className="chat-action" title="Minimize">—</button>
                    <button className="chat-action" title="Close" onClick={onClose}>✕</button>
                </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                        {msg.sender === 'them' && <div className="msg-avatar">{contact.name[0]}</div>}
                        {msg.image ? (
                            <img src={msg.image} alt="Shared" className="msg-image" />
                        ) : (
                            <div className="msg-bubble">{msg.text}</div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
                <div className="chat-encryption">
                    🔒 End-to-end encrypted. <a href="#">Learn more</a>
                </div>
            </div>

            {/* Input */}
            <form className="chat-input-area" onSubmit={handleSend}>
                <button type="button" className="chat-btn" onClick={() => fileInputRef.current?.click()}>🖼️</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    hidden
                />
                <input
                    type="text"
                    placeholder="Aa"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat-input"
                />
                <button type="button" className="chat-btn">😊</button>
                <button type="submit" className="chat-send-btn">👍</button>
            </form>
        </div>
    );
}

export default ChatPopup;
