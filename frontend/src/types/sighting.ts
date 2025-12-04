
// Data sent to backend
export type SightingRequest = {
    author: string,
    title: string,
    content: string,
}

// Data returned by backend
export type SightingReturned = {
    id: number;
    author: string;
    title: string;
    content: string;
    datePosted: string;
}

