import { PostData } from "@/lib/types";
import Link from "next/link";
import React from "react";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  return (
    <article className="bg-card space-y-3 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Link href={`/users/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avartarUrl} />
        </Link>
        <div>
          <Link
            href={`/users/${post.user.username}`}
            className="block font-medium hover:underline"
          >
            {post.user.displayName}
          </Link>
          <Link
            href={`/posts/${post.id}`}
            className="text-muted-foreground hover:undeline block text-sm"
          >
            {formatRelativeDate(post.createdAt)}
          </Link>
        </div>
      </div>
      <div className="break-words whitespace-pre-line">{post.content}</div>
    </article>
  );
};

export default Post;
