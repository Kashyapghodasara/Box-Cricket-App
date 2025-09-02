// File: Admin/src/App.jsx

import './App.css';
import Body from './Components/Body.jsx';
import { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

function App() {
  // 1. Create the 'traffic light' state
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('adminAccessToken', token);
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
    
    // 2. Turn the traffic light green, signaling that auth setup is complete
    setIsAuthReady(true);
  }, []);

  return (
    <>
      {/* 3. Pass the signal to the Body component */}
      <Body isAuthReady={isAuthReady} />
      <Toaster />
    </>
  );
}

export default App;