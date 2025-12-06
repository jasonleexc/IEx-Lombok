
// Data sent to backend
export type SightingRequest = {
    author: string,
    title: string,
    description: string,
}

// Data returned by backend
export type SightingReturned = {
    id: number;
    author: string;
    title: string;
    description: string;
    datePosted: string;
}

