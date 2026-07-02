Structure of the Trip Planner Project
The Trip Planner project is designed to help users plan their trips efficiently by providing a user-friendly interface
    and various features to manage travel itineraries. Below is an overview of the project's structure and its components.

trip_planner/
├── README.md                # Project documentation and overview
├── package.json             # Project metadata and dependencies
├── src/                     # Source code for the Trip Planner application
│   ├── index.js             # Entry point of the application
│   ├── components/          # React components for the UI
│   │   ├── Header.js        # Header component for the application
│   │   ├── Footer.js        # Footer component for the application
│   │   ├── TripForm.js      # Form component for creating and editing trips
│   │   ├── TripList.js      # Component to display a list of trips
│   │   └── TripDetails.js   # Component to display detailed information about a specific trip
│   ├── services/            # Services for handling API requests and data management
│   │   ├── api.js           # API service for making HTTP requests
│   │   └── tripService.js   # Service for managing trip-related data
│   ├── utils/               # Utility functions and helpers
│   │   └── dateUtils.js     # Utility functions for date manipulation and formatting
│   └── styles/              # CSS or SCSS files for styling the application        
|--backend/
    ├── server.js              # Entry point for the backend server (This is where the backend application starts and listens for incoming requests)
    ├── routes/                # this folder stores the location (routes) of each pageand directs the user to the correct page when they make a request to the backend
    │   └── tripRoutes.js      # Routes for trip-related API endpoints
    ├── controllers/           # controllers work as manager. this means that they manage the flow of data between the models and the views. they receive input from the user, process it, and then update the models or views accordingly.
                                #so basically, they send the user data form the frontend to the backend and then send the response back to the frontend
    │   └── tripController.js  # Controller for trip-related operations
    ├── models/                # Database models and schemas
    │   └── tripModel.js       # Model for trip data structure
    └── config/                # Configuration files (e.g., database connection)
        └── dbConfig.js        # Database configuration settings