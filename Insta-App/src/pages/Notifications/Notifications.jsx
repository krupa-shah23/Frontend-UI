import { useState } from "react";
import "./notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

 
  if (notifications.length === 0) {
    return (
      <div className="empty-notifications">
        <h2>Notifications</h2>
        <p>When people interact with your posts, you'll see it here.</p>

      
        <button
          onClick={() =>
            setNotifications([
              {
                id: 1,
                type: "like",
                text: "demo_user liked your post ❤️",
              },
              {
                id: 2,
                type: "follow",
                text: "demo_user started following you",
              },
              {
                id: 3,
                type: "post",
                text: "demo_user posted a new photo 📸",
              },
            ])
          }
        >
          Simulate Activity
        </button>
      </div>
    );
  }

 
  return (
    <div className="notifications-page">
      <h2 className="notifications-title">Notifications</h2>

      <div className="notifications-list">
        {notifications.map((note) => (
          <div key={note.id} className="notification-item">
            {note.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
