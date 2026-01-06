import "./LogoutModal.css";


export default function LogoutModal({ onClose, onConfirm }) 
{
  return (
    <div className="logout-backdrop" onClick={onClose}>
      
      <div
        className="logout-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <h2>Log out</h2>
        
        <p className="muted">
          Are you sure you want to log out of Connect?
        </p>

        <div className="logout-actions">
          
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          
          <button className="btn-logout" onClick={onConfirm}>
            Logout
          </button>
        
        </div>
      
      </div>
    
    </div>
  );
}
