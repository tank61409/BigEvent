import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import http from '../utils/axiosUtils';


function Category() {
  const [msg, setMsg] = useState('');
  useEffect(()=>{
    console.log(axios.defaults.headers.common['Authorization'])
  })
  const getcategoryDetail = async () => {
    const respone = await http.get('http://localhost:8080/category', {})
    console.log(respone.data.data)
    setMsg(JSON.stringify(respone.data.data))
  }
  return (
    <div>
      這是Category
      <div><button onClick={getcategoryDetail}>CategoryDetail</button> </div>
      <div>{msg}</div>
    </div>
    
  )

}

export default Category;
