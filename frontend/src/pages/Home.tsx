import SightingsList from "./SightingsList"; 
import Header from "./Header";
import { SightingRequest } from "../types/sighting";

import { useState } from "react";
import SightingCard from "../components/SightingCard";
import { createSightingRequest } from "../utils/sightings.util";

// TODO: ensure that sightings are sent & fetched from backend

export const Home = () => {
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
      title: 'Green Turtle sighting!',
      content: 'dummy data 2',
      datePosted: '22 July 2025'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateSighting = async (payload: SightingRequest) => {
    try {
      setIsSubmitting(true);
      const saved = await createSightingRequest(payload);
      setSightings([saved, ...sightings]);
    } catch (error) {
      console.error("Error creating sighting: ", error);
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  };

return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        <button onClick={openModal}
          className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150">
          Log New Sighting
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Sightings</h2>
        <div className="space-y-6">
        <SightingsList 
          sightings = {sightings} />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <SightingCard onSubmit={handleCreateSighting} onCancel={closeModal} isSubmitting={isSubmitting} />
            </div>
          </div>
        )}
      </div>
  );
}

export default Home;
