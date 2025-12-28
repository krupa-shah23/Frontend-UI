import React, { useState } from 'react';
import './CommentBox.css';

function CommentBox() 
{

	const [comment, setComment] = useState('');

	function handleTyping(event) 
	{
		let text = event.target.value;
		setComment(text);
	}

	function handlePost() 
	{
		alert('You posted: ' + comment);
		setComment(''); 
	}

	return (
		<div className="comment-box">

			<button className="emoji-btn">😊</button>

			<input
				type="text"
				placeholder="Add a comment..."
				value={comment}
				onChange={handleTyping}
				className="input"
			/>

			<button onClick={handlePost} className="post-btn">
				Post
			</button>

		</div>
	);
}

export default CommentBox;