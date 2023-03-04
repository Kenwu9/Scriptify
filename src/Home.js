import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Scriptify!</h1>
      <p>Scriptify is a platform that allows you to create and share scripts.</p>
      <Link to="/scriptify">Go to Scriptify</Link>
    </div>
  );
}

export default Home;
