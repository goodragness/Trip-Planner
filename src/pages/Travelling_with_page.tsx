import react, {useEffect} from 'react';
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
    // useEffect(() => {
    //     const fetchItenerary = async() => {
    //         try {
    //             const response = await fetch(`http://localhost:5001/api/generate-itenerary` , {
    //                 method : 'POST',
    //                 headers:{
    //                     'Content-Type':'application/json',
    //                 },
    //                 body:JSON.stringify({
    //                     destination,
    //                     startDate,
    //                     endDate ,
    //                     cities ,
    //                     selectedTravelTypes ,
    //                     totalBudget ,
    //                     accomodationBudget ,
    //                     commuteBudget
    //
    //                 })
    //
    //             });
    //
    //             const data = await response.json();
    //             console.log(data);
    //
    //         }catch{
    //             console.error("Error creating the itenerary");
    //         }
    //     };
    //     fetchItenerary();
    // }, []);

//     making a function that can help us to actually make changes to the travel
//     group variable.
//     a function which will actually help to add user's input on the frontend and
//     on the html pages of the website to the above defined variable.
    const handleTravelGroupChange = (group:string)=>{
        setTravelGroup(group);
    }
//     creating a function that will help to navigate to the Itenerary options page.
    function goToIteneraryOptionPage(){
        navigate('/Itenerary-Options-page' , {state:{
                destination,
                startDate,
                endDate ,
                cities ,
                selectedTravelTypes ,
                totalBudget ,
                accomodationBudget ,
                commuteBudget
            }})
    }

//     returning what I wena tto render on the html pages.
    return (
        <div>
            {/*    getting the heading of the pages*/}
            <div className={"page_headings"}>
                <h1>What's your travelling group type:</h1>
            </div>

            {/*    getting the list of travelling group type*/}
            <div className={"travel_ques"}>
                {travelGroups.map((group: string, index) =>
                    <div key={group}>
                        <input type="radio"
                               name="travelGroup"
                               value={group}
                               checked={travelGroup === group}
                               id={`travel-group-${index}`}
                               onChange={() => handleTravelGroupChange(group)}/>
                        {/*    adding the label text to each radio button*/}
                        <label htmlFor={`travel-group-${index}`}>
                            {group}
                        </label>
                    </div>)}
            </div>

            {/*    making abutton that wil take us to the itenerary page*/}
            <div className={"navigating button"}>
                <button onClick={goToIteneraryOptionPage}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default TravellingWithPage