/**
 * PostForm Component - Exact Facebook Style
 */

import { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../App';

function PostForm({ onPostCreated }) {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const getPhotoUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        if (url.startsWith('/uploads')) return `http://localhost:3001${url}`;
        return url;
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setIsExpanded(true);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !selectedFile) return;

        setLoading(true);
        try {
            let imageUrl = null;
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const uploadResponse = await axios.post('/api/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imageUrl = uploadResponse.data.url;
            }

            await axios.post('/api/posts', { userId: user.id, content: content.trim(), imageUrl });
            setContent('');
            setSelectedFile(null);
            setPreviewUrl(null);
            setIsExpanded(false);
            if (onPostCreated) onPostCreated();
        } catch (error) {
            console.error('Create post error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-card">
            <form onSubmit={handleSubmit}>
                <div className="create-post-row">
                    <div className="create-avatar" style={{ backgroundImage: user?.profilePhoto ? `url(${getPhotoUrl(user.profilePhoto)})` : undefined }}>
                        {!user?.profilePhoto && (user?.displayName?.[0] || '?')}
                    </div>
                    {!isExpanded ? (
                        <button type="button" className="create-input-btn" onClick={() => setIsExpanded(true)}>
                            What's on your mind, {user?.displayName?.split(' ')[0] || user?.username}?
                        </button>
                    ) : (
                        <textarea
                            className="create-textarea"
                            placeholder={`What's on your mind, ${user?.displayName?.split(' ')[0]}?`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            autoFocus
                        />
                    )}
                </div>

                <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*,video/*" hidden />

                {previewUrl && (
                    <div className="preview-wrapper">
                        <img src={previewUrl} alt="Preview" />
                        <button type="button" className="preview-close" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}>×</button>
                    </div>
                )}

                {isExpanded && (
                    <div className="create-submit-row">
                        <button type="button" className="btn-cancel" onClick={() => { setIsExpanded(false); setContent(''); setSelectedFile(null); setPreviewUrl(null); }}>Cancel</button>
                        <button type="submit" className="btn-post" disabled={(!content.trim() && !selectedFile) || loading}>{loading ? 'Posting...' : 'Post'}</button>
                    </div>
                )}

                {!isExpanded && (
                    <>
                        <div className="create-divider"></div>
                        <div className="create-actions">
                            <button type="button" className="create-btn" onClick={() => fileInputRef.current?.click()}>
                                <span className="icon-live">📹</span> Live video
                            </button>
                            <button type="button" className="create-btn" onClick={() => fileInputRef.current?.click()}>
                                <span className="icon-photo">🖼</span> Photo/video
                            </button>
                            <button type="button" className="create-btn" onClick={() => setIsExpanded(true)}>
                                <span className="icon-feeling">😊</span> Feeling/activity
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default PostForm;
