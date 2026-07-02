import react from 'react';

// the vision of hte page:
// I want to display 4-5 main tourist attraction of the destination country.
// out of which they can seleect
// also, a searach bar giving them the freedom to add cities of their choice.

function SelectCitiesPage() {
    return (
        <div>
            <h1>Select Cities</h1>
            <p>Please select the cities you want to visit during your trip.</p>
            <input type="text" placeholder="Enter city name" />
            <button>Add City</button>
        </div>
    )
}