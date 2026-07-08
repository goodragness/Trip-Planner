import react, {useEffect} from 'react';
import TravelType from "./Travel_Type";
import { useLocation, useNavigate } from "react-router-dom";

// the vision of hte pages:
// I want to display 4-5 main tourist attraction of the destination country.
// out of which they can seleect
// also, a searach bar giving them the freedom to add cities of their choice.

function SelectCitiesPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // adding values to the local storage:
    const {destination , startDate , endDate} = location.state ||{};
    const [cities , setCities] = react.useState<string[]>([]);


    console.log("destination:", destination);
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    // variable which will help us to navigate to the Travel_Type pages. on setting it to true,
    // we can navigate to the next pages.
    // const [Travel_Type_page , setTravel_Type_Page] = react.useState(false);

    // making a function that will get the list of cities from the backend and display them on the pages.
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/cities` , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({destination: destination}),
                    })
                ;
                const data = await response.json();
                setCities(data.message.split("\n"));
            } catch {
                console.error("Error fetching cities");
            }
        }; fetchCities().then(r => console.log("cities fetched successfully"));
    }, [destination]);

    // making a function that will help to navigate to the Travel_Type pages.
    function goToTravelType(){
        navigate("/Travel-Type");
    }

    return (
        <div>
            <h1>Select Cities</h1>
            <p>Please select the cities you want to visit during your trip.</p>
        {/*    display the list of all the cities I want to travel to  */}
            <div className={"cities-list"}>
                {cities.map((city, index) => (
                    <div key={index} className={"city-item"}>
                        <input type="checkbox" id={`city-${index}`} name={`city-${index}`} value={city}/>
                        <label htmlFor={`city-${index}`}>{city}</label>
                    </div>
                ))}
            </div>


        {/*    adding a button navigating to the next pages to select the travel type*/}
            <div className={"navigating button"}>
                <button onClick={goToTravelType}>
                    Next
                </button>
            </div>

        </div>
    )
}
export default SelectCitiesPage;