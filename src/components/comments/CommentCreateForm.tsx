import React from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const CommentCreateForm = () => {
  return (
    <div className='p-1'>
        <Button size={"sm"} variant={"link"}>Reply</Button>
        <form className='space-y-2'>
            <Textarea 
                placeholder='write a comment...'
                className='bg-gray-100 focus-visible:ring-0'
            />
            <Button variant={"secondary"} size={"sm"}>Save</Button>
        </form>
    </div>
  )
}

export default CommentCreateForm