/**
 * Authentication Routes
 * Handles user signup and login
 * Simple auth - no encryption for demo purposes
 */

const express = require('express');
const router = express.Router();
const db = require('../database');

/**
 * POST /api/auth/signup
 * Create a new user account
 */
router.post('/signup', (req, res) => {
    try {
        const { username, password, displayName } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        // Check if user already exists
        const existing = db.findUserByUsername(username);
        if (existing) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Create new user
        const user = db.createUser(username, password, displayName);

        // Return user data (without password)
        const { password: _, ...safeUser } = user;
        res.status(201).json({ message: 'Account created!', user: safeUser });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * POST /api/auth/login
 * Authenticate user and return user data
 */
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        // Find user
        const user = db.findUserByUsername(username);

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Return user data (without password)
        const { password: _, ...safeUser } = user;
        res.json({ message: 'Login successful!', user: safeUser });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
