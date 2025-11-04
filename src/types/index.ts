export interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  attendanceCount: number;
  memberSince: string;
  favoriteGames: string[];
}

export interface Meetup {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  gameType: string;
  description: string;
  hostId: string;
  hostName: string;
  imageUrl: string;
  participants: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  gameType: string;
  attendees: {
    userId: string;
    status: "going" | "not-going" | "maybe";
  }[];
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  imageUrl?: string;
  meetupId?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface Cafe {
  id: string;
  name: string;
  address: string;
  openingHours: string;
  availableGames: string[];
  imageUrl: string;
  rating: number;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  memberCount: number;
  createdAt: string;
  adminId: string;
  adminName: string;
  members: string[];
  gameTypes: string[];
}

export interface ClubMessage {
  id: string;
  clubId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

export interface ClubMeetup extends Meetup {
  clubId: string;
  isClubOnly: boolean;
}
