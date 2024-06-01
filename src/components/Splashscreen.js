// src/components/SplashScreen.js
import React from 'react';
import './SplashScreen.css';

const SplashScreen = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="splash-screen">
      <h1>Loading...</h1>
    </div>
  );
};

export default SplashScreen;
