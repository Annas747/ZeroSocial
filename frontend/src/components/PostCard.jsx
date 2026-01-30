/**
 * PostCard Component - Exact Facebook Style
 */

import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';

function PostCard({ post, onUpdate }) {
    const { user } = useAuth();
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    const isLiked = post.likedBy?.includes(user.id);

    const getPhotoUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        if (url.startsWith('/uploads')) return `http://localhost:3001${url}`;
        return url;
    };

    const handleLike = async () => {
        try {
            await axios.post(`/api/posts/${post.id}/like`, { userId: user.id });
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Like error:', error);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        try {
            await axios.post(`/api/posts/${post.id}/comment`, { userId: user.id, content: commentText });
            setCommentText('');
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Comment error:', error);
        }
    };

    const formatTime = (timestamp) => {
        const diff = Date.now() - new Date(timestamp);
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
        return `${Math.floor(diff / 86400000)}d`;
    };

    return (
        <div className="fb-post-card">
            <div className="post-top">
                <Link to={`/profile/${post.userId}`} className="post-user-avatar" style={{ backgroundImage: post.profilePhoto ? `url(${getPhotoUrl(post.profilePhoto)})` : undefined }}>
                    {!post.profilePhoto && (post.displayName?.[0] || post.username?.[0] || '?')}
                </Link>
                <div className="post-user-meta">
                    <Link to={`/profile/${post.userId}`} className="post-user-name">{post.displayName || post.username}</Link>
                    <span className="post-time-text">{formatTime(post.createdAt)} · 🌐</span>
                </div>
                <button className="post-more">•••</button>
                <button className="post-close">×</button>
            </div>

            {post.content && <p className="post-body-text">{post.content}</p>}
            {post.imageUrl && <img src={getPhotoUrl(post.imageUrl)} alt="" className="post-image-full" />}

            <div className="post-reactions">
                <div className="reactions-icons">
                    {post.likesCount > 0 && (
                        <>
                            <span className="reaction-like">👍</span>
                            <span className="reaction-heart">❤</span>
                            <span className="reaction-count">{post.likesCount}</span>
                        </>
                    )}
                </div>
                <div className="reactions-stats">
                    {post.commentsCount > 0 && <button onClick={() => setShowComments(!showComments)}>{post.commentsCount} comments</button>}
                </div>
            </div>

            <div className="post-actions-row">
                <button className={isLiked ? 'liked' : ''} onClick={handleLike}><span>👍</span> Like</button>
                <button onClick={() => setShowComments(!showComments)}><span>💬</span> Comment</button>
                <button><span>↗</span> Share</button>
            </div>

            {showComments && (
                <div className="comments-section">
                    {post.comments?.map(c => (
                        <div key={c.id} className="comment-row">
                            <div className="comment-user-avatar">{c.displayName?.[0] || '?'}</div>
                            <div className="comment-bubble">
                                <strong>{c.displayName || c.username}</strong>
                                <span>{c.content}</span>
                            </div>
                        </div>
                    ))}
                    <form className="comment-input-row" onSubmit={handleComment}>
                        <div className="comment-my-avatar">{user?.displayName?.[0] || '?'}</div>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </form>
                </div>
            )}
        </div>
    );
}

export default PostCard;
