import React, { useState } from "react";

function PostCard({ post }) 
{
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false); 

  function likePost() 
  {
    if (!liked) 
	{
      setLikes(likes + 1);
      setLiked(true);
    } 
	else 
	{
      setLikes(likes - 1);
      setLiked(false);
    }
  }

  function addComment() 
  {
    if (commentText === "") return;
    setComments([...comments, { user: "You", text: commentText }]);
    setCommentText("");
  }

  return (
    <div className="bg-black rounded-2xl shadow-lg p-4 w-full max-w-md mx-auto mb-6">
      <div className="flex items-center mb-2 cursor-pointer">
        <img
          src={post.userAvatar}
          alt="profile"
          className="w-9 h-9 rounded-full mr-2"
        />
        <span className="text-white font-bold">{post.username}</span>
      </div>

      <img
        src={post.image}
        alt="post"
        className="rounded-xl w-full object-cover mb-3 cursor-pointer"
      />

      <div className="mb-2 flex items-center">
        <span
          className="mr-2 cursor-pointer flex items-center"
          onClick={likePost}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <span
            className={
              liked
                ? "text-red-500 text-2xl transition-all duration-200"
                : "text-black text-2xl border-2 border-white rounded-full transition-all duration-200"
            }
            style={{ display: "inline-block", width: 32, height: 32, textAlign: "center", lineHeight: "28px" }}
          >
            ♥
          </span>
          <span className="text-white ml-2">{likes}</span>
        </span>
        <span className="text-blue-300 text-lg ml-4">
          {comments.length} Comments
        </span>
      </div>

      <div className="text-gray-300 mb-2">{post.caption}</div>


      <div className="mb-2">
        {comments.map((c, i) => (
          <div key={i} className="text-gray-100">
            <b>{c.user}:</b> {c.text}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="bg-gray-700 text-white px-3 py-1 rounded-full mr-2 flex-1"
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded-full"
          onClick={addComment}
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default PostCard;
