// Timeline Summary
export interface Summary {
  summary: string;
  summary_id: string;
  timeline_id: string;
  version: number;
}

// Timeline Events
interface Event {
  body: string;
  event_id: string;
  event_index: number;
  narrative_bias: "left" | "right";
  timeline_id: string;
  version: number;
}

// Timeline
export interface Timeline {
  timeline_id: string;
  parent_event_id: string;
  title: string;
  image: string;
}

export interface TimelineWithDetails {
  timeline: Timeline;
  summary: Summary;
  events: Event[][];
}

//Profile Tab
export interface User {
  username: string;
  bio: string;
  avatarUrl: string;
  email: string;
  joinDate: string;
  tags: string[];
}

export interface SavedTopic {
  id: string;
  title: string;
  body: string;
  comments: any[];
  imageUrl?: string;
}

export interface Wisdom {
  username: string;
  time: string;
  body: string;
  upvotes: number;
  comments: number;
}

// Start Comment Interface
// add tag and tag class name
export interface Comment {
  body: string;
  created_at: string;
  deleted: boolean;
  parent_comment_id: string | null;
  comment_id: string;
  comment_index: number;
  reference_id: string | null;
  thread_id: string;
  updated_at: string | null;
  username: string;
  vote_count: number;
  comment_count: number;
  vote: boolean | null;
  user_photo_url: string | null;
}

export interface CommentGroupByIndex {
  [commentIndex: string]: Comment;
}

export interface CommentsByParentId {
  [parentCommentId: string]: CommentGroupByIndex;
}

export interface CommentThread {
  comments: CommentsByParentId;
}

//Vote Tab
//Notifications Tab

//Timeline
