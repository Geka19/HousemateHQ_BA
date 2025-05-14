import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Friends.css';
import IconProfilePicDefault from '../../assets/Icon_Profil-03_ProfilePic-01.svg';

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

      <main className="friends_main">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend._id} style={{ marginBottom: '2rem' }} className="friends_containers">
              <div className="friends_profile_images">
              {[0, 1, 2].map((index) => (
            <div className="friends_imgbox" key={index}>
              {friend.images && friend.images[index] ? (
                <img
                  src={`http://localhost:5008/uploads/${friend.images[index].replace('/uploads/', '')}`}
                  alt={`Friend ${index}`}
                  className="friends_img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = IconProfilePicDefault;
                  }}
                />
              ) : (
                <img
                  src={IconProfilePicDefault}
                  alt="Default friend"
                  className="friends_img"
                />
              )}
            </div>
          ))}
            </div>

              <div className="friends_profile_info">
                <div className="friends_profile_info_status">
                  <div></div><div></div><div></div>
                  <div>
              <p
                className="friends_status"
                style={{
                  backgroundColor:
                    friend.status === 'Active'
                      ? 'lightgreen'
                      : friend.status === 'Busy'
                      ? 'orange'
                      : friend.status === 'Inactive'
                      ? 'lightgray'
                      : 'white',
                  fontWeight: 'bold'
                }}
              >
                {friend.status || 'Active'}
              </p>
            </div>
                </div>

                <div className="friends_profile_info_name">
                  <div>
                    <section className="friends_profile_pic">
                      <img src={IconProfilePicDefault} alt="Profile figre" class="profile_icon_picture"/>
                    </section>
                  </div>
                  <div>
                    <p>{friend.fullName}</p>
                    <p className="p_small">{friend.course || '—'}</p>
                    <p className="p_small">{friend.building || '—'}</p>
                    <p className="p_small">{friend.room || '—'}</p>
                  </div>
                </div>

                <div className="friends_profile_info_bio">
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
