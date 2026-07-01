const express = require("express");
const cors = require("cors");

const app = express();
//express creates a server faster and wiht just one line for our app.
// so that we don't have to write tons of lines of code to create a server.

app.use(cors());  //this line tells the server to accept all the requests from the frontend.
app.use(express.json()); //this tells the server to accept json data from the frontend and understand it.

app.get("/", (req, res) => {
    res.send("Trip Planner Backend is running!");
});
// the above code is a simple route that sends a response to the frontend when the user visits the root url of the backend and requests something.

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
//the above code tells the server to listen on port 5000 and when the server is running, it will log a message to the console.