export interface Profile {
  username: string;
  full_name: string;
  company: string;
  website: string;
  avatar_url: string;
  // ... any other properties of profile
}

export interface ProfileData {
  full_name: string | null;
  username: string | null;
  website: string | null;
  avatarUrl: string | null;
  company: string | null;
}
