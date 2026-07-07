import react from 'react';
import {useState} from "react";
import SelectCitiesPage from "./Select_cities_page";

function TravelType({destination , startDate , endDate , cities}:{destination:String , startDate:String , endDate:String , cities:String[]}){
//      storing all the necessary data.
    const [SelectedTravelTypes , setSelectedTravelTypes] = react.useState<string[]>([]);



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


//     returning the content fo the file which needs to be rendered.
    return (
        <div>
            <div className={"page_headings"}>
                <h1>What type of travel you prefer</h1>
            </div>
        {/*    displaying all the different toptions reflecting the travel type the person prefer.*/}
            <div className={"travel_ques"}>
                {allTravelType.map((type , index) =>
                <div key={type}>
                    <input
                        type="checkbox"
                        id={`travel-type-${index}`}
                        value={type}
                        checked={SelectedTravelTypes.includes(type)}
                        onChange={()=>handleTravelTypeChange(type)}/>
                    <label htmlFor={`travel-type-${index}`}>{type}</label>
                </div>)}
            </div>
        {/*    making a new div to get a button leading to the next page. */}
            <div>
                <button>Next</button>
            </div>
        </div>
    )

}
export default TravelType