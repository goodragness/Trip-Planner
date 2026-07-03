


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

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
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


