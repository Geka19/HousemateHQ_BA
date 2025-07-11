import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import IconProfilePicDefault from '../../assets/Icon_Profil-03_ProfilePic-01.svg';

function EditProfile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [imageSlots, setImageSlots] = useState([]); // [{type: 'remote'|'local', src: string, file?: File}]
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5008/api/users/email/${userEmail}`);
        const data = await res.json();
        setUser(data);
        setForm({
          fullName: data.fullName || '',
          course: data.course || '',
          building: data.building || '',
          room: data.room || '',
          bio: data.bio || '',
        });
        // Build image slot array from saved images
        const existingImages = (data.images || []).map((img) => ({
          type: 'remote',
          src: `http://localhost:5008${img}`,
        }));
        setImageSlots(existingImages);
      } catch (err) {
        console.error('Error loading user:', err);
      }
    };

    fetchUser();
  }, [userEmail]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newImages = selectedFiles.map((file) => ({
      type: 'local',
      src: URL.createObjectURL(file),
      file,
    }));

    const combined = [...imageSlots, ...newImages].slice(0, 3); // enforce max 3
    setImageSlots(combined);
  };

  const handleRemoveImage = (index) => {
    const updated = [...imageSlots];
    updated.splice(index, 1);
    setImageSlots(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Update text fields
      const textRes = await fetch(`http://localhost:5008/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!textRes.ok) throw new Error('Text update failed');

      // 2. Upload new local images
      const filesToUpload = imageSlots.filter(img => img.type === 'local').map(img => img.file);
      if (filesToUpload.length > 0) {
        const formData = new FormData();
        filesToUpload.forEach(file => formData.append('images', file));

        const imageRes = await fetch(`http://localhost:5008/api/users/${user._id}/images`, {
          method: 'PUT',
          body: formData,
        });

        if (!imageRes.ok) throw new Error('Image upload failed');
      }

      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('Something went wrong updating your profile.');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main  style={{ paddingBottom: '200px' }} className="edit_profile_main">
      <form onSubmit={handleSubmit} className="edit_profile_info">
        <div className="edit_profile_info_name">
          <div></div>
          <div>
            <div><section className="edit_profile_pic"><img src={IconProfilePicDefault} alt="Profile figre" class="profile_icon_picture_editing"/></section></div>
            <div>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="edit_profile_name_purple"
              />
            </div>
          </div>
          <div></div>
        </div>

        <div className="edit_profile_images">
          {imageSlots.map((img, idx) => (
            <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={img.src}
                alt={`Image ${idx}`}
                className="edit_profile_images_img"
                style={{
                  height: '150px',
                  objectFit: 'cover',
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div style={{ margin: '1rem 0' }}>
          <label>Upload images (max 3):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={imageSlots.length >= 3}
          />
        </div>

        <div className="edit_profile_info_text">
          <div>
            <input
              type="text"
              name="course"
              value={form.course}
              onChange={handleChange}
              placeholder="Study Program"
              className="edit_profile_welcome_buttons_purple"
            />
            <input
              type="text"
              name="building"
              value={form.building}
              onChange={handleChange}
              placeholder="Building"
              className="edit_profile_welcome_buttons_purple"
            />
            <input
              type="text"
              name="room"
              value={form.room}
              onChange={handleChange}
              placeholder="Room"
              className="edit_profile_welcome_buttons_purple"
            />
          </div>
         <div></div> <div></div>
        </div>

        <div className="edit_profile_info_bio">
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Your bio..."
            rows={6}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button type="submit" className="edit_profile_welcome_buttons_green">Save</button>
        </div>
      </form>
    </main>
  );
}

export default EditProfile;
