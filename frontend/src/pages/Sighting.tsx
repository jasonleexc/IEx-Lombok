import React from "react";
import { SightingReturned } from "../types/sighting";

const Sighting: React.FC<{ sighting: SightingReturned }> = ({ sighting }) => {
    return (
        <div className="mt-8">
            <div key={sighting.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{sighting.title}</h3>
                <span className="text-sm text-gray-500">{sighting.datePosted}</span>
                </div>
                <p className="text-gray-700 mb-2">{sighting.description}</p>
                <p className="text-sm text-gray-500">Posted by {sighting.author}</p>
            </div>
        </div> 
    )
}

export default Sighting;