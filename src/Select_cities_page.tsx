import react, {useEffect} from 'react';

// the vision of hte page:
// I want to display 4-5 main tourist attraction of the destination country.
// out of which they can seleect
// also, a searach bar giving them the freedom to add cities of their choice.

function SelectCitiesPage({destination}: {destination: string}) {
    const [cities , setCities] = react.useState<string[]>([]);

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
    return (
        <div>
            <h1>Select Cities</h1>
            <p>Please select the cities you want to visit during your trip.</p>
        {/*    display th elist of al lthe cities I want to travel to  */}

        </div>
    )
}