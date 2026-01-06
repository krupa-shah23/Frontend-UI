import "./Profile.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import postsData from "../../data/posts.json";
import PostModal from "./PostModal";


export default function Profile() 
{
  const { user, loading } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);

  if (loading) 
  {
    return <div className="profile">Loading profile...</div>;
  }

  if (!user) 
  {
    return <div className="profile">User not found</div>;
  }

  
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name
  )}&background=0D1117&color=00FF88&size=256`;

  
  const userPosts = postsData.map((post) => 
  ({
    ...post,
    user: 
    {
      username: user.name.split(" ")[0].toLowerCase(),
      avatar,
    },
  
  }));

  return (
    
    <div className="profile">

      <div className="profile-header">
        
        <img
          className="profile-avatar"
          src={avatar}
          alt={user.name}
        />

        <div className="profile-info">
          
          <div className="profile-top">
            
            <h2>{user.name.split(" ")[0].toLowerCase()}</h2>
            <button className="edit-btn">Edit Profile</button>
          
          </div>

          <div className="profile-stats">
            
            <span><strong>{userPosts.length}</strong> posts</span>
            <span><strong>0</strong> followers</span>
            <span><strong>0</strong> following</span>
          
          </div>

          <div className="profile-bio">
            
            <strong>{user.name}</strong>
            <p>{user.bio || "No bio yet"}</p>
          </div>
        
        </div>
      
      </div>

      <div className="profile-divider" />
      
      <div className="profile-tabs">
        <span className="active">Posts</span>
        <span>Tagged</span>
      </div>

      <div className="profile-posts">
        
        {userPosts.map((post) => 
        (
          <div
            key={post.id}
            className="profile-post"
            onClick={() => setSelectedPost(post)}
          >
            
            <img src={post.image} alt="" />
          
          </div>
        ))}
      
      </div>

      
      {selectedPost && (
        
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      
      )}
    
    </div>
  );
}
