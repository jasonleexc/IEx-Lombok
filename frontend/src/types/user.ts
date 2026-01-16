// For creating new account 
export type RegisterUser = {
    username: string;
    email: string;
    password: string;
    // image_file
}

// For users logging in 
export type LoginUser = {
  username: string;
  password: string;
}

export type AuthUser = {
  token: string | null;
  user: {
    id: number;
    username: string;
    password: string;
    email: string;
  } | null;
}

// User data returned by backend
export type UserReturned = {
  username: string;
}