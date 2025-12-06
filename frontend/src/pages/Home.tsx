import SightingsList from "./SightingsList"; 
import Header from "./Header";
import { SightingRequest, SightingReturned } from "../types/sighting";

import { useState } from "react";
import SightingCard from "../components/SightingCard";
import { createSightingRequest } from "../utils/sightings.util";
import { useEffect } from "react";
import api from "../utils/axios";

export const Home = () => {
  const [ sightings, setSightings ] = useState<SightingReturned[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch sightings from backend on page load
  useEffect(() => {
    const fetchSightings = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/sightings');
        setSightings(response.data);
      } catch (error) {
        console.error("Error fetching sightings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSightings();
  }, []);

  const handleCreateSighting = async (payload: SightingRequest) => {
    try {
      setIsSubmitting(true);
      const saved = await createSightingRequest(payload);
      setSightings(prev => [saved, ...prev]);
      closeModal();
    } catch (error) {
      console.error("Error creating sighting: ", error);
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  };

  const handleDeleteSighting = async (id: number) => {
    try {
      await api.delete(`/sightings/${id}`);
      // Remove the deleted sighting from state
      setSightings(prev => prev.filter(sighting => sighting.id !== id));
    } catch (error) {
      console.error("Error deleting sighting:", error);
      alert("Failed to delete sighting");
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
      
      {isLoading ? (
        <p>Loading sightings...</p>
      ) : (
        <div className="space-y-6">
          <SightingsList 
            sightings={sightings} 
            onDelete={handleDeleteSighting} 
          />
        </div>
      )}

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
