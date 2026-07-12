import React from 'react';
import './App.css';
import HomePage from './pages/home_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SelectCitiesPage from './pages/Select_cities_page';
import TravelType from './pages/Travel_Type';
import TravellingWithPage from './pages/Travelling_with_page'
import IteneraryOptionsPage from "./pages/Itenerary_Options_Page";


//todo: the first goal is to build the home pages
// need to ask the user for thier destination

function App() {
  return (
      <BrowserRouter>
          <div className="page">

              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/select-cities" element={<SelectCitiesPage />} />
                  <Route path="/travel-type" element={<TravelType />} />
                  <Route path="/Travelling-with-page" element={<TravellingWithPage/>} />
                  <Route path="/Itenerary-Options-page" element={<IteneraryOptionsPage/>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
