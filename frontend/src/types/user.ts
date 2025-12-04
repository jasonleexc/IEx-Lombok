// change to user type 
export type User = {
    username: string;
    email: string;
    password: string;
    // image_file
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