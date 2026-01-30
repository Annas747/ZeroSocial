/**
 * Posts Routes
 * CRUD operations for posts, likes, and comments
 */

const express = require('express');
const router = express.Router();
const db = require('../database');

/**
 * GET /api/posts
 * Get all posts with user info, likes count, and comments
 */
router.get('/', (req, res) => {
    try {
        // Get all posts
        const posts = db.getAllPosts();

        // Enrich posts with user info and interactions
        const enrichedPosts = posts.map(post => {
            const user = db.findUserById(post.userId);
            const likes = db.getLikesByPostId(post.id);
            const comments = db.getCommentsByPostId(post.id).map(comment => {
                const commentUser = db.findUserById(comment.userId);
                return {
                    ...comment,
                    username: commentUser?.username,
                    displayName: commentUser?.displayName,
                    avatar: commentUser?.avatar,
                    profilePhoto: commentUser?.profilePhoto
                };
            });

            return {
                ...post,
                username: user?.username,
                displayName: user?.displayName,
                avatar: user?.avatar,
                profilePhoto: user?.profilePhoto,
                likesCount: likes.length,
                likedBy: likes.map(l => l.userId),
                comments
            };
        });

        res.json(enrichedPosts);
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * POST /api/posts
 * Create a new post
 */
router.post('/', (req, res) => {
    try {
        const { userId, content, imageUrl } = req.body;

        if (!userId || (!content && !imageUrl)) {
            return res.status(400).json({ error: 'userId and content or image required' });
        }

        const post = db.createPost(userId, content, imageUrl);
        const user = db.findUserById(userId);

        res.status(201).json({
            ...post,
            username: user?.username,
            displayName: user?.displayName,
            avatar: user?.avatar,
            profilePhoto: user?.profilePhoto,
            likesCount: 0,
            comments: [],
            likedBy: []
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * POST /api/posts/:id/like
 * Toggle like on a post
 */
router.post('/:id/like', (req, res) => {
    try {
        const postId = req.params.id;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'userId required' });
        }

        // Check if already liked
        const existing = db.findLike(postId, userId);

        if (existing) {
            // Unlike
            db.deleteLike(existing.id);
            res.json({ liked: false, message: 'Post unliked' });
        } else {
            // Like
            db.createLike(postId, userId);
            res.json({ liked: true, message: 'Post liked' });
        }
    } catch (error) {
        console.error('Like error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * POST /api/posts/:id/comment
 * Add a comment to a post
 */
router.post('/:id/comment', (req, res) => {
    try {
        const postId = req.params.id;
        const { userId, content } = req.body;

        if (!userId || !content) {
            return res.status(400).json({ error: 'userId and content required' });
        }

        const comment = db.createComment(postId, userId, content);
        const user = db.findUserById(userId);

        res.status(201).json({
            ...comment,
            username: user?.username,
            displayName: user?.displayName,
            avatar: user?.avatar,
            profilePhoto: user?.profilePhoto
        });
    } catch (error) {
        console.error('Comment error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
