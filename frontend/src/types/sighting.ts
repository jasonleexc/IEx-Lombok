
// Data sent to backend
export type SightingRequest = {
    author: string,
    title: string,
    description: string,
    sighting_date?: string, // Optional date in 'YYYY-MM-DD' format
}

// Data returned by backend
export type SightingReturned = {
    id: number;
    author: string;
    title: string;
    description: string;
    sighting_date: string;
}

