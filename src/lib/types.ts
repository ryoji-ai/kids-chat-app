import { Timestamp } from 'firebase/firestore';

export type UserRole = 'kid' | 'parent';

export interface User {
  id: string;
  displayName: string;
  avatarUrl: string;
  role: UserRole;
}

export type MessageType = 'text' | 'stamp';

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: MessageType;
  createdAt: Timestamp;
}

export interface Stamp {
  id: string;
  name: string;
  url: string;
}
