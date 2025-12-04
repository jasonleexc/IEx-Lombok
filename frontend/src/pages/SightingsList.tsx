import React from "react";
import Sighting from "./Sighting";
import { SightingReturned } from "../types/sighting";

const SightingsList: React.FC<({ sightings: SightingReturned[] })> = ({ sightings }) => {
    return (
        <ul>
            {sightings.map((sighting) => (
                <Sighting 
                    key={sighting.id}
                    sighting = {sighting}
                />
            ))}
        </ul>
    )
}

export default SightingsList;