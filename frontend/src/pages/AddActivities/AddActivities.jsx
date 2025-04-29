import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddActivities.css';

function AddActivity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    place: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5008/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create activity');

      navigate('/activities');
    } catch (err) {
      console.error('Error creating activity:', err);
    }
  };

  return (
    <div className="phone-frame">
      <main style={{ margin: '10% 5%', textAlign: 'center' }}>
        <h1>Add New Activity</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <div style={{ margin: '1rem 0' }}>
            <label>
              <input type="radio" name="place" value="Living Room" onChange={handleChange} /> Living Room
            </label>
            <label>
              <input type="radio" name="place" value="Kitchen" onChange={handleChange} /> Kitchen
            </label>
            <label>
              <input type="radio" name="place" value="Inside" onChange={handleChange} /> Inside
            </label>
            <label>
              <input type="radio" name="place" value="Outside" onChange={handleChange} /> Outside
            </label>
            <label>
              <input type="radio" name="place" value="Others" onChange={handleChange} /> Others
            </label>
          </div>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
          />

          <button type="submit" className="welcome_buttons_green">Create Activity</button>
        </form>
      </main>
    </div>
  );
}

export default AddActivity;
