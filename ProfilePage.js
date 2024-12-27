
javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const { data } = await axios.get('/api/users/profile', config);
        setUser(data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };

    fetchProfile();
  }, []);

  return user ? (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Wallet Balance: ${user.walletBalance}</p>
    </div>
  ) : (
    <p>Loading...</p>
);
};

export default ProfilePage;

