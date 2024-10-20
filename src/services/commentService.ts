import { Comment } from '@/types';

export const fetchComments = async (sortBy: 'top' | 'newest'): Promise<Comment[]> => {
  // Implement the actual API call here
  // For now, we'll return a mock response
  const mockComments: Comment[] = [
    {
        "topic": "Ukraine War",
        "username": "not_a_b0t_650",
        "time": "23h",
        "tag": "Equality Evangelist",
        "tagClassName": "activeEqualityEvangelist",
        "content": "So from my point of view this is trash. These people don't deserve anything at all and are the lowest form of life.",
        "upvotes": 18294,
        "comments": 489
      },
      {
        "topic": "Ukraine War",
        "username": "justice_teacher",
        "time": "4h",
        "tag": "Justice Juggernaut",
        "tagClassName": "activeJusticeJuggernaut",
        "content": "I believe that that's a little brash and maybe we should consider the broader context.",
        "upvotes": 10294,
        "comments": 289
      }
  ];

  return sortBy === 'top'
    ? mockComments.sort((a, b) => b.upvotes - a.upvotes)
    : mockComments.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
};

