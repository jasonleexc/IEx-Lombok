import api from "./axios";

import { SightingRequest, SightingReturned } from "../types/sighting";

export async function createSightingRequest(payload: SightingRequest): Promise<SightingReturned> {
  const res = await api.post("/sightings", payload);
  return res.data;
}