import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [token, setToken] = useState('');
  const handleLogin = async () => {
    const respone = await axios.post('http://localhost:8080/user/login', {
      username,
      password
    });
    setMsg(respone.data.message)
    setToken(respone.data.data)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log(axios.defaults.headers.common['Authorization'])
    alert('Login success')
  }

  const getcategoryDetail = async () => {
    const respone = await axios.get('http://localhost:8080/category', {})
    console.log(respone.data.data)
     setMsg(JSON.stringify(respone.data.data))
  }

  return (
    <div >
      <div><input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /></div>
      <div><input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <div><button onClick={handleLogin}>Login</button> </div>
      <div><button onClick={getcategoryDetail}>CategoryDetail</button> </div>
      <div>{msg}</div>
      <div>{token}</div>
    </div>
  );
}

export default App;
