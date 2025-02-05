import { prisma } from '@/lib'
import { PostShowProps } from '@/types'
import { notFound } from 'next/navigation';
import React from 'react'
import CommentCreateForm from '../comments/CommentCreateForm';

const PostShow: React.FC<PostShowProps> =async ({ postId }) => {
  const post = await prisma.post.findFirst({
    where: {
        id: postId
    }
  });

  if (!post) notFound();

    return (
    <div >
        <h1 className='text-center font-bold my-2 text-2xl'>{post.title}</h1>
        <p className='border rounded p-4'>{post.content}</p>
        <CommentCreateForm postId={postId} startOpen />
    </div>
  )
}

export default PostShow