/**
 * Seed Database with More Posts and Photos
 */

const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'data.json');

const sampleData = {
    users: [
        { id: 1, username: "annasahmed", password: "password123", displayName: "Annas Ahmed", profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg", coverPhoto: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=940&h=350&fit=crop", bio: "Living my best life", createdAt: "2024-01-15T10:00:00.000Z" },
        { id: 2, username: "pichvyda", password: "password123", displayName: "Pichvyda Tuy", profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg", coverPhoto: null, bio: "Photographer & Traveler", createdAt: "2024-01-16T14:30:00.000Z" },
        { id: 3, username: "sheikhAdnan", password: "password123", displayName: "Sheikh Adnan Ahmed", profilePhoto: "https://randomuser.me/api/portraits/men/55.jpg", coverPhoto: null, bio: "Tech enthusiast", createdAt: "2024-01-17T09:15:00.000Z" },
        { id: 4, username: "nadeemali", password: "password123", displayName: "Nadeem Ali", profilePhoto: "https://randomuser.me/api/portraits/men/22.jpg", coverPhoto: null, bio: "Developer", createdAt: "2024-01-18T16:45:00.000Z" },
        { id: 5, username: "uzairfarooq", password: "password123", displayName: "Uzair Farooq", profilePhoto: "https://randomuser.me/api/portraits/men/36.jpg", coverPhoto: null, bio: "Designer", createdAt: "2024-01-19T11:20:00.000Z" },
        { id: 6, username: "fatima", password: "password123", displayName: "Fatima Gull Muhammad", profilePhoto: "https://randomuser.me/api/portraits/women/65.jpg", coverPhoto: null, bio: "Artist", createdAt: "2024-01-20T08:00:00.000Z" },
        { id: 7, username: "sarahwilson", password: "password123", displayName: "Sarah Wilson", profilePhoto: "https://randomuser.me/api/portraits/women/33.jpg", coverPhoto: null, bio: "React Developer", createdAt: "2024-01-21T09:00:00.000Z" },
        { id: 8, username: "mikejohnson", password: "password123", displayName: "Mike Johnson", profilePhoto: "https://randomuser.me/api/portraits/men/41.jpg", coverPhoto: null, bio: "Full Stack Dev", createdAt: "2024-01-22T10:00:00.000Z" },
        { id: 9, username: "emilydavis", password: "password123", displayName: "Emily Davis", profilePhoto: "https://randomuser.me/api/portraits/women/28.jpg", coverPhoto: null, bio: "UX Designer", createdAt: "2024-01-23T11:00:00.000Z" },
        { id: 10, username: "chrisbrown", password: "password123", displayName: "Chris Brown", profilePhoto: "https://randomuser.me/api/portraits/men/75.jpg", coverPhoto: null, bio: "Photographer", createdAt: "2024-01-24T12:00:00.000Z" },
        { id: 11, username: "jessicalee", password: "password123", displayName: "Jessica Lee", profilePhoto: "https://randomuser.me/api/portraits/women/47.jpg", coverPhoto: null, bio: "Travel Blogger", createdAt: "2024-01-25T10:00:00.000Z" },
        { id: 12, username: "davidmiller", password: "password123", displayName: "David Miller", profilePhoto: "https://randomuser.me/api/portraits/men/29.jpg", coverPhoto: null, bio: "Software Engineer", createdAt: "2024-01-26T10:00:00.000Z" }
    ],
    posts: [
        { id: 1, userId: 1, content: "Choti do bhar bachon ko", imageUrl: null, createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
        { id: 2, userId: 1, content: "🥰🥰🥰", imageUrl: null, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() },
        { id: 3, userId: 2, content: "Beautiful day for a hike! 🏔️", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
        { id: 4, userId: 1, content: "Night vibes in the city 🌃", imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
        { id: 5, userId: 7, content: "Just finished building my first React app! 🚀 The journey of learning web development has been incredible. Can't wait to share more projects with you all!", imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
        { id: 6, userId: 2, content: "Helicopter footage captured the moment a Chicago crossing guard helped a child cross a frigid flooded street after a water main break. \"It's not in th...See more", imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
        { id: 7, userId: 10, content: "Golden hour photography is the best ✨📸", imageUrl: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
        { id: 8, userId: 11, content: "Travel throwback! 🌴✈️ Missing this view so much.", imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString() },
        { id: 9, userId: 9, content: "New UI design concept I'm working on 🎨", imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
        { id: 10, userId: 8, content: "Code review session with the team 💻", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString() },
        { id: 11, userId: 4, content: "Morning coffee and coding ☕", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
        { id: 12, userId: 5, content: "New design project coming soon! 🎨", imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 84).toISOString() },
        { id: 13, userId: 6, content: "Art exhibition was amazing today! 🖼️", imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString() },
        { id: 14, userId: 3, content: "Weekend vibes 🌊", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 108).toISOString() },
        { id: 15, userId: 12, content: "Deployed a new feature today! 🚀", imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString() }
    ],
    comments: [
        { id: 1, postId: 3, userId: 1, content: "Stunning view! 😍", createdAt: new Date().toISOString() },
        { id: 2, postId: 3, userId: 4, content: "Where is this?", createdAt: new Date().toISOString() },
        { id: 3, postId: 5, userId: 1, content: "Congrats! 🎉", createdAt: new Date().toISOString() },
        { id: 4, postId: 5, userId: 8, content: "Amazing work!", createdAt: new Date().toISOString() },
        { id: 5, postId: 6, userId: 1, content: "Hero! 🙌", createdAt: new Date().toISOString() },
        { id: 6, postId: 7, userId: 2, content: "Beautiful shot!", createdAt: new Date().toISOString() },
        { id: 7, postId: 8, userId: 1, content: "Take me there! ✈️", createdAt: new Date().toISOString() },
        { id: 8, postId: 9, userId: 7, content: "Love the colors!", createdAt: new Date().toISOString() },
        { id: 9, postId: 10, userId: 12, content: "Productive day!", createdAt: new Date().toISOString() },
        { id: 10, postId: 11, userId: 1, content: "Best way to start the day ☕", createdAt: new Date().toISOString() }
    ],
    likes: [
        { id: 1, postId: 3, userId: 1 }, { id: 2, postId: 3, userId: 4 }, { id: 3, postId: 3, userId: 5 },
        { id: 4, postId: 3, userId: 6 }, { id: 5, postId: 3, userId: 7 }, { id: 6, postId: 3, userId: 8 },
        { id: 7, postId: 5, userId: 1 }, { id: 8, postId: 5, userId: 2 }, { id: 9, postId: 5, userId: 3 },
        { id: 10, postId: 5, userId: 4 }, { id: 11, postId: 5, userId: 8 }, { id: 12, postId: 5, userId: 9 },
        { id: 13, postId: 6, userId: 1 }, { id: 14, postId: 6, userId: 3 }, { id: 15, postId: 6, userId: 7 },
        { id: 16, postId: 7, userId: 1 }, { id: 17, postId: 7, userId: 2 }, { id: 18, postId: 7, userId: 11 },
        { id: 19, postId: 8, userId: 1 }, { id: 20, postId: 8, userId: 9 }, { id: 21, postId: 8, userId: 10 },
        { id: 22, postId: 9, userId: 1 }, { id: 23, postId: 9, userId: 7 }, { id: 24, postId: 9, userId: 8 },
        { id: 25, postId: 10, userId: 1 }, { id: 26, postId: 10, userId: 7 }, { id: 27, postId: 10, userId: 12 },
        { id: 28, postId: 11, userId: 1 }, { id: 29, postId: 11, userId: 8 }, { id: 30, postId: 12, userId: 1 }
    ],
    nextUserId: 13, nextPostId: 16, nextCommentId: 11, nextLikeId: 31
};

fs.writeFileSync(DATA_FILE, JSON.stringify(sampleData, null, 2));
console.log('✅ Database seeded with posts and photos!');
console.log('📝 15 posts, 12 users, 10 comments, 30 likes');
console.log('Login: annasahmed / password123');
