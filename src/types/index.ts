// CLEAN UP THIS FILE

// Timeline Summary
export interface Summary {
  summary: string;
  id: string;
  version: number;
}

// Timeline Events
interface Event {
  body: string;
  event_index: number;
  narrative_bias: "left" | "right";
  id: string;
  version: number;
}

// Timeline
export interface Timeline {
  id: string;
  parent_id: string;
  title: string;
  image: string;
  summary?: string;
  methodology?: string;
  topic_statement?: string;
}

export interface TimelineWithDetails {
  timeline: Timeline;
  summary: Summary;
  events: Event[][];
}

// Define the popup event interface
export interface SelectedPopupEvent {
  event: {
    title: string;
    index: number;
    eventId: string;
  };
  position: {
    x: number;
    y: number;
  };
  bias: "left" | "right";
}

// TimelinePopup Props
export interface TimelinePopupProps {
  event: {
    title: string;
    index?: number;
    eventId?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  initialClickPosition?: {
    x: number;
    y: number;
  };
  narrativeBias?: "left" | "right";
  timelineData?: any;
}

// Profile Tab
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

export interface Wisdm {
  username: string;
  time: string;
  body: string;
  upvotes: number;
  comments: number;
}

interface BaseComment {
  created_at: string;
  parent_id: string | null;
  id: string;
  index: number;
  reference_id: string | null;
  thread_id: string;
  user_photo_url: string | null;
  upvote_count: number;
  downvote_count: number;
  is_vote_bouncing?: boolean;
}

export interface Comment extends BaseComment {
  body: string;
  is_deleted: boolean;
  updated_at: string | null;
  username: string;
  comment_count: number;
  vote: boolean | null;
  timeline_title?: string;
}

export interface UpdateComment extends BaseComment {
  body?: string;
  is_deleted?: boolean;
  updated_at?: string | null;
  username?: string;
  comment_count?: number;
  vote?: boolean | null;
}

export interface CommentGroupByIndex {
  [commentIndex: string]: Comment;
}

export interface CommentsByParentId {
  [parentCommentId: string]: CommentGroupByIndex;
}

export interface CommentThread {
  comments: CommentsByParentId & { root?: Comment };
  root_comment_count?: number;
  start_id?: string;
}
