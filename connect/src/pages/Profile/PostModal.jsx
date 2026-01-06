import "./PostModal.css";
import { useEffect, useState } from "react";


export default function PostModal({ post, onClose }) 
{

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  function handleLike() 
  {
    setLiked(!liked);
    setLikes((l) => (liked ? l - 1 : l + 1));
  }

  function handleAddComment() 
  {
    if (!commentText.trim()) 
      return;
    
    setComments((prev) => [...prev, { user: "you", text: commentText }]);
    setCommentText("");
  }

  useEffect(() => 
  {
    function handleEsc(e) 
    {
      if (e.key === "Escape") onClose();
    }
    
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  
  }, [onClose]);

  return (
    <div className="post-modal-backdrop" onClick={onClose}>
      
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>

        <div className="post-modal-image">
          <img src={post.image} alt="" />
        </div>

        <div className="post-modal-content">

          <div className="post-modal-header">
            
            <img src={post.user.avatar} alt="" />
            
            <strong>{post.user.username}</strong>
            
            <span className="close" onClick={onClose}>✕</span>
          
          </div>

          <div className="post-modal-caption">
            
            <strong>{post.user.username}</strong> {post.caption}
          
          </div>

          <div className="post-modal-comments">
            
            <div className="comments-title">Comments</div>
            {comments.map((c, i) => 
            (
                <p key={i}>
                
                  <strong>{c.user}</strong> {c.text}
                
                </p>
            ))}
          
          </div>

          <div className="post-modal-likes" onClick={handleLike}>
            {liked ? "❤️" : "🤍"} {likes} likes
          </div>

          <div className="post-modal-add-comment">
            
            <input
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
            
            <button onClick={handleAddComment}>Post</button>
          
          </div>

        </div>
      
      </div>
    
    </div>
  );
}
