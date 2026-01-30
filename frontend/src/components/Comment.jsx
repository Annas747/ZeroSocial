/**
 * Comment Component
 * Displays a single comment
 */

function Comment({ comment }) {
    return (
        <div className="comment">
            <div className="comment-avatar">{comment.avatar || '👤'}</div>
            <div className="comment-body">
                <span className="comment-username">{comment.displayName || comment.username}</span>
                <p className="comment-text">{comment.content}</p>
            </div>
        </div>
    );
}

export default Comment;
