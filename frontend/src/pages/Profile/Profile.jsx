import { useEffect, useState } from 'react';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5008/api/users/email/${userEmail}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Error loading user:', err);
      }
    };

    if (userEmail) {
      fetchUser();
    }
  }, [userEmail]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await fetch(`http://localhost:5008/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      const updatedUser = await res.json();
      setUser(updatedUser);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <main  style={{ paddingBottom: '80px' }}>
      <div>
        <section className="edit">
          <a href="/edit">
            <img src="/img/NewSVGs/Icon_Edit-01.svg" className="nav_icons" alt="Edit Profile" />
          </a>
        </section>
      </div>

      {/* Profile Images */}
      <div className="profile_images">
        {user.images && user.images.length > 0 ? (
          user.images.map((imgPath, idx) => (
            <img
              key={idx}
              src={`http://localhost:5008${imgPath}`}
              alt={`Profile Image ${idx}`}
              style={{
                width: '100%',
                height: user.images.length === 1 ? '350px' : '250px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '10px'
              }}
            />
          ))
        ) : (
          <p>No profile images yet.</p>
        )}
      </div>

      {/* Profile Info */}
      <div className="profile_info">
        <div className="profile_info_status">
          <div></div><div></div><div></div>
          <div>
          <select
            value={user.status}
            onChange={handleStatusChange}
            style={{
                fontSize: '1rem',
                padding: '5px',
                borderRadius: '8px',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor:
                user.status === 'Active' ? 'green' :
                user.status === 'Busy' ? 'orange' :
                user.status === 'Inactive' ? 'gray' :
                'lightgray', // fallback
                border: 'none'
            }}
            >
            <option value="Active">Active</option>
            <option value="Busy">Busy</option>
            <option value="Inactive">Inactive</option>
            </select>

          </div>
        </div>

        <div className="profile_info_name">
          <div>
            <section className="profile_pic"></section>
          </div>
          <div>
            <p>{user.fullName}</p>
            <p className="p_small">{user.course || '—'}</p>
            <p className="p_small">{user.building || '—'}</p>
            <p className="p_small">{user.room || '—'}</p>
          </div>
        </div>

        <div className="profile_info_bio">
          <p>{user.bio || 'No biography yet...'}</p>
        </div>
      </div>
    </main>
  );
}

export default Profile;
