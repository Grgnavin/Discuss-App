import PostShow from '@/components/posts/PostShow';
import { Button } from '@/components/ui/button';
import { PostShowPageProps } from '@/types'
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const PostshowPage: React.FC<PostShowPageProps> =async ({ params }) => {
  const { slug, postid} = (await params);
  return (
    <div className='space-y-3'>
      <Link href={`/topic/${slug}`}>
        <Button variant={"link"}>
          <ChevronLeft />
          Back to {slug}
        </Button>
      </Link>
      <PostShow postId={postid}/>
    </div>
  )
}

export default PostshowPage