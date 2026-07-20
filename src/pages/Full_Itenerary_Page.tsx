import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FullitineraryPage() {
    // Stores the complete itinerary returned from the backend
    const [itineraryData, setitineraryData] = useState<any>(null);

    // Used to display a loading message while waiting
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    // Get the selected itinerary from the previous page
    const { itinerary } = location.state || {};




    useEffect(() => {

        const fetchCompleteitinerary = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5001/api/getCompleteItinerary",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },

                        // Send the selected itinerary to the backend
                        body: JSON.stringify({
                            itinerary: itinerary,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to generate itinerary.");
                }

                // Convert JSON response into a JavaScript object
                const data = await response.json();

                // Save it in state
                setitineraryData(data);

            } catch (error) {
                console.error("Itinerary couldn't be generated:", error);
            } finally {
                setLoading(false);
            }
        };

        // Only call the backend if an itinerary exists
        if (itinerary) {
            fetchCompleteitinerary();
        }

    }, [itinerary]);

    if (loading) {
        return (
            <div>
                <h2>Generating your complete itinerary...</h2>
            </div>
        );
    }

    return (
        <div>
            <div className="page_heading">
                <h1>Your Complete Itinerary</h1>
            </div>

            <div className="Selecteditinerary">
                {itineraryData ? (
                    <div>
                        <h2>{itineraryData.title}</h2>

                        <p>{itineraryData.summary}</p>

                        <p>
                            Estimated total cost:{" "}
                            {itineraryData.estimatedCost}{" "}
                            {itineraryData.currency}
                        </p>

                        {itineraryData.days?.map((day: any) => (
                            <div key={day.dayNumber}>
                                <h2>
                                    Day {day.dayNumber}: {day.title}
                                </h2>

                                <p>
                                    <strong>Date:</strong> {day.date}
                                </p>

                                <p>
                                    <strong>City:</strong> {day.city}
                                </p>

                                <h3>Activities</h3>

                                {day.activities?.map(
                                    (activity: any, index: number) => (
                                        <div key={index}>
                                            <h4>
                                                {activity.time} — {activity.name}
                                            </h4>

                                            <p>{activity.description}</p>

                                            <p>
                                                <strong>Location:</strong>{" "}
                                                {activity.location}
                                            </p>

                                            <p>
                                                <strong>Duration:</strong>{" "}
                                                {activity.duration}
                                            </p>

                                            <p>
                                                <strong>Estimated cost:</strong>{" "}
                                                {activity.estimatedCost} AUD
                                            </p>
                                        </div>
                                    )
                                )}

                                <h3>Restaurants</h3>

                                {day.restaurants?.map(
                                    (restaurant: any, index: number) => (
                                        <div key={index}>
                                            <h4>{restaurant.name}</h4>

                                            <p>
                                                <strong>Meal:</strong>{" "}
                                                {restaurant.meal}
                                            </p>

                                            <p>
                                                <strong>Estimated cost:</strong>{" "}
                                                {restaurant.estimatedCost} AUD
                                            </p>
                                        </div>
                                    )
                                )}

                                <h3>Transportation</h3>

                                <p>
                                    <strong>Type:</strong>{" "}
                                    {day.transportation?.type}
                                </p>

                                <p>{day.transportation?.details}</p>

                                <p>
                                    <strong>Estimated cost:</strong>{" "}
                                    {day.transportation?.estimatedCost} AUD
                                </p>

                                <h3>Hotel</h3>

                                <p>
                                    <strong>Name:</strong> {day.hotel?.name}
                                </p>

                                <p>{day.hotel?.details}</p>

                                <p>
                                    <strong>Estimated cost:</strong>{" "}
                                    {day.hotel?.estimatedCost} AUD
                                </p>

                                <h3>Tips</h3>

                                <ul>
                                    {day.tips?.map(
                                        (tip: string, index: number) => (
                                            <li key={index}>{tip}</li>
                                        )
                                    )}
                                </ul>

                                <p>
                                    <strong>Bad-weather alternative:</strong>{" "}
                                    {day.badWeatherAlternative}
                                </p>

                                <p>
                                    <strong>Daily budget:</strong>{" "}
                                    {day.dailyBudget} AUD
                                </p>

                                <hr />
                            </div>
                        ))}

                        <h2>Packing Tips</h2>

                        <ul>
                            {itineraryData.packingTips?.map(
                                (tip: string, index: number) => (
                                    <li key={index}>{tip}</li>
                                )
                            )}
                        </ul>

                        <h2>General Advice</h2>

                        <ul>
                            {itineraryData.generalAdvice?.map(
                                (advice: string, index: number) => (
                                    <li key={index}>{advice}</li>
                                )
                            )}
                        </ul>
                    </div>
                ) : (
                    <p>No itinerary available.</p>
                )}
            </div>
        </div>
    );
}

export default FullitineraryPage;