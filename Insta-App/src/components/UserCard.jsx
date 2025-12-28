import React, { useState } from 'react';
import './UserCard.css';

function UserCard({ user }) 
{

	const [following, setFollowing] = useState(false);

	function handleFollowClick() 
	{
		if (following) 
		{
			setFollowing(false); 
		} 
		else 
		{
			setFollowing(true); 
		}
	}

	return (
		<div className="user-card">

			<img 
				src={user.avatar} 
				alt={user.username} 
				className="user-avatar"
			/>

			<div className="user-info">
				<div className="username">{user.username}</div>
				<div className="user-bio">{user.bio}</div>
				<div className="user-stats">
					{user.followers} followers
				</div>
			</div>

			/* Follow Button */
			<button 
				onClick={handleFollowClick}
				className={following ? 'btn-following' : 'btn-follow'}
			>
				{following ? 'Following' : 'Follow'}
			</button>

		</div>
	);
}

export default UserCard;
