import React from "react";
import users from "../data/users.json";
import "./Stories.css";

function Stories() {
  const storyElements = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    storyElements.push(
      <div 
        className="story"
        key={user.id}
        style={{ cursor: "pointer" }} >
        <img className="story-img" src={user.avatar} alt={user.username} />
        <div className="story-username">{user.username}</div>
      </div>
    );
  }

  return (
    <div className="stories-row">
      {storyElements}
    </div>
  );
}

export default Stories;
