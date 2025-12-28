import React from "react";
import posts from "../../data/posts.json";
import users from "../../data/users.json";

import PostCard from "../../components/PostCard";
import './Post.css';                  

function PostsFeed() {

  const postsWithUser = posts.map(post => {
    const user = users.find(u => u.id === post.user_id);
    return {
      ...post,
      username: user ? user.username : "unknown",
      userAvatar: user ? user.avatar : "",
    };
  });

  return (
    <div className="posts-feed-bg">
      <h1 className="posts-feed-title">All Posts</h1>
      <div className="posts-feed-list">
        {postsWithUser.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
export default PostsFeed;
