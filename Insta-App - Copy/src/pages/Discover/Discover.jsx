import React, { useState } from "react";
import "./Discover.css";

const usersList = [
  { id: 1, name: "Aarav Singh", username: "aarav_23", avatar: "/images/user1.jpg", bio: "Frontend dev who never sleeps." },
  { id: 2, name: "Kiara Mehta", username: "kiaramehta", avatar: "/images/user2.jpg", bio: "Coffee + CSS = best combo." }
];

function Discover() 
{

  const [searchTerm, setSearchTerm] = useState("");

  const [following, setFollowing] = useState({});

  function getFilteredUsers() {

    const search = searchTerm.toLowerCase();

    return usersList.filter(function(user) 
    {

      const username = user.username.toLowerCase();
      const name = user.name.toLowerCase();

      return username.includes(search) || name.includes(search);
    });
  }


  function handleFollow(userId) 
  {

    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  }

  const filteredUsers = getFilteredUsers();

  return (
    <div className="discover-container">
      <h2 className="discover-title">Discover People</h2>
      

      <input
        type="text"
        className="discover-search"
        placeholder="Search people"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      

      <ul className="discover-list">

        {filteredUsers.length === 0 ? (
          <li className="discover-none">No users found.</li>
        ) : (

          filteredUsers.map(function(user) {
            return (
              <li key={user.id} className="discover-person">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="discover-avatar"
                />
                <div className="discover-info">
                  <div className="discover-username">{user.username}</div>
                  <div className="discover-name">{user.name}</div>
                  <div className="discover-bio">{user.bio}</div>
                </div>
                <button
                  className={following[user.id] ? "discover-following" : "discover-follow"}
                  onClick={() => handleFollow(user.id)}
                >
                  {following[user.id] ? "Following" : "Follow"}
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default Discover;

