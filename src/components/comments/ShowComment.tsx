import { fetchCommentByPostId } from "@/lib/query/comment";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentCreateForm from "./CommentCreateForm";

type ShowCommentProps = {
  postId: string;
  commentId: string;
};

const ShowComment: React.FC<ShowCommentProps> = async ({
  commentId,
  postId,
}) => {
  const comments = await fetchCommentByPostId(postId);

  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const childcomment = comments.filter((c) => c.parentId === commentId);

  return (
    <div>
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage
            src={comment.user?.image || "/default-avatar.png"}
            alt={comment.user?.name || "User"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-gray-500 font-medium text-sm">
            {comment.user?.name || "Unknown User"}
          </p>
          <p className="text-gray-800">{comment.content || "No content"}</p>
          <CommentCreateForm postId={comment.id} parentId={comment.id} />
        </div>
      </div>
      {childcomment.map((c) => (
        <ShowComment postId={c.postId} commentId={c.id} key={c.id} />
      ))}
    </div>
  );
};

export default ShowComment;
