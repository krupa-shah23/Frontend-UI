import { createContext, useContext, useState } from "react";


const NotificationContext = createContext();

export function NotificationProvider({ children }) 
{
  
  const [notifications, setNotifications] = useState([]);

  function addNotification(message) 
  {
    
    const newNotification = 
    {
      id: Date.now(),
      message,
      time: "just now",
      unread: true,
    };

    setNotifications((prev) => [newNotification, ...prev]);
    
    const audio = new Audio("/sounds/notification.mp3");
    
    audio.play();
  }

  return (
    
    <NotificationContext.Provider
      value={{ notifications, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  
  );
}

export function useNotifications() 
{
  return useContext(NotificationContext);
}
