import './App.css';
import Body from './Components/Body.jsx';
import { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

function App() {
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // This effect will now log its every move to the console.
    // console.log("--- App.jsx useEffect has started ---");

    const fullUrlQuery = window.location.search;
    // console.log("Current URL Query:", fullUrlQuery);

    const urlParams = new URLSearchParams(fullUrlQuery);
    const token = urlParams.get('token');

    // console.log("Token found in URL:", token); // This will show us the token or 'null'

    if (token) {
      // console.log("✅ Token exists. Attempting to save to localStorage...");
      localStorage.setItem('adminAccessToken', token);
      
      const savedToken = localStorage.getItem('adminAccessToken');
      // console.log("Verification: Token saved in localStorage is:", savedToken);

      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
      console.log("URL has been cleaned.");

    } else {
      console.log("❌ No token found in the URL query parameters.");
    }
    
    setIsAuthReady(true);
    console.log("Authentication check is complete. isAuthReady is now true.");
    console.log("-------------------------------------");

  }, []);

  return (
    <>
      <Body isAuthReady={isAuthReady} />
      <Toaster />
    </>
  );
}

export default App;