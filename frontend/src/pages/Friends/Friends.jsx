import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Friends.css';

function Friends() {
  const [friends, setFriends] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch(`http://localhost:5008/api/users/email/${userEmail}`);
        const userData = await res.json();
        if (userData.friends && userData.friends.length > 0) {
          const friendDetails = await Promise.all(
            userData.friends.map(friendId =>
              fetch(`http://localhost:5008/api/users/${friendId}`).then(res => res.json())
            )
          );
          setFriends(friendDetails);
        } else {
          setFriends([]);
        }
      } catch (err) {
        console.error('Error fetching friends:', err);
        setFriends([]);
      }
    };

    fetchFriends();
  }, [userEmail]);

  const handleRemoveFriend = async (friendId) => {
    try {
      const res = await fetch(`http://localhost:5008/api/users/email/${userEmail}`);
      const currentUser = await res.json();

      const response = await fetch('http://localhost:5008/api/users/remove-friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser._id,
          friendId: friendId,
        }),
      });

      if (!response.ok) throw new Error('Failed to remove friend');

      // Refresh list after removal
      setFriends(friends.filter(f => f._id !== friendId));
    } catch (err) {
      console.error('Error removing friend:', err);
    }
  };

  return (
    <div className="phone-frame">
      <header className="activities-header">
        <div className="activity_friends_left">
          <Link to="/activities">
            <p>Activities</p>
          </Link>
        </div>
        <div className="activity_friends_right">
          <Link to="/friends">
            <p>Friends</p>
          </Link>
        </div>
      </header>

      <main style={{ margin: '0 10%', paddingBottom: '90px' }}>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend._id} style={{ marginBottom: '2rem' }}>
              <div className="profile_images">
                <div className="imgbox">
                  <img src="/img/testimg1.jpg" alt="Friend" />
                </div>
                <div className="imgbox">
                  <img src="/img/testimg2.jpg" alt="Friend" />
                </div>
                <div className="imgbox">
                  <img src="/img/testimg3.jpg" alt="Friend" />
                </div>
              </div>

              <div className="profile_info">
                <div className="profile_info_status">
                  <div></div><div></div><div></div>
                  <div>
                    <p className="status">Active</p>
                  </div>
                </div>

                <div className="profile_info_name">
                  <div>
                    <section className="profile_pic"></section>
                  </div>
                  <div>
                    <p>{friend.fullName}</p>
                    <p className="p_small">{friend.course || '—'}</p>
                    <p className="p_small">{friend.building || '—'}</p>
                    <p className="p_small">{friend.room || '—'}</p>
                  </div>
                </div>

                <div className="profile_info_bio">
                  <p>{friend.bio || 'No biography yet.'}</p>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button onClick={() => handleRemoveFriend(friend._id)}
                  style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', borderRadius: '8px' }}>
                  Remove Friend
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h2>No friends yet 😢</h2>
            <Link to="/add-friend">
              <button className="welcome_buttons_green">Find New Friends</button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default Friends;
