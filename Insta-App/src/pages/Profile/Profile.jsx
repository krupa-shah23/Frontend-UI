import React, { useState } from 'react';
import './Profile.css';

const posts = [
  {
    id: 101,
    user_id: 1,
    image: "/images/post1.jpg",
    caption: "Vibes only 🌈",
    likes: 230,
    comments: [
      { user: "kiaramehta", text: "Love this!" },
      { user: "rahulv", text: "🔥🔥🔥" }
    ]
  },
  {
    id: 102,
    user_id: 2,
    image: "/images/post2.jpg",
    caption: "Coffee time ☕",
    likes: 150,
    comments: [
      { user: "aarav_23", text: "Looks great!" }
    ]
  }
];

const users = [
  {
    id: 1,
    name: "Aarav Singh",
    username: "aarav_23",
    avatar: "/images/user1.jpg",
    bio: "Frontend dev who never sleeps."
  },
  {
    id: 2,
    name: "Kiara Mehta",
    username: "kiaramehta",
    avatar: "/images/user2.jpg",
    bio: "Coffee + CSS = best combo."
  }
];

function Profile() {

  
  const userId = 1;

  const user = users.find(u => u.id === userId);
  const userPosts = posts.filter(p => p.user_id === userId);
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="profile-bg">
      <div className="profile-header">

  <img src={user.avatar} alt="avatar" className="profile-avatar" />

  <div className="profile-info">
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <span className="profile-name">{user.name}</span>
      <button className="profile-edit-btn">Edit Profile</button>
    </div>

    <div className="profile-username">@{user.username}</div>
    <div className="profile-bio">{user.bio}</div>

    <div className="profile-stats">
      <span><b>{userPosts.length}</b> posts</span>
      <span><b>254</b> followers</span>
      <span><b>180</b> following</span>
    </div>
  </div>

</div>


      <div className="posts-grid">
        {userPosts.map(post => (
          <div key={post.id}
            className="post-thumb"
            onClick={() => setSelectedPost(post)}
          >
            <img src={post.image} alt="post" className="post-img" />
            <div className="post-overlay">
              ❤️ {post.likes} · 💬 {post.comments.length}
            </div>
          </div>
        ))}
      </div>


      {selectedPost && (
        <div className="post-modal">
          <div className="post-modal-content">
            <button
              className="post-modal-close"
              onClick={() => setSelectedPost(null)}
            >
              ✕
            </button>

            <img src={selectedPost.image} alt="post" className="post-modal-img" />

            <div className="post-modal-likes">
              ❤️ {selectedPost.likes} likes
            </div>

            <div className="post-modal-caption">
              {selectedPost.caption}
            </div>

            <div className="post-modal-comments">
              <b>Comments:</b>
              <ul>
                {selectedPost.comments.map((comment, idx) =>
                  <li key={idx}>
                    <b>{comment.user}:</b> {comment.text}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;
