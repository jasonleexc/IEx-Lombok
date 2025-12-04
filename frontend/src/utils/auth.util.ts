import api from "./axios";

export type LoginPayload = {
    username: string;
    password: string;
    email: string;
}

export type LoginResponse = {
    token: string;
    user: {
        id: number;
        password: string;
        username: string;
        email: string;
    }
}

export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post("/auth/login", payload);
  return res.data;
}