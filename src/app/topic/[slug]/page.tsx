import PostCreateForm from '@/components/posts/PostCreateForm';
import PostList from '@/components/posts/PostList';
import { fetchPostBySlug } from '@/lib/query/post';
import { TopicShowPageProps } from '@/types'
import React from 'react'

const Topicshowcase: React.FC<TopicShowPageProps> =async ({ params }) => {
  const { slug } = (await params);
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='font-bold text-2xl mb-2'>{slug}</h1>
        <PostList fetchData={() => fetchPostBySlug(slug)} />
      </div>
      <div>
        <PostCreateForm slug={slug}/>
      </div>
    </div>
  )
}

export default Topicshowcase