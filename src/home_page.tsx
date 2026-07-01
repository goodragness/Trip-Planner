import React from 'react';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Trip Planner</h1>
      <p>Please enter your destination to start planning your trip.</p>
      <input type="text" placeholder="Enter destination" />
      <button>Plan Trip</button>
    </div>
  );
}

export default HomePage;