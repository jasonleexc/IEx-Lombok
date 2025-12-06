import React from "react";
import { SightingReturned } from "../types/sighting";

const Sighting: React.FC<{ sighting: SightingReturned; onDelete: (id: number) => Promise<void> }> = ({ sighting, onDelete }) => {
    return (
        <li className="bg-white shadow-md rounded-lg p-6 mb-4">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {sighting.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        By {sighting.author} • {new Date(sighting.datePosted).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">{sighting.description}</p>
                </div>
                <button
                    onClick={() => onDelete(sighting.id)}
                    className="ml-4 px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition duration-150"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default Sighting;