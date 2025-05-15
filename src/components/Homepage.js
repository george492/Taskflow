import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import CUser from '../UserRecoil';
import { useRecoilState } from 'recoil';
import User_Token from './Tokaerecoil';

function Homepage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [user, setUser] = useRecoilState(CUser);
  const [token, setToken] = useRecoilState(User_Token);
  // const [user, setText] = useRecoilState(textState);
  const [formData, setFormData] = useState({
    name: 'Toka',
    email: 'Toka@microsoft.com',
    password: '12345678',
    profileImage: ''
  });

  const navigate = useNavigate();
  const handleLogin = async () => {
    // try {
    //   const response = await axios.post('http://localhost:5000/api/auth/register', formData);
    //   console.log('Registration successful:', response.data);
    //   navigate('/login'); // Redirect to login after registration
    // } catch (err) {
    //   alert('Registration failed');
    //   console.error('Registration error:', err);
    // }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password: pass
      });

      const { token, ...userData } = res.data;
      setToken(token);
      setUser(userData);

      // alert('Login successful');
    //   return(
    //   <Sidebar user={user}></Sidebar>)
// const profile = await axios.get(`http://localhost:5000/api/users/${user.id}`);
      // console.log(profile.data);
      // setUser(profile.data);
    
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="home">
      <input
        type="email"
        placeholder="Your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password"
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Homepage;
