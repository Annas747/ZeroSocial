/**
 * ZeroSocial Database - JSON File Storage
 * Simple file-based storage for demo purposes
 * Data persists in data.json file
 */

const fs = require('fs');
const path = require('path');

// Path to our JSON database file
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize empty database structure
const defaultData = {
  users: [],
  posts: [],
  comments: [],
  likes: [],
  nextUserId: 1,
  nextPostId: 1,
  nextCommentId: 1,
  nextLikeId: 1
};

/**
 * Load data from JSON file
 * Creates file with default data if it doesn't exist
 */
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return { ...defaultData };
}

/**
 * Save data to JSON file
 */
function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Database helper object with query methods
const db = {
  // ============ USERS ============

  findUserByUsername(username) {
    const data = loadData();
    return data.users.find(u => u.username === username);
  },

  findUserById(id) {
    const data = loadData();
    return data.users.find(u => u.id === parseInt(id));
  },

  createUser(username, password, displayName) {
    const data = loadData();
    const user = {
      id: data.nextUserId++,
      username,
      password,
      displayName: displayName || username,
      avatar: '👤',
      profilePhoto: null,
      coverPhoto: null,
      bio: '',
      createdAt: new Date().toISOString()
    };
    data.users.push(user);
    saveData(data);
    return user;
  },

  updateUser(id, updates) {
    const data = loadData();
    const user = data.users.find(u => u.id === parseInt(id));
    if (user) {
      Object.assign(user, updates);
      saveData(data);
    }
    return user;
  },

  // ============ POSTS ============

  getAllPosts() {
    const data = loadData();
    // Return posts sorted by newest first
    return [...data.posts].sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  getPostsByUserId(userId) {
    const data = loadData();
    return data.posts
      .filter(p => p.userId === parseInt(userId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createPost(userId, content, imageUrl) {
    const data = loadData();
    const post = {
      id: data.nextPostId++,
      userId: parseInt(userId),
      content,
      imageUrl: imageUrl || null,
      createdAt: new Date().toISOString()
    };
    data.posts.push(post);
    saveData(data);
    return post;
  },

  // ============ COMMENTS ============

  getCommentsByPostId(postId) {
    const data = loadData();
    return data.comments.filter(c => c.postId === parseInt(postId));
  },

  createComment(postId, userId, content) {
    const data = loadData();
    const comment = {
      id: data.nextCommentId++,
      postId: parseInt(postId),
      userId: parseInt(userId),
      content,
      createdAt: new Date().toISOString()
    };
    data.comments.push(comment);
    saveData(data);
    return comment;
  },

  // ============ LIKES ============

  getLikesByPostId(postId) {
    const data = loadData();
    return data.likes.filter(l => l.postId === parseInt(postId));
  },

  findLike(postId, userId) {
    const data = loadData();
    return data.likes.find(l =>
      l.postId === parseInt(postId) && l.userId === parseInt(userId)
    );
  },

  createLike(postId, userId) {
    const data = loadData();
    const like = {
      id: data.nextLikeId++,
      postId: parseInt(postId),
      userId: parseInt(userId),
      createdAt: new Date().toISOString()
    };
    data.likes.push(like);
    saveData(data);
    return like;
  },

  deleteLike(likeId) {
    const data = loadData();
    const index = data.likes.findIndex(l => l.id === likeId);
    if (index !== -1) {
      data.likes.splice(index, 1);
      saveData(data);
    }
  },

  // ============ STATS ============

  getLikesCountForPost(postId) {
    const data = loadData();
    return data.likes.filter(l => l.postId === parseInt(postId)).length;
  },

  getCommentsCountForPost(postId) {
    const data = loadData();
    return data.comments.filter(c => c.postId === parseInt(postId)).length;
  },

  getLikesReceivedByUser(userId) {
    const data = loadData();
    const userPostIds = data.posts
      .filter(p => p.userId === parseInt(userId))
      .map(p => p.id);
    return data.likes.filter(l => userPostIds.includes(l.postId)).length;
  }
};

console.log('✅ JSON Database initialized');

module.exports = db;
