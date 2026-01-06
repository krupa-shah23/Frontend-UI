import "./EmptyProfile.css";

function EmptyProfile({
  username = "your_username",
  bio = "Add a bio to tell people about yourself",
}) {
  return (
    <div className="profile-bg">
      <div className="profile-header">
        <div
            className="profile-avatar empty-avatar clickable"
            onClick={() => alert("Change profile photo coming soon")}
            title="Change profile photo"
        />


        <div className="profile-info">
          <h2
            className="clickable username"
            onClick={() => alert("Edit username coming soon")}
        >
        {username}
        </h2>


          <div className="profile-stats">
            <span><strong>0</strong> posts</span>
            <span><strong>0</strong> followers</span>
            <span><strong>0</strong> following</span>
          </div>

          <p
            className="profile-bio muted clickable"
            onClick={() => alert("Add bio feature coming soon")}
            >
            {bio}
        </p>

          <button
            className="edit-profile-btn"
            onClick={() => alert("Edit Profile coming soon")}
            >
            Edit Profile
        </button>

        </div>
      </div>


      <div className="profile-empty-posts">
        <div
            className="empty-circle clickable"
            onClick={() => alert("Create post feature coming soon")}
        >
        +
        </div>

        <h3>Share your first photo</h3>
        <p>When you share photos, they will appear on your profile.</p>
      </div>
    </div>

    
  );
  
}

export default EmptyProfile;
