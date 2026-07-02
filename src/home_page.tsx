import React from 'react';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Trip Planner</h1>
      <p>Please enter your destination to start planning your trip.</p>
      <input type="text" placeholder="Enter destination" />


    {/*    asking for travel dates (from to to */}
        <h1>Duration of travel</h1>
        <p>Please enter your travel dates to start planning your trip.</p>
        <input type="date" placeholder="Enter start date" />
        <input type="date" placeholder="Enter end date" />

        {/*    the plan trip button.*/}
        <div id={"plan-trip-button"}>
            <button>Plan Trip</button>
        </div>
    </div>
  );
}

export default HomePage;