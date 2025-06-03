import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    const respone = await axios.post('http://localhost:8080/user/login', {
      username,
      password
    })

      ;
    setMsg(respone.data.message)
    setToken(respone.data.data)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    alert('Login success')
    navigate('/Category')
  }


  return (
    <div >
      <div><input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /></div>
      <div><input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <div><button onClick={handleLogin}>Login</button> </div>

      <div>{msg}</div>

    </div>
  );
}

export default Login;
