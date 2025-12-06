import React from "react";
import Sighting from "./Sighting";
import { SightingReturned } from "../types/sighting";

interface SightingsListProps {
    sightings: SightingReturned[];
    onDelete: (id: number) => Promise<void>;
}

const SightingsList: React.FC<SightingsListProps> = ({ sightings, onDelete }) => {
    return (
        <ul>
            {sightings.map((sighting) => (
                <Sighting 
                    key={sighting.id}
                    sighting={sighting}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}

export default SightingsList;