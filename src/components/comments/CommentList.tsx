import React from 'react'
import ShowComment from './ShowComment';
import { fetchCommentByPostId } from '@/lib/query/comment';

type CommentListProps = {
    postId: string;
}

const CommentList: React.FC<CommentListProps> = async({ postId }) => {
    const comments = await fetchCommentByPostId(postId);
    const topLevelComments = comments.filter((comment) => comment.parentId === null);
    return (
    <div>
        <h1 className='font-bold text-lg'>All the comments</h1>
        {
            topLevelComments.map((comment) => (
                <ShowComment key={comment.id} postId={comment.postId} commentId={comment.id}/>
            ))
        }
    </div>
  )
}

export default CommentList