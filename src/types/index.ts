//Home Tab
interface Timeline { //Redundant?
    timeline_id: string;
    title: string;
  }

//Explore Tab

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

export interface Comment {
    id: string;
    username: string;
    time: string;
    tag: string;
    tagClassName: string;
    content: string;
    upvotes: number;
    comments: number;
}

//Vote Tab
//Notifications Tab

//Timeline