/**
 * Feed Page - Exact Facebook Clone with Stories
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { getImageUrl } from '../config';
import { Link } from 'react-router-dom';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import ChatPopup from '../components/ChatPopup';
import MetaAIChat from '../components/MetaAIChat';
import { useAuth } from '../App';

function Feed() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeChat, setActiveChat] = useState(null);
    const [showMetaAI, setShowMetaAI] = useState(false);

    const contacts = [
        { id: 1, name: 'Mohsin Zafar', online: false },
        { id: 2, name: 'Nadeem Ali', online: true },
        { id: 3, name: 'Syed Ali Bahadur', online: false },
        { id: 4, name: 'Amer Kudeme', online: false },
        { id: 5, name: 'Amiesha Quiom', online: false },
        { id: 6, name: 'Rob Taylor', online: true },
        { id: 7, name: 'Laura Sofia Lemos', online: false },
        { id: 8, name: 'Syed Muneeb', online: false },
        { id: 9, name: 'Ebrahim Khalli', online: true },
        { id: 10, name: 'Danny Yonas', online: false },
    ];

    const stories = [
        { id: 0, name: 'Create story', isCreate: true },
        { id: 1, name: 'Irfan Junejo', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=250&fit=crop' },
        { id: 2, name: 'Israel Padilla', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=250&fit=crop' },
        { id: 3, name: 'Rosati Bistro', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=250&fit=crop' },
        { id: 4, name: 'Halal Vlogger', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=250&fit=crop' },
    ];

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts');
            setPosts(response.data);
        } catch (err) {
            console.error('Fetch posts error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, []);



    return (
        <div className="fb-feed-page">
            {/* Left Sidebar */}
            <aside className="fb-sidebar-left">
                <Link to={`/profile/${user?.id}`} className="sidebar-link user-link">
                    <div className="sidebar-avatar" style={{ backgroundImage: user?.profilePhoto ? `url(${getImageUrl(user.profilePhoto)})` : undefined }}>
                        {!user?.profilePhoto && (user?.displayName?.[0] || '?')}
                    </div>
                    <span>{user?.displayName || user?.username}</span>
                </Link>

                <button className="sidebar-link" onClick={() => setShowMetaAI(true)}><div className="icon-circle meta-ai">○</div><span>Meta AI</span></button>
                <button className="sidebar-link"><div className="icon-circle fb-blue">👥</div><span>Friends</span></button>
                <button className="sidebar-link"><div className="icon-circle orange">🔖</div><span>Saved</span></button>
                <button className="sidebar-link"><div className="icon-circle fb-blue">⏰</div><span>Memories</span></button>
                <button className="sidebar-link"><div className="icon-circle fb-blue">👥</div><span>Groups</span></button>
                <button className="sidebar-link"><div className="icon-circle fb-blue">▶</div><span>Video</span></button>
                <button className="sidebar-link"><div className="icon-circle fb-blue">🏪</div><span>Marketplace</span></button>
                <button className="sidebar-link see-more-link"><div className="icon-circle gray">▾</div><span>See more</span></button>

                <div className="sidebar-divider"></div>

                <div className="shortcuts-header"><span>Your shortcuts</span><span className="edit-link">Edit</span></div>
                <button className="sidebar-link"><div className="shortcut-icon red">🎮</div><span>Candy Crush Saga</span></button>
                <button className="sidebar-link"><div className="shortcut-icon purple">🎮</div><span>Candy Crush Soda Saga</span></button>
            </aside>

            {/* Main Feed */}
            <main className="fb-main-content">
                {/* Create Post */}
                <PostForm onPostCreated={fetchPosts} />

                {/* Stories */}
                <div className="stories-section">
                    {stories.map(story => (
                        <div key={story.id} className={`story-card ${story.isCreate ? 'create-story' : ''}`}>
                            {story.isCreate ? (
                                <>
                                    <div className="story-bg-user" style={{ backgroundImage: user?.profilePhoto ? `url(${getImageUrl(user.profilePhoto)})` : 'linear-gradient(135deg, #667eea, #764ba2)' }}></div>
                                    <div className="story-create-btn">+</div>
                                    <span className="story-name">Create story</span>
                                </>
                            ) : (
                                <>
                                    <div className="story-bg" style={{ backgroundImage: `url(${story.image})` }}>
                                        <div className="story-avatar-ring">
                                            <div className="story-poster-avatar">{story.name[0]}</div>
                                        </div>
                                    </div>
                                    <span className="story-name">{story.name}</span>
                                </>
                            )}
                        </div>
                    ))}
                    <button className="story-nav-btn">›</button>
                </div>

                {/* Group Invite Post */}
                <div className="group-invite-card">
                    <div className="group-invite-header">
                        <span><strong>Ali Rajput II</strong> invited you to join this group.</span>
                    </div>
                    <div className="group-invite-content">
                        <div className="group-icon-img">🎭</div>
                        <div className="group-info">
                            <span className="group-name">Our meme taste is different · <a href="#" className="join-link">Join</a></span>
                            <span className="group-meta">Nain Says · 23h · 🌐</span>
                        </div>
                        <div className="group-actions">
                            <button className="more-btn">•••</button>
                            <button className="close-btn">✕</button>
                        </div>
                    </div>
                    <div className="group-post-text">Can't wait 🌙✨🤩💛</div>
                    <div className="group-post-images">
                        <div className="post-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=300&h=300&fit=crop)' }}></div>
                        <div className="post-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&h=300&fit=crop)' }}></div>
                        <div className="post-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=300&h=300&fit=crop)' }}></div>
                    </div>
                </div>

                {/* Posts */}
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    posts.map(post => (
                        <PostCard key={post.id} post={post} onUpdate={fetchPosts} />
                    ))
                )}
            </main>

            {/* Right Sidebar */}
            <aside className="fb-sidebar-right">
                {/* Contacts Header */}
                <div className="contacts-header">
                    <span className="contacts-title">Contacts</span>
                    <div className="contacts-actions">
                        <button>🔍</button>
                        <button>•••</button>
                    </div>
                </div>

                {/* Contacts List */}
                <div className="contacts-list">
                    <div className="contact-row clickable" onClick={() => setShowMetaAI(true)}><div className="contact-av meta">○</div><span>Meta AI</span><span className="verified-badge">✓</span></div>
                    {contacts.map(contact => (
                        <div
                            key={contact.id}
                            className="contact-row clickable"
                            onClick={() => setActiveChat(contact)}
                        >
                            <div className="contact-av">{contact.name[0]}</div>
                            <span>{contact.name}</span>
                            {contact.online && <div className="online-dot"></div>}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Chat Popup */}
            {activeChat && (
                <ChatPopup
                    contact={activeChat}
                    onClose={() => setActiveChat(null)}
                />
            )}

            {/* Meta AI Chat */}
            {showMetaAI && (
                <MetaAIChat onClose={() => setShowMetaAI(false)} />
            )}
        </div>
    );
}

export default Feed;
