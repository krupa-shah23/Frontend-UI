import "./Discover.css";
import { useEffect, useState } from "react";
import { useNotifications } from "../Notifications/NotificationContext";
import { getAllUsers } from "../../api/auth";


export default function Discover() 
{
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const { addNotification } = useNotifications();

  useEffect(() => 
  {
    async function fetchUsers() 
    {
      try 
      {
        const res = await getAllUsers();

        const usersArray = Array.isArray(res.data)
        ? res.data
        : res.data.users || [];

        setUsers(usersArray);
      } 
      
      catch (err) 
      {
        console.error("Failed to fetch users", err);
      } 
      
      finally 
      {
        setLoading(false);
      }
  }

    fetchUsers();
  }, []);


  function handleFollow(name) 
  {
    addNotification(`You started following ${name}`);
    setToast(`You started following ${name}`);
    setTimeout(() => setToast(""), 2000);
  }

  const filteredUsers = users.filter
  (
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );


  if (loading) 
  {
    return <div className="discover">Loading users...</div>;
  }


  return (
    <div className="discover">
     
      <div className="discover-container">
        
        <div className="discover-header">
          
          <h1>Explore</h1>

          <input
            type="text"
            placeholder="Search people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        
        </div>

        <div className="user-grid">
          
          {filteredUsers.map((user) => 
          (
            
            <UserCard
              key={user._id}
              user={user}
              onFollow={handleFollow}
            />
          
          ))}
        
        </div>
      
      </div>

      {toast && <div className="toast">{toast}</div>}
    
    </div>
  );
}

function UserCard({ user, onFollow }) 
{
  
  const [following, setFollowing] = useState(false);

  function handleClick() 
  {
    if (!following) 
    {
      onFollow(user.name);
      setFollowing(true);
    }
  }

  return (
    
    <div className="user-card">
      
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=0D1117&color=00FF88`}
        alt={user.name}
      />

      <div className="user-info">
        
        <strong>{user.name}</strong>
        
        <span>{user.bio || "No bio available"}</span>
      
      </div>

      <button
        className={following ? "following" : ""}
        onClick={handleClick}
        disabled={following}
      >
        {following ? "Following" : "Follow"}
      </button>
    
    </div>
  );
}
