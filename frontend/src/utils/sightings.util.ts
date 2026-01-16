import api from "./axios";

import { SightingRequest, SightingReturned } from "../types/sighting";

// function that sends all sighting info to backend 'routes'
export async function createSightingRequest(payload: SightingRequest): Promise<SightingReturned> {
  const res = await api.post("/sightings", payload);
  return res.data;
}