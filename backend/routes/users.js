/**
 * Users Routes
 * User profile and posts
 */

const express = require('express');
const router = express.Router();
const db = require('../database');

/**
 * GET /api/users/:id
 * Get user profile with their posts
 */
router.get('/:id', (req, res) => {
    try {
        const userId = req.params.id;

        // Get user info
        const user = db.findUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get user's posts with stats
        const posts = db.getPostsByUserId(userId).map(post => ({
            ...post,
            likesCount: db.getLikesCountForPost(post.id),
            commentsCount: db.getCommentsCountForPost(post.id)
        }));

        // Get stats
        const stats = {
            postsCount: posts.length,
            likesReceived: db.getLikesReceivedByUser(userId)
        };

        // Return without password
        const { password, ...safeUser } = user;
        res.json({
            ...safeUser,
            posts,
            stats
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * PUT /api/users/:id
 * Update user profile (including photos)
 */
router.put('/:id', (req, res) => {
    try {
        const userId = req.params.id;
        const { displayName, avatar, bio, profilePhoto, coverPhoto } = req.body;

        const updates = {};
        if (displayName !== undefined) updates.displayName = displayName;
        if (avatar !== undefined) updates.avatar = avatar;
        if (bio !== undefined) updates.bio = bio;
        if (profilePhoto !== undefined) updates.profilePhoto = profilePhoto;
        if (coverPhoto !== undefined) updates.coverPhoto = coverPhoto;

        const user = db.updateUser(userId, updates);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password, ...safeUser } = user;
        res.json(safeUser);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
