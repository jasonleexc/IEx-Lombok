import Sighting from "./Sighting";

import React from "react";

const SightingsList: React.FC<({ sightings: Sighting[] })> = ({ sightings }) => {
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