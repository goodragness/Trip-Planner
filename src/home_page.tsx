import React from 'react';
import {useState} from "react";
import SelectCitiesPage from "./Select_cities_page";

function HomePage() {

  //   in the home page, i need ways to store data now.
    const [destination , setDestination] = React.useState('');
    const [startDate , setStartDate] = React.useState('');
    const [endDate , setEndDate] = React.useState('');
    // creating a new state helping us to render or open the select teh cities page:
    const [showSelectCitiesPage , setShowSelectCitiesPage] = React.useState(false);

    if (showSelectCitiesPage) {
        return <SelectCitiesPage destination={destination} startDate={startDate} endDate={endDate}/>;
    }

    const handlePlanTrip = async() => {
        // send the request to the backend with the destination and travel dates
        // for now, just log the values to the console
        // try {
        //     const response = await fetch('http://localhost:5001/api/cities', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             destination: destination,
        //             start_date: startDate,
        //             end_date: endDate
        //         })
        //     });
        //     const data = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error('Error:', error);
        // }
        setShowSelectCitiesPage(true);
    }
  return (
    <div>
      <h1>Welcome to the Trip Planner</h1>
      <p>Please enter your destination to start planning your trip.</p>
      <input type="text" placeholder="Enter destination" value={destination}
      onChange={(e)=> setDestination(e.target.value)}/>


    {/*    asking for travel dates (from to to */}
        <h1>Duration of travel</h1>
        <p>Please enter your travel dates to start planning your trip.</p>
        <input type="date" placeholder="Enter start date"
        value={startDate}
        onChange={(e)=>setStartDate(e.target.value)}/>
        <input type="date" placeholder="Enter end date"
        value={endDate}
        onChange={(e)=>setEndDate(e.target.value)}/>

        {/*    the plan trip button.*/}
        <div id={"plan-trip-button"}>
            <button onClick={handlePlanTrip}>Plan Trip</button>
        </div>
    </div>
  );

//   it's time to send the request.

}

export default HomePage;