import SightingsList from "./SightingsList"; 
import Header from "./Header";
import LogSighting from "./LogSighting";
import Sighting from "./Sighting";

import { useState } from "react";

const Home = () => {

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [datePosted, setDatePosted] = useState('');
  const [NewSighting, SetNewSighting] = useState('');
  const [id, setId] = useState(0);
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


  const setAndSaveSightings = (newSightings: Sighting[]) => {
    localStorage.setItem('sightings', JSON.stringify(newSightings));
  }

  const addNewSighting = (sighting: Sighting) => {
    const id = sightings.length ?? 1;
    const myNewSighting = { id, author, title, content, datePosted }
    const updatedSightings = [...sightings, myNewSighting];
    // update state
    setAndSaveSightings(updatedSightings);
  }

// TODO: to be implemented later
  const handleDeleteSighting = (id: number) => {
      const Sightings = sightings.filter((sighting) => sighting.id !== id);
      setAndSaveSightings(Sightings);
  }

  const handleAddSighting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewSighting({ id, author, title, content, datePosted });
    SetNewSighting('');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <LogSighting 
        NewSighting={NewSighting}
        SetNewSighting={SetNewSighting}
        handleAddSighting={handleAddSighting}
      />
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Sightings</h2>
      <div className="space-y-6">
      <SightingsList 
        sightings = {sightings} />
      </div>
    </div>
  );
};

export default Home;
