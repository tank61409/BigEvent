import React, { useEffect, useState } from 'react';
import axios from 'axios';
import http from './utils/axiosUtils';
import RouteerConfig from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter >
      <RouteerConfig/>
    </BrowserRouter>
  );
}

export default App;
