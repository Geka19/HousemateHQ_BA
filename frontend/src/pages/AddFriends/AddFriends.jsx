import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFriends.css'; // we'll style it too

function AddFriends() {
  const [randomUser, setRandomUser] = useState(null);
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const fetchRandomUser = async () => {
    try {
      const res = await fetch(`http://localhost:5008/api/users/random/${userEmail}`);
      const data = await res.json();
      setRandomUser(data);
    } catch (err) {
      console.error('Error fetching random user:', err);
    }
  };

  const handleAddFriend = async () => {
    if (!randomUser) return;

    const currentUser = await fetch(`http://localhost:5008/api/users/email/${userEmail}`);
    const currentUserData = await currentUser.json();

    try {
      const res = await fetch('http://localhost:5008/api/users/add-friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserData._id,
          friendId: randomUser._id,
        }),
      });

      if (!res.ok) throw new Error('Failed to add friend');
      alert('Friend added!');
      fetchRandomUser(); // fetch new friend after adding
    } catch (err) {
      console.error('Error adding friend:', err);
    }
  };

  if (!randomUser) {
    return (
      <main className="phone-frame" style={{ textAlign: 'center', padding: '20%' }}>
        <h2>No new friends available!</h2>
        <button onClick={() => navigate('/friends')} className="welcome_buttons_green">
          Go to Friends List
        </button>
      </main>
    );
  }

  return (
    <main className="phone-frame">
      <div className="new_friend_profile">
        <div className="new_friend_profile_images">
          <img src="/img/testimg1.jpg" alt="Friend" /> {/* placeholder */}
        </div>
        <div className="new_friend_profile_info">
          <div className="new_friend_profile_info_name">
            <div>
              <p>{randomUser.fullName}</p>
              <p className="new_friend_p_small">{randomUser.course || '—'}</p>
              <p className="new_friend_p_small">{randomUser.building || '—'}</p>
              <p className="new_friend_p_small">{randomUser.room || '—'}</p>
            </div>
            <div className="new_friend_profile_info_bio">
              <p>{randomUser.bio || 'No bio yet...'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="new_friend_profile_add_button">
        <button onClick={fetchRandomUser} className="next_button">Next Friend</button>
        <button onClick={handleAddFriend} className="add_friend_button">Add Friend</button>
      </div>
    </main>
  );
}

export default AddFriends;
