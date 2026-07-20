


// have to add the dotenv file so that backend can access the environment variables from the .env file.
require("dotenv").config();
const Groq = require("groq-sdk");


const express = require("express");
const cors = require("cors");

const app = express();

const groq = new Groq({
    apiKey : process.env.GROQ_API_KEY,
})

app.use(cors());  //this line tells the server to accept all the requests from the frontend.
app.use(express.json()); //this tells the server to accept json data from the frontend and understand it.

//express creates a server faster and with just one line for our app.
// so that we don't have to write tons of lines of code to create a server.


app.get("/", (req, res) => {
    res.send("Trip Planner Backend is running!");
});

// the above code is a simple route that sends a response to the frontend when the user visits the root url of the backend and requests something.


//the above code tells the server to listen on port 5000 and when the server is running, it will log a message to the console.

//adding a messager between groq and the server helping the server to communicate iwth groq.
//all the requests are being sent to the messager and then the messagenr sends the requests
// to groq and then groq sends the response back to the messager and then the messager
// sends the response back to the server and then the server sends the response back to the frontend.


//adding a route to get the data from groq and send it to the frontend.

app.post("/api/cities", async (req, res) => {
    const { city } = req.body; //getting the city from the request body.
    try {
        const {destination} = req.body;
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "You are a travel assistant that provides information about cities and destinations."
                },
                {
                    role: "user",
                    content: `can you provide top 4 famous tourist cities  where I can travel to in the ${destination} region?
                            note:just provide the names of all the 10 cities without eloborating them or providing any otoher
                            descrtiption. 
                            the response generated has to follow the following format:
                            1. city name
                            2. city name
                            3. city name
                            4. city name
                            5. city name
                            6. city name
                            7. city name
                            8. city name
                            9. city name
                            10. city name`
                }
            ],
            max_tokens: 200,
        });
        res.json({
            message: completion.choices[0].message.content
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "An error occurred while fetching data from Groq."});
    }
    })

// making a new communication endpointn for groq.
// to send the request to groq to build the itenerary and recieve it to this point.
// making a post route(communication endpoint at backend which will recieve mg, data form the frontend
// and it will send the data or prompt to groq).

app.post("/api/generate-itenerary", async (req, res) => {
    try {
        const {
            destination,
            startDate,
            endDate,
            cities,
            selectedTravelTypes,
            totalBudget,
            accomodationBudget,
            commuteBudget
        } = req.body;

        const availableTravelBudget =
            Number(totalBudget) -
            Number(accomodationBudget) -
            Number(commuteBudget);

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "system",
                    content:
                        "You are a travel-planning assistant. Return only valid JSON."
                },
                {
                    role: "user",
                    content: `
Generate exactly 3 distinct itinerary options for this trip.

Trip information:
- Destination: ${destination}
- Start date: ${startDate}
- End date: ${endDate}
- Selected cities: ${cities}
- Travel style: ${selectedTravelTypes}
- Total budget: ${totalBudget} AUD
- Accommodation budget: ${accomodationBudget} AUD
- Return transport budget: ${commuteBudget} AUD
- Available spending budget during the trip: ${availableTravelBudget} AUD

Each option must:
- fit the available budget;
- cover the selected cities;
- have a clearly different travel approach;
- provide a short overview only;
- not include the full day-by-day schedule yet.

Return this exact JSON structure:

{
  "itineraries": [
    {
      "id": 1,
      "title": "string",
      "type": "string",
      "summary": "string",
      "estimatedCost": 0,
      "currency": "AUD",
      "duration": 0,
      "highlights": [
        "string",
        "string",
        "string"
      ],
      "tips": [
        "string",
        "string"
      ]
    }
  ]
}

Requirements:
- Return exactly 3 itinerary objects.
- Use IDs 1, 2 and 3.
- Return only JSON.
- Do not use Markdown.
- Do not include explanatory text.
`
                }
            ],

            response_format: {
                type: "json_object"
            },

            max_tokens: 2500
        });

        const content = completion.choices[0].message.content;

        if (!content) {
            return res.status(500).json({
                error: "Groq returned an empty response."
            });
        }

        const parsedData = JSON.parse(content);

        if (!Array.isArray(parsedData.itineraries)) {
            return res.status(500).json({
                error: "Groq did not return an itineraries array."
            });
        }

        res.json(parsedData);
    } catch (error) {
        console.error("Generate itinerary error:", error);

        res.status(500).json({
            error: "An error occurred while generating itinerary options."
        });
    }
});

