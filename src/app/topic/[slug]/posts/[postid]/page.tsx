import { CreatePostFormProps } from '@/types'
import React from 'react'

const PostshowPage: React.FC<CreatePostFormProps> =async ({ params }) => {
  const { id } = (await params);
  return (
    <div>The id is: {id}</div>
  )
}

export default PostshowPage