import react from 'react';
import {useState} from "react";
import SelectCitiesPage from "./Select_cities_page";
import { useLocation, useNavigate } from "react-router-dom";

// todo: Aim for tomorrow:
//      try to send the information to Groq and get a complete itenerary.


function TravelType(){
    const location = useLocation();
    const navigate = useNavigate()
//      storing all the necessary data.
    const [SelectedTravelTypes , setSelectedTravelTypes] = react.useState<string[]>([]);
    // {destination , startDate , endDate , cities}
    const {destination , startDate , endDate , cities} = location.state||{};


    const allTravelType = [
        "Luxurious Travel",
        "Leisure Travel",
        "Hectic Travel",
        "Adventure Travel",
        "Sightseeing Travel",
        "Cultural Travel",
        "Road Trip",
        "Slow Travel",
        "Pilgrimage / Religious Travel",
        "Wellness Travel",
        "Digital Nomad Travel",
    ];

    const [totalBudget , setTotalBudget] = react.useState(0);
    const[accomodationBudget , setAccomodationBudget] = react.useState(0);
    const [commuteBudget , setCommuteBudget] = react.useState(0);

//     making a method helping us to add a travel type:
    const handleTravelTypeChange = (type:string)=>{
        if(SelectedTravelTypes.includes(type)){
            setSelectedTravelTypes(
                SelectedTravelTypes.filter((travelTypes) => travelTypes != type)
            );
        }else {
            setSelectedTravelTypes([...SelectedTravelTypes , type])
        }
    }
//     creating a function that will help to navigate to teh Travelling_with_page;
    function gotToTravellingWithPage(){
        navigate("/Travelling-with-page" , {
            state:{
                destination,
                startDate,
                endDate,
                cities,
                SelectedTravelTypes,
                totalBudget,
                accomodationBudget,
                commuteBudget
            }
        })
    }


//     returning the content fo the file which needs to be rendered.
    return (
        <div>
            <div className={"page_headings"}>
                <h1>What type of travel you prefer</h1>
            </div>
            {/*    displaying all the different toptions reflecting the travel type the person prefer.*/}
            <div className={"travel_ques"}>
                {allTravelType.map((type, index) =>
                    <div key={type}>
                        <input
                            type="checkbox"
                            id={`travel-type-${index}`}
                            value={type}
                            checked={SelectedTravelTypes.includes(type)}
                            onChange={() => handleTravelTypeChange(type)}/>
                        <label htmlFor={`travel-type-${index}`}>{type}</label>
                    </div>)}
            </div>
            <div className={"budgetDiv"}>
                <h1>Enter the budget of the trip:</h1>
                <input type="number" name={"totalBudget"} onChange={(e) => setTotalBudget(parseInt(e.target.value))}/>
                <label htmlFor="totalBudget">Enter your total budget</label>

                <input type="number" name={"accomodationBudget"} onChange={(e)=>setAccomodationBudget(parseInt(e.target.value))}/>
                <label htmlFor="accomocationBudget">Your accomodation Budget</label>

                <input type="number" name={"commuteBudget"} onChange={(e)=> setCommuteBudget(parseInt(e.target.value))}/>
                <label htmlFor="commuteBudget">Budget for commute</label>
            </div>
            {/*    making a new div to get a button leading to the next pages. */}
            <div>
                <button onClick={gotToTravellingWithPage}>Next</button>
            </div>
        </div>
    )

}

export default TravelType