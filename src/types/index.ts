// Main application types
// Update these values in database as needed

// User types
export interface User {
  id: string;
  email: string;
  name: string | null;
  branch?: string;
  year?: number;
  profile_completed: boolean;
  created_at: string;
  avatar_url?: string;
}

// Club types
export interface Club {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
  followers_count: number;
  is_verified: boolean;
}

export interface ClubDetails extends Club {
  coreMembers?: CoreMember[];
  upcomingEvents?: Event[];
  followers?: ClubFollower[];
}

export interface CoreMember {
  id: string;
  role: string;
  joined_at: string;
  is_active: boolean;
  user_id: string;
  club_id: string;
  users?: {
    id: string;
    name: string;
    email: string;
    branch?: string;
    year?: number;
  };
}

export interface ClubFollower {
  user_id: string;
  club_id: string;
  joined_at: string;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  event_type: string;
  banner_url?: string;
  is_live: boolean;
  club_id: string;
  created_at?: string;
  created_by?: string;
}

export interface EventDetails extends Event {
  clubs?: Club;
  rsvpCount?: number;
  rsvps?: EventRSVP[];
}

export interface EventRSVP {
  user_id: string;
  event_id: string;
  timestamp: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
