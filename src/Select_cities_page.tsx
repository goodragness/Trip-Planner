import react, {useEffect} from 'react';
import TravelType from "./Travel_Type";

// the vision of hte page:
// I want to display 4-5 main tourist attraction of the destination country.
// out of which they can seleect
// also, a searach bar giving them the freedom to add cities of their choice.

function SelectCitiesPage({destination , startDate , endDate}:{destination:string , startDate:string , endDate:string}) {
    const [cities , setCities] = react.useState<string[]>([]);

    // variable which will help us to navigate to the Travel_Type page. on setting it to true,
    // we can navigate to the next page.
    const [Travel_Type_page , setTravel_Type_Page] = react.useState(false);

    // making a function that will get the list of cities from the backend and display them on the page.
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

    // making a function that will help to navigate to the Travel_Type page.
    if(Travel_Type_page){
        return <TravelType  cities={cities}  destination={destination}
                            startDate={startDate}  endDate = {endDate}/>
    }
    return (
        <div>
            <h1>Select Cities</h1>
            <p>Please select the cities you want to visit during your trip.</p>
        {/*    display th elist of al lthe cities I want to travel to  */}
            <div className={"cities-list"}>
                {cities.map((city, index) => (
                    <div key={index} className={"city-item"}>
                        <input type="checkbox" id={`city-${index}`} name={`city-${index}`} value={city}/>
                        <label htmlFor={`city-${index}`}>{city}</label>
                    </div>
                ))}
            </div>

        {/*    adding a button navigating to the next page to select the travel type*/}
            <div className={"navigating button"}>
                <button onClick={()=> setTravel_Type_Page(true)}>
                    Next
                </button>
            </div>

        </div>
    )
}
export default SelectCitiesPage;