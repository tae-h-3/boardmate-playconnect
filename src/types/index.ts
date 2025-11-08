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

export interface Group {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  region: string;
  district: string;
  memberCount: number;
  type: "동호회" | "동아리" | "자율모임";
  contactLink: string;
  tags: string[];
}

export interface MarketplaceItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  category: "판매" | "구매" | "교환" | "나눔";
  title: string;
  gameName: string;
  price?: number;
  condition?: string;
  region: string;
  description: string;
  imageUrl?: string;
  timestamp: string;
  status: "활성" | "거래중" | "완료";
  views: number;
  comments: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: "정보" | "공유" | "질문" | "후기" | "잡담" | "기타";
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

export interface Event {
  id: string;
  type: "대회" | "체험단";
  title: string;
  description: string;
  imageUrl: string;
  region: string;
  startDate: string;
  endDate: string;
  prize?: string;
  maxParticipants: number;
  currentParticipants: number;
  status: "모집중" | "마감";
  organizerId: string;
  organizerName: string;
  participants: string[];
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "온라인" | "오프라인";
  mutualFriends: number;
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  timestamp: string;
}

export interface BoardGame {
  id: string;
  name: string;
  category: string[];
  description: string;
  imageUrl: string;
  videoUrl?: string;
  rating: number;
  reviewCount: number;
  minPlayers: number;
  maxPlayers: number;
  playTime: string;
  age: string;
  difficulty: string;
  rulesDownloadUrl?: string;
  relatedEvents: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  gameId: string;
  rating: number;
  content: string;
  timestamp: string;
  likes: number;
}
