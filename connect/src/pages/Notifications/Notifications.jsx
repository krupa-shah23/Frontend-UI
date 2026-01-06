import "./Notifications.css";
import { useNotifications } from "./NotificationContext";


export default function Notifications() 
{
  const { notifications } = useNotifications();

  return (
    <div className="notifications">
      
      <div className="notifications-container">
        
        <h2>Notifications</h2>

        <div className="notification-list">
          {notifications.length === 0 && 
            (
              <p className="muted">No notifications yet</p>
            )
          }

          {notifications.map((n) => 
          (
            
            <div
              key={n.id}
              className={`notification ${n.unread ? "unread" : ""}`}
            >
              
              <div className="notification-text">
                {n.message}
                
                <span className="time">{n.time}</span>
              
              </div>
            
            </div>
          ))}
        
        </div>
      
      </div>
    
    </div>
  );
}
