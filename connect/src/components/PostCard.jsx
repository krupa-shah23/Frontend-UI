import { useState } from "react";
import "./PostCard.css";


export default function PostCard({ post }) 
{
  const user = post.user || {
    username: "unknown",
    avatar: "https://ui-avatars.com/api/?name=User",
  };

  
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  
  function handleLike() 
  {
    setLikes((l) => (liked ? l - 1 : l + 1));
    setLiked(!liked);
  }

  
  function handlePostComment() 
  {
    if (!commentText.trim()) return;

    const newComment = 
    {
      user: "you",
      text: commentText,
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText("");
  }


  return (
    
    <div className="post">
     
      <div className="post-header">
        
        <img src={user.avatar} className="avatar" alt="avatar" />
        
        <span className="username">{user.username}</span>
      
      </div>

      
      <img src={post.image} className="post-image" alt="post" />

      
      <div className="post-actions">
      
        <span className="like-btn" onClick={handleLike}>
          {liked ? "❤️" : "🤍"}
        </span>
        
        <span className="comment-icon">💬</span>
      
      </div>

      
      <div className="post-likes">{likes} likes</div>

      
      <div className="post-caption">
      
        <strong>{user.username}</strong> {post.caption}
      
      </div>

      
      <div className="post-comments">
      
        <div className="comments-title">Comments</div>
      
        {comments.map((c, i) => (
      
          <div className="comment" key={i}>
            
            <strong>{c.user}</strong> {c.text}
          
          </div>
        
        ))}
      
      </div>

      
      <div className="add-comment">
        
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
        />
        
        <button onClick={handlePostComment}>Post</button>
      
      </div>
    
    </div>
  );
}
