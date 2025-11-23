import SightingsList from "./SightingsList"; 
import Header from "./Header";

import React, { useState } from "react";

const Home = () => {
  const [ sightings, setSightings ] = useState([
    {
      id: 1,
      author: 'jason lee',
      title: 'Hawksbill sighting!',
      content: 'dummy data 1',
      datePosted: '21 July 2025'
    },
    {
      id: 2,
      author: 'justin lee',
      title: 'Green turtle sighting!',
      content: 'dummy data 2',
      datePosted: '22 July 2025'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Sightings</h2>
      <div className="space-y-6">
      <SightingsList 
        sightings = {sightings} />
      </div>
    </div>
  );
};

export default Home;
