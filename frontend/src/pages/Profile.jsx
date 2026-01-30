/**
 * Profile Page - Exact Facebook Clone
 * Matches user's screenshot
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

function Profile() {
    const { userId } = useParams();
    const { user: currentUser, login } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    const [viewMode, setViewMode] = useState('list');

    const profilePhotoRef = useRef(null);
    const coverPhotoRef = useRef(null);

    const isOwnProfile = currentUser?.id === parseInt(userId);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`/api/users/${userId}`);
            setProfile(response.data);
        } catch (err) {
            console.error('Fetch profile error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProfile(); }, [userId]);

    const handlePhotoUpload = async (file, type) => {
        if (!file) return;
        try {
            const formData = new FormData();
            formData.append('file', file);
            const uploadResponse = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const photoUrl = uploadResponse.data.url;
            const updateData = type === 'profile' ? { profilePhoto: photoUrl } : { coverPhoto: photoUrl };
            await axios.put(`/api/users/${userId}`, updateData);
            setProfile(prev => ({ ...prev, ...updateData }));
            if (isOwnProfile) login({ ...currentUser, ...updateData });
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    const getPhotoUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        if (url.startsWith('/uploads')) return `http://localhost:3001${url}`;
        return url;
    };

    const formatTime = (timestamp) => {
        const diff = Date.now() - new Date(timestamp);
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
        return `${Math.floor(diff / 86400000)}d`;
    };


    // Dummy friends data with photos
    const friends = [
        { name: 'Muhammad Hassan Wattu', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Doha Annas', photo: 'https://randomuser.me/api/portraits/men/44.jpg' },
        { name: 'Aiman Fatima', photo: 'https://randomuser.me/api/portraits/women/65.jpg' },
        { name: 'Usama Ahmed', photo: 'https://randomuser.me/api/portraits/men/22.jpg' },
        { name: 'Hammad Ahmed', photo: 'https://randomuser.me/api/portraits/men/36.jpg' },
        { name: 'Hassan Yaseen', photo: 'https://randomuser.me/api/portraits/men/55.jpg' },
        { name: 'Mohammad Anas', photo: 'https://randomuser.me/api/portraits/men/41.jpg' },
        { name: 'Habib Ullah', photo: 'https://randomuser.me/api/portraits/men/29.jpg' },
        { name: 'Azlan Shah', photo: 'https://randomuser.me/api/portraits/men/75.jpg' },
    ];

    if (loading) {
        return <div className="profile-loading"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="fb-profile-page">
            {/* Header Section */}
            <div className="profile-header-wrapper">
                <div
                    className="profile-cover-img"
                    style={{ backgroundImage: profile?.coverPhoto ? `url(${getPhotoUrl(profile.coverPhoto)})` : 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
                    onClick={() => isOwnProfile && coverPhotoRef.current?.click()}
                ></div>

                <div className="profile-info-bar">
                    <div
                        className="profile-main-photo"
                        style={{ backgroundImage: profile?.profilePhoto ? `url(${getPhotoUrl(profile.profilePhoto)})` : undefined }}
                        onClick={() => isOwnProfile && profilePhotoRef.current?.click()}
                    >
                        {!profile?.profilePhoto && <span>{profile?.displayName?.[0] || '?'}</span>}
                        {isOwnProfile && <div className="camera-badge">📷</div>}
                    </div>

                    <div className="profile-info-text">
                        <h1>{profile?.displayName || profile?.username}</h1>
                        <p className="friends-count">203 friends</p>
                        <div className="profile-mini-badges">
                            <span>😊</span><span>🌐</span>
                        </div>
                        <p className="profile-location">📍 Houston, Texas</p>
                    </div>

                    <div className="profile-action-btns">
                        {isOwnProfile ? (
                            <>
                                <button className="btn-blue">+ Add to story</button>
                                <button className="btn-gray">✏ Edit profile</button>
                                <button className="btn-gray-sm">▾</button>
                            </>
                        ) : (
                            <>
                                <button className="btn-blue">+ Add friend</button>
                                <button className="btn-gray">💬 Message</button>
                            </>
                        )}
                    </div>
                </div>

                <input type="file" ref={profilePhotoRef} onChange={(e) => handlePhotoUpload(e.target.files[0], 'profile')} accept="image/*" hidden />
                <input type="file" ref={coverPhotoRef} onChange={(e) => handlePhotoUpload(e.target.files[0], 'cover')} accept="image/*" hidden />

                {/* Tabs */}
                <div className="profile-tabs-nav">
                    {['All', 'About', 'Friends', 'Photos', 'Reels', 'More'].map(tab => (
                        <button
                            key={tab}
                            className={`tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab} {tab === 'More' && '▾'}
                        </button>
                    ))}
                    <button className="more-btn">•••</button>
                </div>
            </div>

            {/* Content */}
            <div className="profile-body">
                {/* Left Column */}
                <div className="profile-col-left">
                    {/* Personal Details */}
                    <div className="profile-card">
                        <div className="card-header-row">
                            <h3>Personal details</h3>
                            {isOwnProfile && <button className="edit-icon">✏</button>}
                        </div>
                        <div className="detail-row"><span className="detail-icon">📍</span><span>Lives in <strong>Houston, Texas</strong></span></div>
                        <div className="detail-row"><span className="detail-icon">🏠</span><span>From <strong>Karachi, Pakistan</strong></span></div>
                        <div className="detail-row"><span className="detail-icon">🎂</span><span>October 5</span></div>
                        <div className="detail-row">
                            <span className="detail-icon">💍</span>
                            <span>Married to <strong>Doha Annas</strong> ❤</span>
                        </div>
                        <div className="detail-sub">Since February 12, 2022</div>
                        <div className="detail-row"><span className="detail-icon">⚥</span><span>Male</span></div>
                    </div>

                    {/* Work */}
                    <div className="profile-card">
                        <div className="card-header-row">
                            <h3>Work</h3>
                            {isOwnProfile && <button className="edit-icon">✏</button>}
                        </div>
                        <div className="work-item">
                            <div className="work-icon">💼</div>
                            <div className="work-info">
                                <strong>FQ Garments</strong>
                                <span>Apparel Merchandiser</span>
                                <span className="work-date">Jul 1, 2021 - Present · 4 years, 6 months</span>
                            </div>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="profile-card">
                        <h3>Highlights</h3>
                        <button className="add-highlights-btn">+ Add highlights</button>
                    </div>

                    {/* Friends */}
                    <div className="profile-card">
                        <div className="card-header-row">
                            <h3>Friends</h3>
                            <a href="#" className="see-all-link">See all friends</a>
                        </div>
                        <p className="small-text">203 friends</p>
                        <div className="friends-grid-3x3">
                            {friends.map((friend, i) => (
                                <div key={i} className="friend-box">
                                    <div className="friend-photo-box" style={{ backgroundImage: `url(${friend.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <span className="friend-name-small">{friend.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Photos */}
                    <div className="profile-card">
                        <div className="card-header-row">
                            <h3>Photos</h3>
                            <a href="#" className="see-all-link">See all photos</a>
                        </div>
                        <div className="photos-grid-4x4">
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518173946687-a4c036bc1d9d?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                            <div className="photo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop)', backgroundSize: 'cover' }}></div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="profile-col-right">
                    {/* Create Post */}
                    {isOwnProfile && <PostForm onPostCreated={fetchProfile} />}

                    {/* Posts Header */}
                    <div className="posts-header-card">
                        <h3>Posts</h3>
                        <div className="posts-controls">
                            <button className="control-btn">⚙ Filters</button>
                            <button className="control-btn">⚙ Manage posts</button>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="view-toggle">
                        <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                            ≡ List view
                        </button>
                        <button className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                            ⊞ Grid view
                        </button>
                    </div>

                    {/* Posts */}
                    {profile?.posts?.length === 0 ? (
                        <div className="no-posts-msg">No posts yet</div>
                    ) : (
                        profile?.posts?.map(post => (
                            <PostCard key={post.id} post={{ ...post, displayName: profile.displayName, username: profile.username, profilePhoto: profile.profilePhoto }} onUpdate={fetchProfile} />
                        ))
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="profile-footer">
                <span>Privacy</span> · <span>Consumer Health Privacy</span> · <span>Terms</span> · <span>Advertising</span> · <span>Ad Choices</span> · <span>Cookies</span> · <span>More</span>
            </div>
        </div>
    );
}

export default Profile;
