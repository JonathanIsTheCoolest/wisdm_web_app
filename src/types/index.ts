//Home Tab
//Explore Tab

import internal from "stream";

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

// Start Comment Interface
// add tag and tag class name
export interface Comment {
    "body": string;
    "created_at": string;
    "deleted": boolean;
    "parent_comment_id": string | null;
    "comment_id": string;
    "comment_index": number;
    "reference_id": string | null;
    "thread_id": string;
    "updated_at": string | null;
    "username": string;
    "vote_count": number;
    "comment_count": number;
    "vote": boolean | null;
    "user_photo_url": string | null
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