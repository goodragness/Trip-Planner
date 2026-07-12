


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

app.post("/api/generate-itenerary" , async(req , res)=>
    {
        try{
            const {
                destination , startDate , endDate , cities , selectedTravelTypes ,
                totalBudget , accomodationBudget , commuteBudget
            } = req.body;
            const completion = await groq.chat.completions.create({
            //     stating the AI model which we intend to use.
            model:"llama-3.1-8b-instant",
            //     the body consits of 2 messages.
            //     the first one telling the role of the AI (how the AI is suppose to behave)
            //     the second one is the actuall prompt we will be sending over to AI.
            messages : [
                {
                    role:"system",
                    content: "You are a travel assistant that provides information about cities and destinations."
                },
                {
                    role:"user",
                    content: `I am travelling to ${destination} from ${startDate} to ${endDate}
                    and travelling to all the following cities:
                    ${cities}. Build me a complete Itenerary of things I 
                    can do from the first day to the end of the trip. 
                    all the things which I can do in teh morning, afternoono and in the evening. 
                    But the thing is that I need to cover al lthe main highlights and important
                    things which I can't miss if I am visiting the place
                    and also, the entiere trip needs to fit in the budget. 
                    the total budget of my trip is ${totalBudget} but out of the total
                    budget, I am spending ${accomodationBudget} on accomodation
                    and ${commuteBudget} on going to the country and coming back.
                    so the total ammount I wanna spend while am travelling is 
                    the ${totalBudget}- [${accomodationBudget}+ ${commuteBudget}]`
                }
            ], max_tokens : 1500,
            });
            res.json({
                message:completion.choices[0].message.content
            });
        }
        catch(error){
            console.error(error);
            res.status(500).json({error: "An error occurred while fetching data from Groq."});
        }
    }
)

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
