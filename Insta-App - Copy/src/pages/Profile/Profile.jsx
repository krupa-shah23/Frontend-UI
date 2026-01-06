import { useEffect, useState } from "react";
import "./Profile.css";
import { getMe } from "../../api/auth";
import EmptyProfile from "../../components/EmptyProfile";


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
    user_id: 1,
    image: "/images/post2.jpg",
    caption: "Coffee time ☕",
    likes: 150,
    comments: [
      { user: "aarav_23", text: "Looks great!" }
    ]
  }
];

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try 
      {
        const res = await getMe();
        console.log("ME API RESPONSE:", res.data);
        setUser(res.data.user);
      } 
      catch (err) 
      {
        console.error(err);
      } 
      finally 
      {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) 
  {
    return <p style={{ color: "white" }}>Loading profile...</p>;
  }

  if (!user) 
  {
    return (
      <EmptyProfile
        username="new_user"
        bio="Add a bio to tell people about yourself"
      />
    );
  }


  const userPosts = posts.filter(p => p.user_id === user.id);

  return (
    <div className="profile-bg">
      <pre style={{ color: "white" }}>
        {JSON.stringify(user, null, 2)}
      </pre>

      <div className="profile-header">

        <img
          src="/images/user1.jpg"
          alt="avatar"
          className="profile-avatar"
        />

        <div className="profile-info">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span className="profile-name">{user.name}</span>
            <button className="profile-edit-btn">Edit Profile</button>
          </div>

          <div className="profile-username">{user.email}</div>
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
          <div
            key={post.id}
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

            <img
              src={selectedPost.image}
              alt="post"
              className="post-modal-img"
            />

            <div className="post-modal-likes">
              ❤️ {selectedPost.likes} likes
            </div>

            <div className="post-modal-caption">
              {selectedPost.caption}
            </div>

            <div className="post-modal-comments">
              <b>Comments:</b>
              <ul>
                {selectedPost.comments.map((comment, idx) => (
                  <li key={idx}>
                    <b>{comment.user}:</b> {comment.text}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;