// a method that will return a complete selected itenerary:
// app.post("/api/getCompleteItenerary" , async(req , res)=>{
//     try {
//         // 1. getting all the necessary data from the frontend.
//         const {
//             destination,
//             startDate,
//             endDate,
//             cities,
//             selectedTravelTypes,
//             totalBudget,
//             accomodationBudget,
//             commuteBudget,
//             selectedItenerary
//         } = req.body;
//     //     2. generating a prompt which will be sent to the groq api helping us generate our desired itenerary:
//         const completion = await groq.chat.completions.create({
//             model:"llama-3.1-8b-instant",
//             messages:[
//                 {
//                     role: "system",
//                     content:
//                         "You are a travel-planning assistant. Return only valid JSON."
//                 },
//                 {
//                     role:"user",
//                     content:
//                     "Great work generating 3 different iteneraries. now can you generate the complete selected itenerary. " +
//                         `this is the selected itenerary: ${selectedItenerary} and
//                         You are an expert travel planner.
//                         The user has selected the following itinerary:
//                         Title:${selectedItinerary.title}
//                         Theme:${selectedItinerary.type}
//                         Summary:${selectedItinerary.summary}
//                         Destination:${destination}
//                         Travel Dates:${startDate} to ${endDate}
//                         Cities:${cities.join(", ")}
//                         Travel Style:${selectedTravelTypes.join(", ")}
//                         Travel Group:${travelGroup}
//                         Budget:
//                         - Total Budget: ${totalBudget}
//                         - Accommodation Budget: ${accommodationBudget}
//                         - Commute Budget: ${commuteBudget}
//                         Generate a COMPLETE day-by-day travel itinerary.
//                         Requirements:
//                         - Include every day of the trip.
//                         - Morning, afternoon and evening activities.
//                         - Recommended restaurants.
//                         - Tourist attractions.
//                         - Travel times.
//                         - Estimated activity costs.
//                         - Recommended accommodation.
//                         - Local transport.
//                         - Tips and warnings.
//                         - Packing suggestions.
//                         - Alternative indoor activities if weather is bad.
//                         - Daily spending estimate.
//                         - End-of-day notes.
//
//                         Return ONLY valid JSON.
//
//                         {
//                             "title": "",
//                             "summary": "",
//                             "estimatedCost": 0,
//                             "currency": "AUD",
//
//                             "days": [
//                                 {
//                                     "dayNumber": 1,
//                                     "date": "",
//                                     "city": "",
//                                     "title": "",
//
//                                 "activities": [
//                                 {
//                                     "time": "",
//                                     "name": "",
//                                     "description": "",
//                                     "location": "",
//                                     "duration": "",
//                                     "estimatedCost": 0
//                                 }
//                                 ],
//
//                                 "restaurants": [],
//
//                                 "transportation": {},
//                                 "hotel": {},
//
//                                 "tips": [],
//                                 "dailyBudget": 0
//                             }
//                             ],
//                             "packingTips": [],
//                             "generalAdvice": []
//                         }
//                         Return JSON only.
//                         No markdown.
//                         No explanations.`
//                 }
//             ]
//         })
//
//     }catch{
//
//     }
// })

// testing if hte frontend is really sending the request to generate the itinerary:
app.post("/api/getCompleteItinerary", async (req, res) => {
    try {
        console.log("Complete itinerary route reached");
        console.log("Request body:", req.body);

        // This matches what the frontend sends:
        // body: JSON.stringify({ itinerary })
        const { itinerary } = req.body;

        if (!itinerary) {
            return res.status(400).json({
                error: "No selected itinerary was provided."
            });
        }

        console.log("Sending selected itinerary to Groq...");

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert travel-planning assistant. Return only valid JSON."
                },
                {
                    role: "user",
                    content: `
Generate a complete and detailed day-by-day travel itinerary based on the selected itinerary below.

Selected itinerary:

${JSON.stringify(itinerary, null, 2)}

Requirements:

- Follow the selected itinerary's title, theme, summary and highlights.
- Include a complete day-by-day schedule.
- Include morning, afternoon and evening activities.
- Include tourist attractions.
- Include recommended restaurants.
- Include local transportation details.
- Include estimated travel times.
- Include estimated activity costs.
- Include accommodation recommendations.
- Include daily tips and warnings.
- Include alternative indoor activities for bad weather.
- Include a daily spending estimate.
- Include packing suggestions.
- Use AUD as the currency.

Return exactly this JSON structure:

{
    "title": "string",
    "summary": "string",
    "estimatedCost": 0,
    "currency": "AUD",
    "days": [
        {
            "dayNumber": 1,
            "date": "string",
            "city": "string",
            "title": "string",
            "activities": [
                {
                    "time": "string",
                    "name": "string",
                    "description": "string",
                    "location": "string",
                    "duration": "string",
                    "estimatedCost": 0
                }
            ],
            "restaurants": [
                {
                    "name": "string",
                    "meal": "string",
                    "estimatedCost": 0
                }
            ],
            "transportation": {
                "type": "string",
                "details": "string",
                "estimatedCost": 0
            },
            "hotel": {
                "name": "string",
                "details": "string",
                "estimatedCost": 0
            },
            "tips": [
                "string"
            ],
            "badWeatherAlternative": "string",
            "dailyBudget": 0
        }
    ],
    "packingTips": [
        "string"
    ],
    "generalAdvice": [
        "string"
    ]
}

Return JSON only.
Do not use Markdown.
Do not include explanations outside the JSON.
`
                }
            ],

            response_format: {
                type: "json_object"
            },

            max_tokens: 5000
        });

        console.log("Groq response received");

        const content = completion.choices?.[0]?.message?.content;

        if (!content) {
            return res.status(500).json({
                error: "Groq returned an empty response."
            });
        }

        const parsedItinerary = JSON.parse(content);

        console.log("Complete itinerary generated successfully");

        // This is the response that was missing in your version
        return res.status(200).json(parsedItinerary);

    } catch (error) {
        console.error("Complete itinerary generation error:", error);

        // Always return a response inside catch
        return res.status(500).json({
            error: "An error occurred while generating the complete itinerary."
        });
    }
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
