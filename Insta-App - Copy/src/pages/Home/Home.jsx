import React from "react";
import PostCard from "../../components/PostCard";
import Commentbox from "../../components/CommentBox";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import UserCard from "../../components/UserCard";
import Stories from "../../components/Stories";
import posts from "../../data/posts.json";
import users from "../../data/users.json";

function Home() 
{
  const postsWithUser = posts.map((post) => 
  {
    const user = users.find(user => user.id === post.user_id);
    return {
      ...post,
      username: user ? user.username : "unknown",
      userAvatar: user ? user.avatar : "",
    };
  });

  return (
    <div style={{ paddingLeft: "350px", maxWidth: "650px", margin: "0 auto", paddingTop: "20px" }}>
      <Stories />
      {postsWithUser.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;
