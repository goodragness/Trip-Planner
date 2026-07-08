import react from 'react';
import {useState} from "react"
import {useLocation , useNavigate} from "react-router-dom";

function TravellingWithPage(){
//     a constant that will store the travel type
//     and how many people the person is traveling with
    const [travelGroup , setTravelGroup] = useState<string>();
    const location = useLocation();
    const navigate = useNavigate();
    const {destination , startDate , endDate , cities , selectedTravelTypes ,
    totalBudget , accomodationBudget , commuteBudget} = location.state|| {};

//     getting all the types of travel groups the person can go with:
    const travelGroups = [
        "Solo",
        "Couple travel",
        "Honeymoon",
        "Friends",
        "Family",
        "Travelling with senior citizens",
        "Travelling with infants",
        "Travelling with specially need person"
    ]

//     making a function that can help us to actually make changes to the travel
//     group variable.
//     a function which will actually help to add user's input on the frontend and
//     on the html pages of the website to the above defined variable.
    const handleTravelGroupChange = (group:string)=>{
        setTravelGroup(group);
    }

//     returning what I wena tto render on th ehtml pages.
    return (
        <div>
        {/*    getting the heading of the pages*/}
            <div className={"page_headings"}>
                <h1>What's your travelling group type:</h1>
            </div>

        {/*    getting the list of travelling group type*/}
            <div className={"travel_ques"}>
                {travelGroups.map((group:string , index)=>
                <div key={group}>
                    <input type="radio"
                    name="travelGroup"
                    value={group}
                    checked={travelGroup === group}
                    id={`travel-group-${index}`}
                    onChange={()=>handleTravelGroupChange(group)}/>
                {/*    adding the label text to each radio button*/}
                    <label htmlFor={`travel-group-${index}`}>
                        {group}
                    </label>
                </div>)}
            </div>
        </div>
    )
}

export default TravellingWithPage