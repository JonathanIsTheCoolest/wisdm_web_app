export interface User {
  username: string;
  bio: string;
  avatarUrl: string;
}

export interface SavedTopic {
  id: string;
  title: string;
  body: string;
  comments: number;
  imageUrl: string;
}

export interface Wisdom {
  username: string;
  time: string;
  body: string;
  upvotes: number;
  comments: number;
}

export interface Comment {
  username: string;
  time: string;
  content: string;
  upvotes: number;
  comments: number;
}

export interface SavedTopic {
  title: string;
  body: string;
  comments: number;
  imageUrl: string;
}

export interface Wisdom {
  username: string;
  time: string;
  body: string;
  upvotes: number;
  comments: number;
}
