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

// export interface Comment {
//     id: string;
//     username: string;
//     time: string;
//     tag: string;
//     tagClassName: string;
//     content: string;
//     upvotes: number;
//     comments: number;
// }

export interface Comment {
    "body": string;
    "created_at": string;
    "deleted": boolean;
    "parent_comment_id": string | null;
    "comment_id": string;
    "comment_index": number;
    "reference_id": string | null;
    "timeline_id": string;
    "updated_at": string | null;
    "username": string;
    // "votes": number
    // "comments": number;
}

export interface CommentThread {
    comments: {
        [key: string]: Comment;
    };
}

//Vote Tab
//Notifications Tab

//Timeline