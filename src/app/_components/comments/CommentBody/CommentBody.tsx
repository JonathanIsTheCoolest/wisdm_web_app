import React, { useEffect, useState } from "react";
import { Comment } from "@/src/types";
import Image from "next/image";
import userDefaultImage from '@/src/assets/icons/user_avatar.svg';
import { getElapsedTime } from "@/src/app/_lib/getElapsedTime";

interface Comm {
  comment: Comment;
}

const CommentBody: React.FC<Comm> = ({ comment }) => {
  const { body, comment_count, user_photo_url, vote_count, vote, username, created_at } = comment;
  const [elapsedTime, setElapsedTime] = useState(getElapsedTime(created_at));

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setElapsedTime(getElapsedTime(created_at));
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [created_at]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "20px 0"
        }}
      >
        <Image 
          src={user_photo_url || userDefaultImage} 
          alt={`${username}'s user photo`}
          width={'50'}
          height={'50'}
          style={{
            border: '1px solid black',
            borderRadius: '50%', 
            marginRight: '5px'
          }}
        />
        <div>{username} · {elapsedTime}</div>
      </div>
    </div>
  );
};

export default CommentBody;
