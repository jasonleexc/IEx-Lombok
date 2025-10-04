import React from 'react';

const About: React.FC = () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Shell-utions</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            IEx Lombok is a marine conservation platform dedicated to the tracking and protecting of sea turtles in the
            Lombok region. Our app aims to help divers log sea turtle data. Photos uploaded are analysed by species,
            measurements and location for analysis.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            To protect and preserve marine ecosystems through community-driven conservation 
            efforts, scientific research, and environmental education.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Marine life sighting posts</li>
            <li>Computer vision-based species identification</li>
            <li>Community engagement platform</li>
            <li>Scientific data collection and analysis</li>
            <li>Conservation education resources</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
