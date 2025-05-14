import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Activities.css';
import AddPicture from '../../assets/Icon_Pluss-01.svg';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('http://localhost:5008/api/activities');
        const data = await res.json();
        setActivities(Array.isArray(data) ? data : []); // Safely ensure it's always an array
      } catch (err) {
        console.error('Error fetching activities:', err);
        setActivities([]); // fallback in case of error
      }
    };

    fetchActivities();
  }, []);

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

      <main style={{ margin: '0 10%', paddingBottom: '200px' }}>

        {/* Plus Button */}
        <Link to="/add-activity">
          <button type="button" className="addActivity_button">
                  <img src={AddPicture} alt="Add Activity" className="addButton"/>
          </button>
        </Link>
        
        
        <div className="activity_content">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity._id} className="activity-card">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <p><strong>Place:</strong> {activity.place}</p>
                <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {activity.time}</p>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20%' }}>
              <p>No activities yet.</p>
              <Link to="/add-activity">
                <button className="add-first-activity-button">Create your first activity!</button>
              </Link>
            </div>
          )}
        </div>

        {/* Plus Button */}
        
        
      </main>
    </div>
  );
}

export default Activities;
